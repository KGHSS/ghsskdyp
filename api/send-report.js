// School-Website/api/send-report.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { to, message } = req.body;

  if (!to || !message) {
    res.status(400).json({ error: 'Missing recipient or message' });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'websiteanonymus@gmail.com',
      pass: 'htmw qbnt exzw pjgm' // your Gmail App Password
    }
  });

  const mailOptions = {
    from: 'websiteanonymus@gmail.com',
    to: to,
    subject: 'New Report Submission',
    text: message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
}
