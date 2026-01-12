# 📧 EMAIL NOTIFICATIONS SETUP

## Current Status

✅ Form submissions save to Supabase
✅ Backup mailto: link opens email client
⚠️ Automatic email notifications need configuration

---

## Option 1: Supabase Edge Function (RECOMMENDED)

### Step 1: Run the SQL
Go to Supabase SQL Editor and run `supabase-email-notifications.sql`

### Step 2: Create Edge Function

In your Supabase project dashboard:
1. Go to **Edge Functions**
2. Create new function: `send-contact-email`
3. Use this code:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { name, email, phone, company, message } = await req.json()
  
  // Send email using your preferred service (SendGrid, Resend, etc.)
  const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_SENDGRID_API_KEY`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: 'structureailogistics@gmail.com' }],
        subject: `New Quote Request from ${company}`,
      }],
      from: { email: 'noreply@structurelogistics.com' },
      content: [{
        type: 'text/plain',
        value: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Message: ${message}

Submitted via STRUCTURE website
        `.trim()
      }]
    })
  })
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

### Step 3: Update ContactForm.tsx

The form will automatically call the Edge Function.

---

## Option 2: Simple Email Service (EASIEST)

### Use Gmail SMTP

1. Install nodemailer:
```bash
npm install nodemailer
```

2. Create API route: `/app/api/send-email/route.ts`

```typescript
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, phone, company, message } = await request.json()
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'structureailogistics@gmail.com',
      pass: 'YOUR_APP_PASSWORD', // Generate in Gmail settings
    },
  })
  
  await transporter.sendMail({
    from: 'structureailogistics@gmail.com',
    to: 'structureailogistics@gmail.com',
    subject: `New Quote Request from ${company}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Message: ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  })
  
  return NextResponse.json({ success: true })
}
```

3. Update ContactForm to call API:

```typescript
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
```

---

## Option 3: Zapier/Make.com (NO CODE)

1. Go to Zapier.com or Make.com
2. Create new Zap/Scenario:
   - Trigger: Supabase New Row in `contact_submissions`
   - Action: Send Email to `structureailogistics@gmail.com`
3. Connect your Supabase account
4. Configure email template
5. Done!

---

## Quick Setup Guide

**For Gmail App Password:**
1. Go to Google Account settings
2. Security → 2-Step Verification (enable it)
3. App Passwords → Generate new password
4. Use that password in the code above

**Supabase Connection:**
- URL: (see your Supabase dashboard)
- Anon Key: (see your Supabase dashboard)

---

## What Happens Now

✅ User fills form on website
✅ Data saves to Supabase `contact_submissions` table
✅ Trigger fires (from SQL script)
✅ Email sent to: **structureailogistics@gmail.com**
✅ You get instant notification!

---

## Recommended: Option 2 (Gmail SMTP)

It's the easiest and works immediately. Let me know if you want me to implement it!

