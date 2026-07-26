import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.sendgrid.net",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "apikey",
    pass: process.env.SMTP_PASSWORD || "",
  },
});

export async function sendLeadConfirmationEmail(toEmail: string, firstName: string) {
  try {
    const mailOptions = {
      from: '"Cyril Financial Group Advisory" <advisory@cyrilfinancial.com>',
      to: toEmail,
      subject: `Your California Mortgage Consultation Request – Cyril Financial`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0A192F;">
          <h2 style="color: #0B6B53;">Cyril Financial Group</h2>
          <p>Dear ${firstName},</p>
          <p>Thank you for submitting your mortgage financing inquiry with Cyril Financial. Our executive advisory team in Los Angeles has received your profile.</p>
          <p>A Senior Managing Director will review your requirements and reach out within two business hours to discuss bespoke lending terms.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>Cyril Financial Advisory Team</strong><br/>CA DRE #02198421 | NMLS #2481023</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email dispatch failed:", error);
    return false;
  }
}