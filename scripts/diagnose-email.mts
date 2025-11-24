import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local manually
const envPath = resolve(process.cwd(), '.env.local');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
} catch (e) {
  console.error('❌ Could not load .env.local');
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function checkEmailStatus(emailId: string) {
  try {
    // Note: Resend SDK doesn't have a get email method, but we can check via API
    console.log(`\n📊 Checking status for email: ${emailId}`);
    console.log(`   Dashboard: https://resend.com/emails/${emailId}`);
  } catch (error) {
    console.error('Error checking email status:', error);
  }
}

async function testWithResendDomain() {
  console.log('\n🧪 TEST 1: Testing with Resend test domain (onboarding@resend.dev)');
  console.log('   This will help determine if the issue is domain-specific\n');
  
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'felipe.caltabiano.castro@gmail.com',
    subject: '[TEST] Email from Resend test domain',
    html: '<p>This is a test email sent from Resend\'s test domain. If you receive this, the issue is with your custom domain setup.</p>',
    text: 'This is a test email sent from Resend\'s test domain. If you receive this, the issue is with your custom domain setup.',
  });

  if (error) {
    console.error('❌ Error:', error);
    return null;
  }

  console.log('✅ Test email sent!');
  console.log('   Email ID:', data?.id);
  console.log('   Check your Gmail inbox in 1-2 minutes');
  console.log('   If you receive this, the issue is domain-specific');
  
  return data?.id;
}

async function testWithCustomDomain() {
  console.log('\n🧪 TEST 2: Testing with your custom domain');
  console.log('   From: noreply@notifications.kodano.com.br\n');
  
  const { data, error } = await resend.emails.send({
    from: 'noreply@notifications.kodano.com.br',
    to: 'felipe.caltabiano.castro@gmail.com',
    subject: '[TEST] Email from notifications.kodano.com.br',
    html: '<p>This is a test email sent from your custom domain.</p>',
    text: 'This is a test email sent from your custom domain.',
  });

  if (error) {
    console.error('❌ Error:', error);
    return null;
  }

  console.log('✅ Test email sent!');
  console.log('   Email ID:', data?.id);
  console.log('   Dashboard: https://resend.com/emails/' + data?.id);
  
  return data?.id;
}

async function testToDifferentProvider() {
  console.log('\n🧪 TEST 3: Testing to a non-Gmail address');
  console.log('   This will help determine if the issue is Gmail-specific\n');
  
  const { data, error } = await resend.emails.send({
    from: 'noreply@notifications.kodano.com.br',
    to: 'contato@kodano.com.br',
    subject: '[TEST] Email to non-Gmail address',
    html: '<p>This is a test email sent to a non-Gmail address.</p>',
    text: 'This is a test email sent to a non-Gmail address.',
  });

  if (error) {
    console.error('❌ Error:', error);
    return null;
  }

  console.log('✅ Test email sent!');
  console.log('   Email ID:', data?.id);
  console.log('   Check contato@kodano.com.br inbox');
  
  return data?.id;
}

async function checkGmailFilters() {
  console.log('\n🔍 Gmail-Specific Checks:');
  console.log('   1. Check Gmail Settings → Filters and Blocked Addresses');
  console.log('   2. Check if there are any filters blocking notifications.kodano.com.br');
  console.log('   3. Check Gmail Settings → Forwarding and POP/IMAP');
  console.log('   4. Try searching Gmail for: "from:notifications.kodano.com.br"');
  console.log('   5. Check "All Mail" folder (not just Inbox)');
  console.log('   6. Check if you have multiple Gmail accounts signed in');
  console.log('   7. Check Gmail Settings → Accounts → Check mail from other accounts');
}

async function main() {
  console.log('🔬 Email Delivery Diagnostic Tool\n');
  console.log('This will run multiple tests to identify the issue.\n');
  
  // Test 1: Resend domain
  const test1Id = await testWithResendDomain();
  if (test1Id) {
    await checkEmailStatus(test1Id);
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  
  // Test 2: Custom domain
  const test2Id = await testWithCustomDomain();
  if (test2Id) {
    await checkEmailStatus(test2Id);
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  
  // Test 3: Non-Gmail
  const test3Id = await testToDifferentProvider();
  if (test3Id) {
    await checkEmailStatus(test3Id);
  }
  
  // Gmail-specific checks
  await checkGmailFilters();
  
  console.log('\n📋 Next Steps:');
  console.log('   1. Wait 2-5 minutes for emails to arrive');
  console.log('   2. Check Resend dashboard for delivery status: https://resend.com/emails');
  console.log('   3. Compare which emails arrive and which don\'t');
  console.log('   4. If Test 1 arrives but Test 2 doesn\'t → Domain issue');
  console.log('   5. If Test 3 arrives but Test 2 doesn\'t → Gmail-specific issue');
  console.log('   6. If none arrive → Check Resend dashboard for errors');
}

main().catch(console.error);

