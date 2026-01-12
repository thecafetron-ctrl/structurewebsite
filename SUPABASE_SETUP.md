# 🗄️ SUPABASE INTEGRATION SETUP

## ✅ WHAT I DID

1. ✅ Installed `@supabase/supabase-js`
2. ✅ Created Supabase client (`/lib/supabase.ts`)
3. ✅ Updated ContactForm to submit to Supabase
4. ✅ Added loading states and error handling
5. ✅ Added success/error messages

---

## 📝 SETUP INSTRUCTIONS

### Step 1: Create Environment File

Create a file named `.env.local` in the root directory:

```bash
cd /Users/hamzashahid/structurewebsite
touch .env.local
```

Add these contents to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://uyfpbbeoiplfwojqxxml.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZnBiYmVvaXBsZndvanF4eG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDM5NTEsImV4cCI6MjA4MzcxOTk1MX0.S0oG-7axKgoSAG2San5JGo31qGNCT2JEXz9-xS5MhyM
```

### Step 2: Create Database Table

Go to your Supabase project dashboard:
https://supabase.com/dashboard/project/uyfpbbeoiplfwojqxxml

Navigate to: **SQL Editor** → **New Query**

Run this SQL:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

-- Add index for email lookups
CREATE INDEX idx_contact_submissions_email 
ON contact_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" 
ON contact_submissions 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow authenticated reads" 
ON contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);
```

### Step 3: Restart Dev Server

```bash
# Kill current server
pkill -f "next dev"

# Start fresh (will pick up .env.local)
npm run dev
```

---

## 📊 HOW IT WORKS

### **Form Submission Flow:**

1. User fills out contact form
2. Data is validated
3. Submitted to Supabase `contact_submissions` table
4. Success message shown
5. Email also sent as backup

### **Data Stored:**
- Name
- Email
- Phone
- Company
- Message
- Timestamp

### **Access Your Submissions:**

Go to Supabase Dashboard → Table Editor → `contact_submissions`

You can:
- View all submissions
- Export to CSV
- Set up email notifications
- Create automated workflows

---

## 🔒 SECURITY

✅ **Row Level Security (RLS) enabled**
✅ **Public can insert only** (submit forms)
✅ **Only you can read** (view submissions)
✅ **Anon key used** (safe for client-side)
✅ **Service role key NOT exposed** (kept secret)

---

## 🎯 QUICK COMMAND

Run this to create `.env.local`:

```bash
cat > /Users/hamzashahid/structurewebsite/.env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://uyfpbbeoiplfwojqxxml.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZnBiYmVvaXBsZndvanF4eG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDM5NTEsImV4cCI6MjA4MzcxOTk1MX0.S0oG-7axKgoSAG2San5JGo31qGNCT2JEXz9-xS5MhyM
EOF
```

---

## ✅ INTEGRATION COMPLETE

Once you:
1. Create `.env.local` with credentials
2. Run the SQL in Supabase to create table
3. Restart dev server

**All form submissions will save to your Supabase database!** 🎉

---

## 📧 EMAIL BACKUP

The form ALSO sends an email to `sales@structurelogistics.com` as a backup, so you get submissions both:
- In Supabase database
- In your email inbox

**Double coverage!** ✨

