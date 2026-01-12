import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // Validate required fields
    if (!name || !email || !phone || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Store submission in Supabase
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone,
          company,
          message: message || '',
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue to send email even if DB fails
    }

    // Send email notification using Resend
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (resendApiKey) {
      const currentDate = new Date()
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
            .value { font-size: 16px; margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #333; }
            .meta { font-size: 12px; color: #888; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
            .cta { background: #333; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Quote Request</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Structure AI Logistics Platform</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Contact Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Company Name</div>
                <div class="value">${company}</div>
              </div>
              ${message ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${message}</div>
              </div>
              ` : ''}
              <div class="meta">
                <strong>Submitted:</strong> ${formattedDate} at ${formattedTime}<br>
                <strong>Source:</strong> Structure Website Contact Form
              </div>
              <a href="mailto:${email}?subject=Re: Quote Request for ${company}" class="cta">
                Reply to ${name}
              </a>
            </div>
          </div>
        </body>
        </html>
      `

      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Structure AI <haarith@structurelogistics.com>',
            to: ['structureailogistics@gmail.com'],
            subject: `🚀 New Quote Request from ${company} - ${name}`,
            html: emailHtml,
            reply_to: email,
          }),
        })

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json()
          console.error('Resend API error:', errorData)
          
          // Fallback: Try with onboarding domain if custom domain fails
          if (errorData.statusCode === 403) {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Structure AI <onboarding@resend.dev>',
                to: ['structureailogistics@gmail.com'],
                subject: `🚀 New Quote Request from ${company} - ${name}`,
                html: emailHtml,
                reply_to: email,
              }),
            })
          }
        }
      } catch (emailError) {
        console.error('Email send error:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: submission?.id,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

