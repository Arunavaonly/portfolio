// Contact Form Handler Serverless Function
// This will be deployed to Netlify/Vercel

/**
 * This function handles contact form submissions.
 * It will:
 * 1. Validate the submission
 * 2. Store the submission in a database (MongoDB)
 * 3. Send an email notification
 * 4. Return a success or error response
 * 
 * To complete the implementation, you'll need to:
 * - Install dependencies: npm install mongodb @sendgrid/mail
 * - Set environment variables for MongoDB connection and SendGrid API key
 */

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*', // Replace with your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Store in database (to be implemented)
    // This is a placeholder for the MongoDB connection
    // When you install the mongodb package, uncomment this section
    /*
    const { MongoClient } = require('mongodb');
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const database = client.db('portfolio');
      const messages = database.collection('contact_messages');
      
      // Add timestamp and spam status (to be determined later)
      const messageData = {
        ...data,
        timestamp: new Date(),
        isSpam: false,
        priority: 'medium',
        processed: false
      };
      
      const result = await messages.insertOne(messageData);
      console.log(`Message stored with ID: ${result.insertedId}`);
    } finally {
      await client.close();
    }
    */

    // Send email notification (to be implemented)
    // This is a placeholder for the SendGrid email sending
    // When you install the @sendgrid/mail package, uncomment this section
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'arunavakaronly@gmail.com', // Your email
      from: 'notification@yourdomain.com', // Your verified SendGrid sender
      subject: `New Contact Form: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Subject:</strong> ${data.subject}</p>
<p><strong>Message:</strong> ${data.message}</p>
      `
    };
    
    await sgMail.send(msg);
    */
    
    // For now, we'll just log the submission
    console.log('Form submission received:', data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully' 
      })
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'An error occurred processing your submission' 
      })
    };
  }
}; 