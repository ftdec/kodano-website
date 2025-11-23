/**
 * Standalone Resend test script
 * Tests Resend email sending without Next.js
 * 
 * Usage:
 *   npm run test:resend
 * 
 * Make sure .env.local exists with:
 *   RESEND_API_KEY=re_xxxxx
 *   RESEND_FROM_EMAIL=noreply@kodano.com.br
 *   RESEND_FROM_NAME=Kodano Pagamentos
 */
import { readFileSync } from "fs";
import { join } from "path";
import { Resend } from "resend";

// Load .env.local manually (since we're not using Next.js)
function loadEnv() {
  try {
    const envPath = join(process.cwd(), ".env.local");
    const envFile = readFileSync(envPath, "utf-8");
    const env: Record<string, string> = {};

    for (const line of envFile.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
        }
      }
    }

    // Set process.env
    Object.assign(process.env, env);
  } catch (error) {
    console.warn("⚠️  Could not load .env.local, using process.env directly");
  }
}

async function main() {
  // Load environment variables
  loadEnv();

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const fromName = process.env.RESEND_FROM_NAME || "Kodano";

  // Validate API key
  if (!apiKey) {
    console.error("❌ Missing RESEND_API_KEY in environment variables");
    console.error("   Create a .env.local file with:");
    console.error("   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx");
    process.exit(1);
  }

  // Get test email from command line or use default
  const testEmail = process.argv[2] || process.env.TEST_EMAIL;
  if (!testEmail) {
    console.error("❌ No test email provided");
    console.error("   Usage: npm run test:resend <your-email@example.com>");
    console.error("   Or set TEST_EMAIL in .env.local");
    process.exit(1);
  }

  // Initialize Resend
  const resend = new Resend(apiKey);

  // Prepare from address
  const from = fromEmail
    ? `${fromName} <${fromEmail}>`
    : "onboarding@resend.dev"; // fallback

  console.log("📧 Testing Resend email sending...");
  console.log("   From:", from);
  console.log("   To:", testEmail);
  console.log("   API Key:", `${apiKey.substring(0, 10)}...`);

  // Send test email
  const { data, error } = await resend.emails.send({
    from,
    to: testEmail,
    subject: "Teste standalone Resend - Kodano",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #002A35;">✅ Teste Resend</h1>
        <p>Se você recebeu este email, o Resend está funcionando corretamente!</p>
        <p><strong>Enviado em:</strong> ${new Date().toLocaleString("pt-BR")}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Este é um email de teste enviado pelo script standalone.
        </p>
      </div>
    `,
    text: `Teste Resend\n\nSe você recebeu este email, o Resend está funcionando corretamente!\n\nEnviado em: ${new Date().toLocaleString("pt-BR")}`,
  });

  // Handle result
  if (error) {
    console.error("❌ Error sending email:");
    console.error("   Message:", error.message);
    console.error("   Name:", error.name);
    console.error("   Full error:", JSON.stringify(error, null, 2));
    process.exit(1);
  }

  if (data) {
    console.log("✅ Email sent successfully!");
    console.log("   Email ID:", data.id);
    console.log("\n💡 Check your inbox (and spam folder) for the test email.");
  } else {
    console.error("❌ No data returned from Resend");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});

