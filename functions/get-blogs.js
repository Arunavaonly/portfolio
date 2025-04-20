// Blog Posts API Serverless Function
// This will be deployed to Netlify/Vercel

/**
 * This function fetches blog posts from a headless CMS (Sanity.io).
 * It supports:
 * - Pagination (limit, offset)
 * - Filtering (featured posts)
 * - Full content or preview mode
 * 
 * To complete the implementation, you'll need to:
 * - Install dependencies: npm install @sanity/client
 * - Set environment variables for Sanity project ID and dataset
 */

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*', // Replace with your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get query parameters
    const params = event.queryStringParameters || {};
    const limit = parseInt(params.limit) || 10;
    const offset = parseInt(params.offset) || 0;
    const featured = params.featured === 'true';
    const preview = params.preview === 'true';

    // Mock data for now
    // This will be replaced with actual Sanity client code when dependencies are installed
    const mockPosts = [
      {
        id: '1',
        title: 'Building Effective Sentiment Analysis Models for Low-Resource Languages',
        slug: 'sentiment-analysis-low-resource-languages',
        publishedAt: '2025-03-15T12:00:00Z',
        excerpt: 'Exploring challenges and techniques in developing sentiment analysis models for languages with limited digital resources, with a focus on Bengali and other South Asian languages.',
        featuredImage: {
          url: 'https://example.com/images/sentiment-analysis.jpg',
          alt: 'Sentiment analysis visualization'
        },
        category: 'Sentiment Analysis',
        featured: true
      },
      {
        id: '2',
        title: 'Fine-tuning LLMs for Domain-Specific Applications',
        slug: 'fine-tuning-llms-domain-specific',
        publishedAt: '2025-03-01T12:00:00Z',
        excerpt: 'Strategies and best practices for adapting large language models to specialized tasks and industry domains.',
        featuredImage: {
          url: 'https://example.com/images/llm-fine-tuning.jpg',
          alt: 'Neural network visualization'
        },
        category: 'LLMs',
        featured: true
      },
      {
        id: '3',
        title: 'Ontological Frameworks in Modern NLP',
        slug: 'ontological-frameworks-modern-nlp',
        publishedAt: '2025-02-18T12:00:00Z',
        excerpt: 'How traditional linguistic ontologies are finding new applications in modern deep learning NLP systems.',
        featuredImage: {
          url: 'https://example.com/images/ontology-nlp.jpg',
          alt: 'Ontology visualization'
        },
        category: 'NLP',
        featured: false
      },
      {
        id: '4',
        title: 'Detecting Click-bait in YouTube Videos Using Multimodal Analysis',
        slug: 'detecting-clickbait-youtube-multimodal',
        publishedAt: '2025-02-05T12:00:00Z',
        excerpt: 'A detailed look at my approach to building click-bait detection models that analyze both textual and visual content.',
        featuredImage: {
          url: 'https://example.com/images/clickbait-detection.jpg',
          alt: 'YouTube video analysis'
        },
        category: 'Case Study',
        featured: false
      },
      {
        id: '5',
        title: 'Implementing Efficient RAG Systems with Vector Databases',
        slug: 'rag-systems-vector-databases',
        publishedAt: '2025-01-22T12:00:00Z',
        excerpt: 'Best practices for building Retrieval-Augmented Generation systems that scale efficiently for enterprise applications.',
        featuredImage: {
          url: 'https://example.com/images/rag-systems.jpg',
          alt: 'Vector database visualization'
        },
        category: 'Gen AI',
        featured: true
      }
    ];

    // Sample content for a full blog post
    const sampleContent = `
# Building Effective Sentiment Analysis Models for Low-Resource Languages

Sentiment analysis has become an essential tool for understanding user opinions, feedback, and emotions expressed in text. While this technology has advanced significantly for major languages like English, many languages worldwide lack the necessary resources for developing effective sentiment analysis models.

## The Challenge of Low-Resource Languages

Low-resource languages, particularly those spoken in regions like South Asia, face several challenges:

1. **Limited digital text corpora**: Many languages have sparse digital presence, making it difficult to build large training datasets.
2. **Lack of annotated data**: Sentiment-labeled datasets are rare or nonexistent for many languages.
3. **Complex linguistic features**: Languages like Bengali have rich morphological structures that present unique computational challenges.
4. **Code-mixing**: In many multilingual societies, text often contains a mix of languages, further complicating analysis.

## Effective Strategies for Low-Resource Settings

### 1. Transfer Learning from Multilingual Models

Multilingual transformer-based models like mBERT and XLM-RoBERTa offer a promising starting point. These models are pre-trained on multiple languages and can be fine-tuned for sentiment analysis tasks with relatively small amounts of target language data.

### 2. Data Augmentation Techniques

When working with limited data, augmentation techniques become crucial:

- **Transliteration**: Converting between different scripts
- **Back-translation**: Translating text to a high-resource language and back
- **Synthetic data generation**: Using existing models to create more examples
- **Rule-based transformations**: Applying linguistic rules to create variations of existing samples

### 3. Leveraging Cross-Lingual Transfer

Knowledge can be transferred from high-resource languages to low-resource ones through:

- **Cross-lingual embeddings**: Aligning vector spaces across languages
- **Joint training**: Training models on multiple languages simultaneously
- **Adapter-based approaches**: Using language-specific modules with shared base models

## Case Study: Bengali Sentiment Analysis

In my research at IIT Guwahati, I developed a sentiment analysis model for Bengali that demonstrates these principles. The model achieved 93% accuracy on a test dataset despite limited training data.

Key features of the approach included:

- Fine-tuning a multilingual RoBERTa model
- Creating a custom annotated dataset of Bangla-English code-mixed content
- Implementing specialized preprocessing for Bengali-specific linguistic features
- Applying augmentation techniques to expand the training dataset

## Future Directions

As we continue to develop sentiment analysis capabilities for low-resource languages, several promising directions emerge:

1. **Self-supervised approaches** that require minimal labeled data
2. **Community-driven annotation** projects to expand available datasets
3. **Specialized architectures** designed for morphologically rich languages
4. **Multimodal analysis** combining text with other data types

By addressing these challenges, we can help bridge the technological divide and ensure that sentiment analysis tools are accessible for all languages, regardless of their digital footprint.
    `;

    // Filter and paginate posts
    let filteredPosts = mockPosts;
    
    if (featured) {
      filteredPosts = filteredPosts.filter(post => post.featured);
    }
    
    const paginatedPosts = filteredPosts.slice(offset, offset + limit);
    
    // Add full content to posts if not in preview mode
    if (!preview) {
      paginatedPosts.forEach(post => {
        post.content = sampleContent;
      });
    }

    // Sanity.io implementation (commented out for now)
    // When you install the @sanity/client package, uncomment this section
    /*
    const sanityClient = require('@sanity/client');
    
    const client = sanityClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: '2023-03-01', // Use the latest API version
      useCdn: true // Use the CDN for faster response times
    });
    
    // Construct the GROQ query for Sanity
    let query = `*[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "featuredImage": {
        "url": mainImage.asset->url,
        "alt": mainImage.alt
      },
      "category": categories[0]->title,
      featured
    }`;
    
    // Add filters if needed
    if (featured) {
      query = `*[_type == "post" && featured == true] | order(publishedAt desc) {
        "id": _id,
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        "featuredImage": {
          "url": mainImage.asset->url,
          "alt": mainImage.alt
        },
        "category": categories[0]->title,
        featured
      }`;
    }
    
    // Add content if not in preview mode
    if (!preview) {
      query = query.replace(
        "featured",
        "featured, content"
      );
    }
    
    // Add pagination
    query += `[${offset}...${offset + limit}]`;
    
    // Fetch the data from Sanity
    const posts = await client.fetch(query);
    */

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        posts: paginatedPosts,
        meta: {
          total: filteredPosts.length,
          limit,
          offset
        }
      })
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'An error occurred fetching blog posts' })
    };
  }
}; 