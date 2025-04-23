// Terminal typing animation - Keep this section as is, it seems unrelated to the blog fetching issue.
document.addEventListener('DOMContentLoaded', function() {
    const terminalOverlay = document.getElementById('terminal-overlay');
    const mainContent = document.getElementById('main-content');

    // Check if this is first visit in current session
    if (sessionStorage.getItem('hasVisited')) {
        // If already visited, skip terminal animation
        if (terminalOverlay) {
            terminalOverlay.style.display = 'none';
            terminalOverlay.remove(); // Completely remove from DOM
        }
        if (mainContent) {
            mainContent.classList.remove('content-hidden');
            mainContent.classList.add('content-visible');
        }
        return;
    }

    // Mark that user has visited
    sessionStorage.setItem('hasVisited', 'true');

    // Bio text to display in the terminal
    const bioText = [
        "$ whoami",
        "Arunava Kar",
        "",
        "$ cat bio.txt",
        "Computational Linguist & AI Engineer with expertise in:",
        "- Natural Language Processing (NLP)",
        "- Large Language Models (LLMs)",
        "- Sentiment Analysis & Text Mining",
        "- Recommender Systems",
        "- Knowledge Graphs & Ontologies",
        "",
        "$ ./load_portfolio.sh",
        "Loading portfolio... Please wait..."
    ];

    const terminal = document.getElementById('terminal-text');

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    let isDeleting = false;
    let typingSpeed = 50; // Base typing speed in milliseconds

    // Random typing speed variation for realistic effect
    function getRandomTypingSpeed() {
        return Math.floor(Math.random() * (100 - typingSpeed) + typingSpeed);
    }

    // Add glitch effect randomly
    function addRandomGlitch() {
        if (Math.random() < 0.05) { // 5% chance for glitch
            const glitchText = terminal.innerHTML;
            terminal.innerHTML = `<span class="glitch">${glitchText}</span>`;
            setTimeout(() => {
                terminal.innerHTML = glitchText;
            }, 200);
        }
    }

    // Type next character
    function typeNextChar() {
        if (lineIndex >= bioText.length) {
            // All text typed, fade out terminal and show main content
            setTimeout(() => {
                if (terminalOverlay) {
                    terminalOverlay.classList.add('fade-out');
                }
                if (mainContent) {
                    mainContent.classList.remove('content-hidden');
                    mainContent.classList.add('content-visible');
                }


                // Remove terminal from DOM after animation
                setTimeout(() => {
                    if (terminalOverlay) {
                       terminalOverlay.remove();
                    }
                }, 300);
            }, 700);
            return;
        }

        // Get current line
        const line = bioText[lineIndex];

        if (charIndex < line.length) {
            // Still typing current line
            currentLine += line.charAt(charIndex);
            if (terminal) {
              terminal.innerHTML = currentLine;
            }
            charIndex++;
            addRandomGlitch();

            // Continue typing with variable speed
            setTimeout(typeNextChar, getRandomTypingSpeed());
        } else {
            // Line completed
             if (terminal) {
                terminal.innerHTML = currentLine;
             }


            // Add new line
            setTimeout(() => {
                currentLine += '<br>';
                 if (terminal) {
                     terminal.innerHTML = currentLine;
                 }

                lineIndex++;
                charIndex = 0;

                // Continue with next line
                setTimeout(typeNextChar, line === "" ? 200 : 500); // Longer pause after non-empty lines
            }, 500);
        }
    }

    // Start typing animation if elements exist
    if (terminal && terminalOverlay && mainContent) {
        setTimeout(typeNextChar, 300);
    }
});

// Initialize AOS (Animate On Scroll) - Keep this section as is
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }


    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    if (navbar) {
      window.addEventListener('scroll', function() {
          if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
      });
    }


    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            if (targetId) {
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Close mobile menu if open
                     if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.classList.remove('active');
                        }
                    }


                    // Scroll to target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact form submission with serverless function - Keep this section as is
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form status and button elements
            const formStatus = document.getElementById('form-status');
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit'; // Handle case where submitBtn might not exist


            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });

            // Get form data
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';


            // Validate form data
            let isValid = true;

            if (!name) {
                 const errorEl = document.getElementById('name-error');
                 if (errorEl) errorEl.textContent = 'Please enter your name';
                 isValid = false;
            }

            if (!email) {
                const errorEl = document.getElementById('email-error');
                if (errorEl) errorEl.textContent = 'Please enter your email';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                 const errorEl = document.getElementById('email-error');
                 if (errorEl) errorEl.textContent = 'Please enter a valid email address';
                 isValid = false;
            }

            if (!subject) {
                 const errorEl = document.getElementById('subject-error');
                 if (errorEl) errorEl.textContent = 'Please enter a subject';
                 isValid = false;
            }

            if (!message) {
                 const errorEl = document.getElementById('message-error');
                 if (errorEl) errorEl.textContent = 'Please enter a message';
                 isValid = false;
            }


            if (!isValid) {
                return;
            }

            // Prepare the data for submission
            const formData = {
                name,
                email,
                subject,
                message
            };

            // Update UI to show submission in progress
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }


            // Submit the form to our serverless function
            fetch('/api/contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (formStatus) {
                    if (data.success) {
                        // Show success message
                        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                        formStatus.className = 'form-status success';
                        contactForm.reset();
                    } else {
                        // Show error message
                        formStatus.textContent = data.error || 'An error occurred. Please try again.';
                        formStatus.className = 'form-status error';
                    }
                }
            })
            .catch(error => {
                 if (formStatus) {
                    // Show error message
                    formStatus.textContent = 'An error occurred. Please try again later.';
                    formStatus.className = 'form-status error';
                 }
                console.error('Error submitting form:', error);
            })
            .finally(() => {
                // Reset button state
                 if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                 }
            });
        });
    }

    // Newsletter form submission - Keep this section as is
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            const emailInput = newsletterForm.querySelector('input[type="email"]');

            if (!emailInput || !emailInput.value.trim()) {
                if (emailInput) emailInput.classList.add('error');
                return;
            } else {
                 if (emailInput) emailInput.classList.remove('error');
            }

            // In a real application, you would send the email to a server
            // For this demo, we'll just show a success message
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Subscribe'; // Handle case where submitBtn might not exist


            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';
            }


            // Simulate form submission
            setTimeout(() => {
                newsletterForm.reset();
                 if (submitBtn) {
                    submitBtn.textContent = 'Subscribed!';
                 }


                // Reset button after 3 seconds
                setTimeout(() => {
                     if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                     }
                }, 3000);
            }, 1500);
        });
    }

    // Add active class to navigation based on current page - Keep this section as is
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();

        if (currentPage === linkPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Skills animation on hover - Keep this section as is
    const skillItems = document.querySelectorAll('.skills-list span');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Fetch featured blog posts for homepage
    fetchFeaturedBlogPosts();

    // If on the blog page, fetch all blog posts
    if (window.location.pathname.includes('blog.html')) {
        fetchAllBlogPosts();
    }

    // If on a blog post page, fetch the specific post
    if (window.location.pathname.includes('blog-post.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (slug) {
            fetchBlogPost(slug);
        } else {
            showError('Blog post slug is missing. Please check the URL.');
        }
    }
});

// Basic Portable Text to HTML renderer (for simple blocks like paragraphs and headings)
// For a full implementation including lists, images, etc., consider a dedicated library.
function renderPortableText(blocks) {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  let html = '';
  blocks.forEach(block => {
    if (block._type === 'block') {
      const style = block.style || 'normal';
      let tag = 'p';
      if (style === 'h1') tag = 'h1';
      else if (style === 'h2') tag = 'h2';
      else if (style === 'h3') tag = 'h3';
      else if (style === 'h4') tag = 'h4';
      else if (style === 'blockquote') tag = 'blockquote';

      let text = '';
      if (block.children) {
        block.children.forEach(child => {
          let childText = child.text;
          // Basic handling for marks (bold, italic). Needs more for links and custom marks.
          if (child.marks) {
            child.marks.forEach(mark => {
              if (mark === 'strong') childText = `<strong>${childText}</strong>`;
              if (mark === 'em') childText = `<em>${childText}</em>`;
              // Add more mark types here if needed
            });
          }
          text += childText;
        });
      }
       // Basic list handling (needs more robust logic for nested lists, list item types)
       if (block.listItem) {
           const listTag = block.list === 'bullet' ? 'ul' : 'ol';
           html += `<${listTag}><li>${text}</li></${listTag}>`;
       } else {
            html += `<${tag}>${text}</${tag}>`;
       }

    }
    // Add handling for other Sanity types here if needed (e.g., _type: 'image')
    // if (block._type === 'image' && block.asset && block.asset.url) {
    //     html += `<img src="${block.asset.url}" alt="${block.alt || ''}" />`;
    // }
  });
  return html;
}


// Function to fetch featured blog posts
function fetchFeaturedBlogPosts() {
    // Check if we're on the homepage and if the featured posts container exists
    const featuredPostsContainer = document.querySelector('.blog-section .featured-posts');

    if (!featuredPostsContainer) {
        return;
    }

    // Show loading state
    featuredPostsContainer.innerHTML = '<div class="loading">Loading featured posts...</div>';

    // Fetch featured posts from our API
    fetch('/api/get-blogs?featured=true&limit=3&preview=false') // Use preview=false for published posts
    .then(response => {
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.posts && data.posts.length > 0) {
            // Clear loading state
            featuredPostsContainer.innerHTML = '';

            // Render each post
            data.posts.forEach(post => {
                const postElement = createBlogPostElement(post);
                featuredPostsContainer.appendChild(postElement);
            });
        } else {
            featuredPostsContainer.innerHTML = '<div class="no-posts">No featured posts found</div>';
        }
    })
    .catch(error => {
        console.error('Error fetching featured posts:', error);
        featuredPostsContainer.innerHTML = '<div class="error">Error loading posts. Please try again later.</div>';
    });
}

// Function to fetch all blog posts for the blog page
function fetchAllBlogPosts() {
    // Check if we're on the blog page
    const blogPostsContainer = document.querySelector('.blog-posts-container');

    if (!blogPostsContainer) {
        return;
    }

    // Show loading state
    blogPostsContainer.innerHTML = '<div class="loading">Loading blog posts...</div>';

    // Get URL parameters for pagination
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    const limit = 6; // Posts per page

    // Fetch blog posts from API
    fetch(`/api/get-blogs?page=${page}&limit=${limit}&preview=false`) // Use preview=false for published posts
    .then(response => {
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.posts && data.posts.length > 0) {
            // Clear loading state
            blogPostsContainer.innerHTML = '';

            // Render each post
            data.posts.forEach(post => {
                const postElement = createBlogPostElement(post);
                blogPostsContainer.appendChild(postElement);
            });

            // Update pagination if available
            if (data.pagination) {
                updatePagination(data.pagination);
            }
        } else {
            blogPostsContainer.innerHTML = '<div class="no-posts">No blog posts found</div>';
             if (document.querySelector('.blog-pagination')) {
                 document.querySelector('.blog-pagination').innerHTML = ''; // Clear pagination if no posts
             }
        }
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
        blogPostsContainer.innerHTML = '<div class="error">Error loading posts. Please try again later.</div>';
         if (document.querySelector('.blog-pagination')) {
             document.querySelector('.blog-pagination').innerHTML = ''; // Clear pagination on error
         }
    });
}

// Function to fetch a specific blog post
function fetchBlogPost(slug) {
    // Get the container
    const container = document.getElementById('blog-post-container');

    if (!container) {
        return;
    }

    // Show loading state
    container.innerHTML = '<div class="loading">Loading blog post...</div>';

    // Fetch blog post from API
    // Using preview=false here means it will only fetch published posts
    // If you want to preview drafts, you'd need authentication and potentially a different setup
    fetch(`/api/get-blogs?slug=${slug}&preview=false`)
    .then(response => {
        if (!response.ok) {
             if (response.status === 404) {
                throw new Error('Blog post not found.');
             }
            throw new Error(`API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // The serverless function returns { posts: [...] } even for a single post
        if (data.posts && data.posts.length > 0) {
            const post = data.posts[0];
            renderBlogPost(post);

            // Update the page title and meta description
            document.title = `${post.title} | Arunava Kar`;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription && post.excerpt) {
                metaDescription.setAttribute('content', post.excerpt);
            }

        } else {
            showError('Blog post not found. Please check the URL and try again.');
        }
    })
    .catch(error => {
        console.error('Error fetching blog post:', error);
        showError(error.message || 'An error occurred while loading the blog post. Please try again later.');
    });
}

// Function to render a blog post
function renderBlogPost(post) {
    // Get the container
    const container = document.getElementById('blog-post-container');

    if (!container) {
        return;
    }

    // Format the date
    const publishDate = new Date(post.publishedAt);
    const formattedDate = publishDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Render the Portable Text body
    const renderedBody = renderPortableText(post.body);

    // Create the blog post HTML
    const html = `
        <div class="blog-post-content-wrapper" data-aos="fade-up">
            <div class="blog-post-image" ${post.mainImageUrl ? `style="background-image: url('${post.mainImageUrl}');"` : ''}>
            </div>
            <div class="blog-post-header">
                <div class="blog-post-meta">
                    <span class="blog-post-date">${formattedDate}</span>
                </div>
                <h1 class="blog-post-title">${post.title}</h1>
            </div>
            <div class="blog-post-content">
                ${renderedBody}
            </div>
            <div class="blog-post-author" data-aos="fade-up">
                <div class="blog-post-author-image">
                    <div class="profile-placeholder small"></div> </div>
                <div class="blog-post-author-bio">
                    <h3>Arunava Kar</h3>
                    <p>Computational Linguist & AI Engineer with a Ph.D. in Computational Linguistics from the University of Hyderabad.</p>
                    <div class="author-social">
                        <a href="https://www.linkedin.com/in/arunava-kar-877418119" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="https://github.com/Arunavaonly/" target="_blank"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
            <div class="blog-nav">
                <a href="blog.html" class="btn-secondary"><i class="fas fa-arrow-left"></i> Back to Blog</a>
            </div>
        </div>
    `;

    // Update the container
    container.innerHTML = html;
}

// Function to update pagination - Keep this section as is
function updatePagination(pagination) {
    const paginationContainer = document.querySelector('.blog-pagination');

    if (!paginationContainer) {
        return;
    }

    const { totalPages, currentPage } = pagination;

    // Create pagination HTML
    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <a href="blog.html?page=${currentPage - 1}" class="pagination-item ${currentPage === 1 ? 'disabled' : ''}">
            <i class="fas fa-chevron-left"></i>
        </a>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <a href="blog.html?page=${i}" class="pagination-item ${i === currentPage ? 'active' : ''}">
                ${i}
            </a>
        `;
    }

    // Next button
    paginationHTML += `
        <a href="blog.html?page=${currentPage + 1}" class="pagination-item ${currentPage === totalPages ? 'disabled' : ''}">
            <i class="fas fa-chevron-right"></i>
        </a>
    `;

    // Update the container
    paginationContainer.innerHTML = paginationHTML;

    // Disable navigation for edge cases
    document.querySelectorAll('.pagination-item.disabled').forEach(item => {
        item.addEventListener('click', e => e.preventDefault());
    });
}

// Function to create a blog post element (for list/preview)
function createBlogPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'blog-post-preview';
    postElement.setAttribute('data-aos', 'fade-up');

    // Format the date
    const publishDate = new Date(post.publishedAt);
    const formattedDate = publishDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });     

    postElement.innerHTML = `
        <div class="post-image" ${post.mainImageUrl ? `style="background-image: url('${post.mainImageUrl}');"` : ''}>
            ${!post.mainImageUrl ? '<div class="image-placeholder"></div>' : ''} </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-date">${formattedDate}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="blog-post.html?slug=${post.slug}" class="btn-small">Read More</a> </div>
    `;

    return postElement;
}

// Function to show error message - Keep this section as is
function showError(message) {
    // Get the container
    const container = document.getElementById('blog-post-container') || document.querySelector('.blog-posts-container');

    if (container) {
        // Show error message
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}