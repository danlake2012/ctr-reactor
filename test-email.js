#!/usr/bin/env node

// Simple email test script for CTR Reactor
// Run with: node test-email.js

const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('🧪 Testing CTR Reactor Email Configuration...\n');

  // Check environment variables
  const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER || 'support@ctr-reactor.com';
  const smtpPass = process.env.SMTP_PASS;

  console.log('📧 Configuration:');
  console.log(`   Host: ${smtpHost}`);
  console.log(`   Port: ${smtpPort}`);
  console.log(`   User: ${smtpUser}`);
  console.log(`   Password: ${smtpPass ? '***' + smtpPass.slice(-3) : 'NOT SET'}\n`);

  if (!smtpPass) {
    console.log('❌ SMTP_PASS environment variable is not set!');
    console.log('   Please set your Zoho Mail password in .env.local or environment variables.\n');
    process.exit(1);
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === 'true' ? true : false,
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  try {
    // Test connection
    console.log('🔌 Testing connection to SMTP server...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    // Send test email
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: `"CTR Reactor Support" <${smtpUser}>`,
      to: smtpUser, // Send to yourself for testing
      subject: 'CTR Reactor Email Test',
      html: `
        <div style="font-family: 'Orbitron', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #00ffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ffff; margin: 0; font-size: 28px; text-shadow: 0 0 10px #00ffff;">CTR REACTOR</h1>
            <p style="color: #b0b0b0; margin: 5px 0; font-size: 14px;">Email Test Successful!</p>
          </div>

          <div style="background: rgba(0, 255, 255, 0.1); border: 1px solid #00ffff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2 style="color: #00ffff; margin-top: 0;">✅ Email Configuration Working!</h2>
            <p style="margin: 10px 0;">Your CTR Reactor support system can now send emails successfully.</p>
            <p style="margin: 10px 0;"><strong style="color: #00ffff;">Test sent at:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 255, 255, 0.3);">
            <p style="color: #b0b0b0; margin: 0; font-size: 12px;">
              CTR Reactor Support System<br>
              Email configuration test completed successfully!
            </p>
          </div>
        </div>
      `,
      text: `CTR Reactor Email Test

✅ Email Configuration Working!

Your CTR Reactor support system can now send emails successfully.

Test sent at: ${new Date().toLocaleString()}

---
CTR Reactor Support System
Email configuration test completed successfully!
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Check your inbox at: ${smtpUser}\n`);

    console.log('🎉 CTR Reactor email system is ready to go!');
    console.log('   Support tickets will now send email notifications to customers.');

  } catch (error) {
    console.log('❌ Email test failed!');
    console.log(`   Error: ${error.message}\n`);

    console.log('🔧 Troubleshooting tips:');
    console.log('   1. Check your Zoho Mail credentials');
    console.log('   2. Verify DNS records are set up correctly');
    console.log('   3. Try using port 465 with SMTP_SECURE=true');
    console.log('   4. Check if 2FA is enabled (might need app password)');
    console.log('   5. Verify the email account exists in Zoho Mail\n');

    process.exit(1);
  }
}

testEmail().catch(console.error);