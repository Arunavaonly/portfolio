// netlify/functions/get-blogs.js
import {createClient} from 'https://esm.sh/@sanity/client';

// Ensure these are set as environment variables in your Netlify site settings
const {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION = '2023-08-01', // Use the date you initialized your Sanity project, or a recent one
  SANITY_API_READ_TOKEN // Needed for fetching drafts/preview content
} = process.env;

const client = createClient({
  projectId: "7ouj82af",
  dataset: "production",
  apiVersion: "v2025-04-22",
  useCdn: true // Set to false to ensure you get the latest data (useful for drafts)
});

exports.handler = async (event) => {
  const { slug, featured, page, limit, preview } = event.queryStringParameters;

  // Convert parameters to appropriate types
  const fetchDrafts = preview === 'true';
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || null;
  const offset = limitNum ? (pageNum - 1) * limitNum : null;

  try {
    // Handle fetching a single post by slug
    if (slug) {
      // GROQ query for a single post by slug
      const postQuery = `
        *[_type == "post" && slug.current == $slug ${!fetchDrafts ? '&& publishedAt < now()' : ''}] {
          _id,
          title,
          slug.current,
          publishedAt,
          excerpt,
          "category": categories[]->title[0],
          "mainImageUrl": mainImage.asset->url,
          body, // Fetch the full body content
          // Add other fields if needed
        }[0] // Get the first matching document
      `;

      const post = await client.fetch(postQuery, { slug });

      if (post) {
        // Structure response for single post (main.js expects an array for some reason)
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ posts: [post] }),
        };
      } else {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Blog post not found' }),
        };
      }
    }

    // Handle fetching multiple posts (paginated or featured list)
    let filterConditions = ['_type == "post"'];

    if (!fetchDrafts) {
       filterConditions.push('publishedAt < now()');
    }

    if (featured === 'true') {
       filterConditions.push('featured == true');
    }

    const mainFilter = filterConditions.join(' && ');

    // GROQ query for listing posts (with optional filters and pagination)
    const listQuery = `
      *[${mainFilter}] | order(publishedAt desc) ${limitNum !== null ? `[${offset}...${offset + limitNum}]` : ''} {
        _id,
        title,
        slug.current,
        publishedAt,
        excerpt,
        "category": categories[]->title[0],
        "mainImageUrl": mainImage.asset->url,
        featured, // Include featured status if needed by the list rendering
        // Exclude the full body content for list view
      }
    `;

    // GROQ query for total count (for pagination)
    const countQuery = `
      count(*[${mainFilter}])
    `;

    const [posts, totalPosts] = await Promise.all([
        client.fetch(listQuery),
        client.fetch(countQuery)
    ]);

    const totalPages = limitNum ? Math.ceil(totalPosts / limitNum) : 1; // Calculate total pages

    // Structure response for multiple posts
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        posts,
        pagination: {
          totalPosts,
          totalPages,
          currentPage: pageNum,
        },
      }),
    };

  } catch (error) {
    console.error('Sanity fetch error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Error fetching data from Sanity', error: error.message }),
    };
  }
};