import { NextRequest, NextResponse } from 'next/server';

// Webhook URL - Primary destination
const WEBHOOK_URL = 'https://leadgenwebhook-production.up.railway.app/api/webhooks/ebook';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Helper to delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Send to webhook with retries
async function sendToWebhook(payload: Record<string, unknown>): Promise<{ success: boolean; status?: number; error?: string }> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[EBOOK WEBHOOK] Attempt ${attempt}/${MAX_RETRIES} - Sending to: ${WEBHOOK_URL}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'StructureAI-EbookForm/1.0',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const responseText = await response.text();
      console.log(`[EBOOK WEBHOOK] Response status: ${response.status}, body: ${responseText}`);
      
      if (response.ok) {
        return { success: true, status: response.status };
      }
      
      // If 4xx error, don't retry (client error)
      if (response.status >= 400 && response.status < 500) {
        return { success: false, status: response.status, error: responseText };
      }
      
      // 5xx error - retry
      if (attempt < MAX_RETRIES) {
        console.log(`[EBOOK WEBHOOK] Retrying in ${RETRY_DELAY_MS * attempt}ms...`);
        await delay(RETRY_DELAY_MS * attempt);
      }
      
    } catch (error) {
      console.error(`[EBOOK WEBHOOK] Attempt ${attempt} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY_MS * attempt);
      }
    }
  }
  
  return { success: false, error: 'All retry attempts failed' };
}

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  let leadData: Record<string, unknown> = {};
  
  try {
    const body = await request.json();
    const { fullName, email, company, role, companySize, phone } = body;

    // Store for logging
    leadData = { fullName, email, company, role, companySize, phone, timestamp };

    // Validate required fields
    if (!fullName || !email || !company || !role || !companySize) {
      console.error('[EBOOK WEBHOOK] Missing required fields');
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

    // =========================================================================
    // STEP 1: Always log the lead data first (can't lose this)
    // =========================================================================
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║              📧 NEW EBOOK LEAD RECEIVED                    ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║ Name:         ${fullName}`);
    console.log(`║ Email:        ${email}`);
    console.log(`║ Company:      ${company}`);
    console.log(`║ Role:         ${role}`);
    console.log(`║ Company Size: ${companySize}`);
    console.log(`║ Phone:        ${phone || 'Not provided'}`);
    console.log(`║ Timestamp:    ${timestamp}`);
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');

    // =========================================================================
    // STEP 2: Send to webhook (with retries)
    // =========================================================================
    const webhookPayload = {
      fullName,
      email,
      company,
      role,
      companySize,
      phone: phone || null,
      source: 'ebook-landing-page',
      timestamp,
      formType: 'ebook',
    };

    const webhookResult = await sendToWebhook(webhookPayload);
    
    if (webhookResult.success) {
      console.log('[EBOOK WEBHOOK] ✅ Webhook delivery successful');
    } else {
      console.error('[EBOOK WEBHOOK] ❌ Webhook delivery failed:', webhookResult.error);
      // Log the payload so we can manually recover if needed
      console.log('[EBOOK WEBHOOK] Payload for manual recovery:', JSON.stringify(webhookPayload, null, 2));
    }

    // =========================================================================
    // STEP 3: Save to database as backup
    // =========================================================================
    let dbSuccess = false;
    try {
      const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
      
      if (databaseUrl) {
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(databaseUrl);
        
        await sql`
          INSERT INTO playbook_leads (full_name, email, company, role, company_size, phone, source, status, notes)
          VALUES (
            ${fullName}, 
            ${email}, 
            ${company}, 
            ${role}, 
            ${companySize}, 
            ${phone || null}, 
            'ebook-page', 
            'new',
            ${webhookResult.success ? 'Webhook sent successfully' : 'Webhook failed - manual follow-up needed'}
          )
          ON CONFLICT (email) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            company = EXCLUDED.company,
            role = EXCLUDED.role,
            company_size = EXCLUDED.company_size,
            phone = EXCLUDED.phone,
            updated_at = NOW(),
            notes = EXCLUDED.notes
        `;
        dbSuccess = true;
        console.log('[EBOOK WEBHOOK] ✅ Database backup successful');
      } else {
        console.log('[EBOOK WEBHOOK] ⚠️ No database URL configured');
      }
    } catch (dbError) {
      console.error('[EBOOK WEBHOOK] ❌ Database save failed:', dbError);
    }

    // =========================================================================
    // STEP 4: Return success (we have the data logged at minimum)
    // =========================================================================
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      webhookSent: webhookResult.success,
      databaseSaved: dbSuccess,
    });

  } catch (error) {
    console.error('[EBOOK WEBHOOK] ❌ Critical error:', error);
    console.log('[EBOOK WEBHOOK] Lead data at error:', JSON.stringify(leadData, null, 2));

    // Emergency: Try one more time to send to webhook
    if (leadData.email) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadData,
            source: 'ebook-error-recovery',
            error: error instanceof Error ? error.message : 'Unknown error',
          }),
        });
        console.log('[EBOOK WEBHOOK] Emergency webhook attempt made');
      } catch {
        console.error('[EBOOK WEBHOOK] Emergency webhook also failed');
      }
    }

    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

// Health check / status endpoint
export async function GET() {
  // Test the webhook
  let webhookStatus = 'unknown';
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'OPTIONS',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    webhookStatus = response.ok ? 'reachable' : `error-${response.status}`;
  } catch {
    webhookStatus = 'unreachable';
  }

  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/ebook-lead',
    webhookUrl: WEBHOOK_URL,
    webhookStatus,
    timestamp: new Date().toISOString(),
  });
}
