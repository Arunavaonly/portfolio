// netlify/functions/contact-form.js
const { createTransport } = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  // Validate form data (basic validation)
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please fill in all fields.' }),
    };
  }

  // Configure Nodemailer transporter
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    // Send email
   const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending email.' }),
    };
  }
};
