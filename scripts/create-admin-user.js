// Script to create admin user in Supabase
// Run with: node scripts/create-admin-user.js

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Need service role key for admin operations

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set in .env.local');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env.local');
  console.log('\nTo create users, you need the Service Role Key from:');
  console.log('Supabase Dashboard → Project Settings → API → service_role (secret)\n');
  console.log('Add it to your .env.local file:');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createOrUpdateAdminUser() {
  const email = 'structureailogistics@gmail.com';
  const password = 'Blog@StructureAI!';

  console.log(`\n🔐 Setting up admin user: ${email}\n`);

  try {
    // First, try to get the user
    const { data: users } = await supabase.auth.admin.listUsers();
    const existingUser = users?.users?.find(u => u.email === email);
    
    if (existingUser) {
      // Update the password for existing user
      console.log('Found existing user, updating password...');
      const { data, error } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password: password, email_confirm: true }
      );
      
      if (error) throw error;
      
      console.log('✅ Password updated successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   User ID: ${existingUser.id}`);
    } else {
      // Create new user
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
      });

      if (error) throw error;

      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   User ID: ${data.user.id}`);
    }
    
    console.log('\n🚀 You can now login at /admin/login');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

createOrUpdateAdminUser();

