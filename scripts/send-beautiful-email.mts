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

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .content { padding: 40px; color: #374151; line-height: 1.6; }
    .button { display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Kodano Pagamentos</h1>
    </div>
    <div class="content">
      <h2>Olá!</h2>
      <p>Este é um email de teste enviado através do Resend.</p>
      <p>O sistema de envio de emails está funcionando corretamente.</p>
      <a href="https://kodano.com.br" class="button">Visitar Site</a>
    </div>
    <div class="footer">
      <p>© 2024 Kodano Pagamentos. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>
`;

async function main() {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const fromName = process.env.RESEND_FROM_NAME || 'Kodano Pagamentos';
  // Try simplified from address for better Gmail deliverability
  const from = fromEmail; // Simplified: just email, no display name
  
  // Get all recipients - Kodano emails + backup Gmail
  const recipients: string[] = [];
  
  // Primary email
  if (process.env.RESEND_TO_EMAIL) {
    const primaryEmails = process.env.RESEND_TO_EMAIL.split(',').map(e => e.trim()).filter(Boolean);
    recipients.push(...primaryEmails);
  }
  
  // Additional Kodano emails
  if (process.env.RESEND_ADDITIONAL_EMAILS) {
    const additional = process.env.RESEND_ADDITIONAL_EMAILS.split(',').map(e => e.trim()).filter(Boolean);
    recipients.push(...additional);
  }
  
  // Backup Gmail (always included)
  const backupEmail = process.env.RESEND_BACKUP_EMAIL || 'felipe.caltabiano.castro@gmail.com';
  if (backupEmail && !recipients.includes(backupEmail)) {
    recipients.push(backupEmail);
  }
  
  // Fallback if no recipients configured
  if (recipients.length === 0) {
    recipients.push('contato@kodano.com.br', 'felipe.caltabiano@kodano.com.br', 'felipe.caltabiano.castro@gmail.com');
  }
  
  const to = recipients;

  // Plain text version for better deliverability
  const textContent = `
🚀 Kodano Pagamentos

Olá!

Este é um email de teste enviado através do Resend.

O sistema de envio de emails está funcionando corretamente.

Visite nosso site: https://kodano.com.br

© 2024 Kodano Pagamentos. Todos os direitos reservados.
  `.trim();

  console.log('📧 Email Configuration:');
  console.log('  From:', from);
  console.log('  To:', to.join(', '));
  console.log('  API Key:', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : 'NOT SET');
  console.log('');

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: 'Email de Teste - Kodano',
    html: htmlContent,
    text: textContent, // Add plain text version for better deliverability
  });

  if (error) {
    console.error('❌ Error:', error);
    console.error('  Error details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }

  console.log('✅ Email sent successfully!');
  console.log('📧 Email ID:', data?.id);
  console.log('');
  console.log('🔍 Troubleshooting:');
  console.log('  1. Check your Gmail spam/junk folder');
  console.log('  2. Check Resend dashboard: https://resend.com/emails');
  console.log('  3. Verify domain status: https://resend.com/domains');
  console.log('  4. Check DNS records are correct for notifications.kodano.com.br');
  console.log('  5. Wait a few minutes - delivery can take 1-5 minutes');
  console.log('');
  console.log('📊 View email details:');
  if (data?.id) {
    console.log(`  https://resend.com/emails/${data.id}`);
  }
}

main();
