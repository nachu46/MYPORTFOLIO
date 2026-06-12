const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
    const { name, email, domain, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER, // Send directly to your inbox
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
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
