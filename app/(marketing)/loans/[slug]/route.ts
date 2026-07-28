import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handler for POST requests to /api/contact
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // --- Validation (Step 1) ---
    // Basic validation to ensure all fields are present.
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // --- Nodemailer Transport (Step 2) ---
    // Configure the email transporter using environment variables for security.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // --- Email Content (Step 3) ---
    // Define the email that will be sent.
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`, // Sender's name and your sending email
      to: process.env.EMAIL_TO, // The email address that will receive the form submissions
      replyTo: email, // Set the reply-to to the user's email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0A2342;">New Inquiry from Cyril Financial Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // --- Send Email (Step 4) ---
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
