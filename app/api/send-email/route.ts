import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, ticketId } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div style="font-family: 'Orbitron', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #00ffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00ffff; margin: 0; font-size: 28px; text-shadow: 0 0 10px #00ffff;">CTR REACTOR</h1>
          <p style="color: #b0b0b0; margin: 5px 0; font-size: 14px;">Support System</p>
        </div>

        <div style="background: rgba(0, 255, 255, 0.1); border: 1px solid #00ffff; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h2 style="color: #00ffff; margin-top: 0;">Support Ticket Update</h2>
          <p style="margin: 10px 0;"><strong style="color: #00ffff;">Ticket ID:</strong> ${ticketId}</p>
          <p style="margin: 10px 0;"><strong style="color: #00ffff;">Subject:</strong> ${subject.replace('Update on your support ticket: ', '')}</p>
        </div>

        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #00ffff; margin-top: 0;">Message:</h3>
          <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 5px; border-left: 3px solid #00ffff;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 255, 255, 0.3);">
          <p style="color: #b0b0b0; margin: 0; font-size: 12px;">
            This is an automated message from CTR Reactor Support<br>
            Please do not reply to this email directly.
          </p>
        </div>
      </div>
    `;

    const emailText = `CTR Reactor Support Update

Ticket ID: ${ticketId}
Subject: ${subject.replace('Update on your support ticket: ', '')}

Message:
${message}

---
This is an automated message from CTR Reactor Support.
Please do not reply to this email directly.
    `;

    // Try to send email using NodeMailer (install with: npm install nodemailer @types/nodemailer)
    try {
      console.log('📧 Attempting to send email to:', to);

      // Check if NodeMailer is available
      let nodemailer;
      try {
        nodemailer = await import('nodemailer');
      } catch {
        console.log('📧 NodeMailer not installed, using fallback method');
        // Fallback: Log the email details for manual sending
        console.log('📧 EMAIL TO SEND MANUALLY:');
        console.log('From: support@ctr-reactor.com');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Message:', message);
        console.log('---');

        // For now, simulate success
        await new Promise(resolve => setTimeout(resolve, 500));
        return NextResponse.json({
          success: true,
          message: 'Email logged (NodeMailer not installed - install with: npm install nodemailer @types/nodemailer)'
        });
      }

      // Create transporter with SMTP settings
      // Zoho Mail configuration
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true' ? true : false, // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER || 'support@ctr-reactor.com',
          pass: process.env.SMTP_PASS
        },
        // Zoho Mail specific settings
        tls: {
          ciphers: 'SSLv3'
        }
      });

      // Send email
      const info = await transporter.sendMail({
        from: '"CTR Reactor Support" <support@ctr-reactor.com>',
        to: to,
        subject: subject,
        html: emailHtml,
        text: emailText
      });

      console.log('✅ Email sent successfully:', info.messageId);

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);

      // Log the email for manual sending as fallback
      console.log('📧 FALLBACK - EMAIL TO SEND MANUALLY:');
      console.log('From: support@ctr-reactor.com');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Message:', message);

      // Return success anyway so the message gets added to conversation
      return NextResponse.json({
        success: true,
        message: 'Message added to conversation (email failed - check console for details)',
        warning: 'Email sending failed'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}