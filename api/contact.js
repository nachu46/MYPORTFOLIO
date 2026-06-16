const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, domain, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill out all required fields.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `[Portfolio Inquiry] ${domain} - ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea;">
        <h2 style="color: #333;">New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Domain:</strong> ${domain}</p>
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;">
        <h3 style="color: #555;">Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Message delivered successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Check server configuration.' });
  }
}
