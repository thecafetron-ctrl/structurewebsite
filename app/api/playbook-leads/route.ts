import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// Rate limiting (in-memory, per-instance)
const RATE_LIMIT = {
  maxAttempts: 5,
  windowMs: 60000, // 1 minute
};

const ipAttempts = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = ipAttempts.get(ip) || [];
  
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter(t => now - t < RATE_LIMIT.windowMs);
  
  if (recentAttempts.length >= RATE_LIMIT.maxAttempts) {
    return false;
  }
  
  recentAttempts.push(now);
  ipAttempts.set(ip, recentAttempts);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, company, role, companySize, phone, source = 'playbook' } = body;

    // Validate required fields
    if (!fullName || !email || !company || !role || !companySize) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get database URL
    const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('Database URL not configured');
      // Still return success to user but log the error
      // This prevents breaking the UX if DB is temporarily unavailable
      console.log('=== PLAYBOOK LEAD (DB NOT CONFIGURED) ===');
      console.log('Full Name:', fullName);
      console.log('Email:', email);
      console.log('Company:', company);
      console.log('Role:', role);
      console.log('Company Size:', companySize);
      console.log('Phone:', phone || 'Not provided');
      console.log('Source:', source);
      console.log('Timestamp:', new Date().toISOString());
      console.log('==========================================');
      
      return NextResponse.json({
        success: true,
        message: 'Lead captured successfully',
      });
    }

    // Create SQL client
    const sql = neon(databaseUrl);

    // Insert lead into database
    const result = await sql`
      INSERT INTO playbook_leads (full_name, email, company, role, company_size, phone, source, status)
      VALUES (${fullName}, ${email}, ${company}, ${role}, ${companySize}, ${phone || null}, ${source}, 'new')
      RETURNING id, created_at
    `;

    const lead = result[0];

    // Log successful submission
    console.log('=== NEW PLAYBOOK LEAD ===');
    console.log('ID:', lead.id);
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Company:', company);
    console.log('Role:', role);
    console.log('Company Size:', companySize);
    console.log('Phone:', phone || 'Not provided');
    console.log('Source:', source);
    console.log('Created:', lead.created_at);
    console.log('=========================');

    // Optional: Send email notification
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1E3A5F 0%, #3B82F6 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
              .value { font-size: 16px; margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #3B82F6; }
              .badge { display: inline-block; background: #3B82F6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📘 New Playbook Download</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">90-Day Logistics Scaling Playbook</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Contact Name</div>
                  <div class="value">${fullName}</div>
                </div>
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${company}</div>
                </div>
                <div class="field">
                  <div class="label">Role</div>
                  <div class="value">${role}</div>
                </div>
                <div class="field">
                  <div class="label">Company Size</div>
                  <div class="value">${companySize}</div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ` : ''}
                <div class="badge">Source: ${source}</div>
              </div>
            </div>
          </body>
          </html>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Structure AI <onboarding@resend.dev>',
            to: ['structureailogistics@gmail.com'],
            subject: `📘 New Playbook Lead: ${company} - ${fullName}`,
            html: emailHtml,
            reply_to: email,
          }),
        });
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      id: lead.id,
    });

  } catch (error) {
    console.error('Playbook lead submission error:', error);
    
    // Check for duplicate email
    if (error instanceof Error && error.message.includes('unique constraint')) {
      return NextResponse.json(
        { error: 'This email has already been registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (protected, for admin use)
export async function GET(request: NextRequest) {
  try {
    // Simple auth check - you should implement proper auth
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY;
    
    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    
    if (!databaseUrl) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const sql = neon(databaseUrl);
    
    const leads = await sql`
      SELECT * FROM playbook_leads 
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
