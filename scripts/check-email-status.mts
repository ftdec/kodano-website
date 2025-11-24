import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local manually
const envPath = resolve(process.cwd(), '.env.local');
let apiKey = '';
try {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      const value = valueParts.join('=').trim();
      if (key.trim() === 'RESEND_API_KEY') {
        apiKey = value;
      }
    }
  });
} catch (e) {
  console.error('❌ Could not load .env.local');
  process.exit(1);
}

async function checkEmailStatus(emailId: string) {
  try {
    const response = await fetch(`https://api.resend.com/emails/${emailId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error fetching email status:', error);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

async function listRecentEmails() {
  try {
    const response = await fetch('https://api.resend.com/emails?limit=10', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error fetching emails:', error);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

async function main() {
  const emailId = process.argv[2];
  
  if (emailId) {
    console.log(`\n🔍 Checking status for email: ${emailId}\n`);
    const status = await checkEmailStatus(emailId);
    
    if (status) {
      console.log('📊 Email Status:');
      console.log('   ID:', status.id);
      console.log('   From:', status.from);
      console.log('   To:', Array.isArray(status.to) ? status.to.join(', ') : status.to);
      console.log('   Subject:', status.subject);
      console.log('   Created At:', status.created_at);
      console.log('   Last Event:', status.last_event || 'N/A');
      console.log('\n   Full details:', JSON.stringify(status, null, 2));
    }
  } else {
    console.log('\n📧 Recent Emails (last 10):\n');
    const emails = await listRecentEmails();
    
    if (emails && emails.data) {
      emails.data.forEach((email: any, index: number) => {
        console.log(`${index + 1}. ${email.subject}`);
        console.log(`   ID: ${email.id}`);
        console.log(`   To: ${Array.isArray(email.to) ? email.to.join(', ') : email.to}`);
        console.log(`   Status: ${email.last_event || 'unknown'}`);
        console.log(`   Created: ${email.created_at}`);
        console.log(`   Dashboard: https://resend.com/emails/${email.id}`);
        console.log('');
      });
      
      if (emails.data.length > 0) {
        console.log('\n💡 To check a specific email, run:');
        console.log(`   npx tsx scripts/check-email-status.mts <email-id>`);
        console.log(`   Example: npx tsx scripts/check-email-status.mts ${emails.data[0].id}`);
      }
    }
  }
}

main().catch(console.error);

