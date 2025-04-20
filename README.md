# Arunava Kar Portfolio Website

A modern portfolio website showcasing skills, projects, and blog content for Arunava Kar, a Computational Linguist and AI Engineer.

## Features

- Responsive design that works across all device sizes
- Interactive elements with smooth animations
- Contact form with serverless backend
- Dynamic blog system with headless CMS integration
- Organized sections for projects, skills, publications, and more

## Project Structure

```
portfolio-site/
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # Core JavaScript functionality
├── images/                 # Image assets
├── functions/              # Serverless functions
│   ├── contact-form.js     # Contact form handler
│   └── get-blogs.js        # Blog posts API
├── index.html              # Homepage
├── about.html              # About page
├── blog.html               # Blog listing page
├── netlify.toml            # Netlify deployment config
└── README.md               # This file
```

## Setup and Deployment

### Local Development

1. Clone this repository
2. Install dependencies for serverless functions:

```bash
cd portfolio-site
npm init -y
npm install mongodb @sendgrid/mail @sanity/client
```

3. For local development with Netlify functions, install the Netlify CLI:

```bash
npm install -g netlify-cli
```

4. Start the local development server:

```bash
netlify dev
```

### Deploy to Netlify

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Set up the following environment variables in Netlify:

- `MONGODB_URI`: Your MongoDB connection string
- `SENDGRID_API_KEY`: Your SendGrid API key
- `SANITY_PROJECT_ID`: Your Sanity.io project ID
- `SANITY_DATASET`: Your Sanity dataset name (usually "production")

4. Deploy!

## Setting Up MongoDB

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster and database
3. Create a collection named `contact_messages`
4. Get your MongoDB connection string and add it to your environment variables

## Setting Up SendGrid

1. Create a free SendGrid account at https://sendgrid.com/
2. Verify your sender email address
3. Create an API key with mail sending permissions
4. Add your API key to your environment variables

## Setting Up Sanity.io for Blog

1. Create a Sanity.io account at https://www.sanity.io/
2. Install the Sanity CLI: `npm install -g @sanity/cli`
3. Initialize a new Sanity project: `sanity init`
4. Create a schema for blog posts with the following fields:
   - title (string)
   - slug (slug)
   - publishedAt (datetime)
   - excerpt (text)
   - mainImage (image)
   - categories (reference to category)
   - featured (boolean)
   - content (rich text)
5. Get your project ID and add it to your environment variables

## Implementing ML Spam Filtering

For future implementation of ML spam filtering:

1. Connect to a service like Google Cloud NLP or create a custom TensorFlow.js model
2. Create a new serverless function to process incoming contact form submissions
3. Analyze text content for spam indicators
4. Update the database record with spam classification and priority scoring
5. Set up a scheduled function to send daily digests of prioritized messages

## License

This project is created for Arunava Kar and should not be used without permission.

## Credits

- Font Awesome for icons
- AOS for scroll animations
- Google Fonts for typography 