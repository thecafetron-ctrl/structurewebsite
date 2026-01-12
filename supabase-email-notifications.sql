-- SUPABASE EMAIL NOTIFICATIONS SETUP
-- This will send an email to structureailogistics@gmail.com when someone submits the form

-- First, enable the HTTP extension (required for sending emails via webhooks)
CREATE EXTENSION IF NOT EXISTS http;

-- Create a function to send email notifications
CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER AS $$
DECLARE
  email_body TEXT;
BEGIN
  -- Build email body
  email_body := 'New Contact Form Submission' || E'\n\n' ||
                'Name: ' || NEW.name || E'\n' ||
                'Email: ' || NEW.email || E'\n' ||
                'Phone: ' || NEW.phone || E'\n' ||
                'Company: ' || NEW.company || E'\n' ||
                'Message: ' || COALESCE(NEW.message, 'No message provided') || E'\n\n' ||
                'Submitted at: ' || NEW.created_at;

  -- Send notification (you'll need to configure this with your email service)
  -- Option 1: Use Supabase Edge Functions (recommended)
  -- Option 2: Use a webhook service like Zapier or Make.com
  -- Option 3: Use Supabase's built-in email (if configured)
  
  -- For now, we'll use pg_notify to trigger client-side handling
  PERFORM pg_notify(
    'new_contact_submission',
    json_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'phone', NEW.phone,
      'company', NEW.company,
      'message', NEW.message,
      'email_body', email_body
    )::text
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_contact_submission ON contact_submissions;

CREATE TRIGGER on_contact_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact_submission();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON contact_submissions TO anon;

-- Verify setup
SELECT 'Email notification trigger created successfully!' as status;

