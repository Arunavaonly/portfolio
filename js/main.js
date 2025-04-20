
// Terminal typing animation
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
                terminalOverlay.classList.add('fade-out');
                mainContent.classList.remove('content-hidden');
                mainContent.classList.add('content-visible');
                
                // Remove terminal from DOM after animation
                setTimeout(() => {
                    terminalOverlay.remove();
                }, 300);
            }, 700);
            return;
        }
        
        // Get current line
        const line = bioText[lineIndex];
        
        if (charIndex < line.length) {
            // Still typing current line
            currentLine += line.charAt(charIndex);
            terminal.innerHTML = currentLine;
            charIndex++;
            addRandomGlitch();
            
            // Continue typing with variable speed
            setTimeout(typeNextChar, getRandomTypingSpeed());
        } else {
            // Line completed
            terminal.innerHTML = currentLine;
            
            // Add new line
            setTimeout(() => {
                currentLine += '<br>';
                terminal.innerHTML = currentLine;
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

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
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

    // Contact form submission with serverless function
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form status and button elements
            const formStatus = document.getElementById('form-status');
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form data
            let isValid = true;
            
            if (!name) {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('email-error').textContent = 'Please enter your email';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            if (!subject) {
                document.getElementById('subject-error').textContent = 'Please enter a subject';
                isValid = false;
            }
            
            if (!message) {
                document.getElementById('message-error').textContent = 'Please enter a message';
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
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            
            // Detect if in local development environment (no API available)
            if (isLocalDevelopment()) {
                // Simulate successful submission for local development
                setTimeout(() => {
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }, 1500);
                
                return;
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
            })
            .catch(error => {
                // Show error message
                formStatus.textContent = 'An error occurred. Please try again later.';
                formStatus.className = 'form-status error';
                console.error('Error submitting form:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (!emailInput.value.trim()) {
                emailInput.classList.add('error');
                return;
            } else {
                emailInput.classList.remove('error');
            }
            
            // In a real application, you would send the email to a server
            // For this demo, we'll just show a success message
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            // Simulate form submission
            setTimeout(() => {
                newsletterForm.reset();
                submitBtn.textContent = 'Subscribed!';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 3000);
            }, 1500);
        });
    }
    
    // Add active class to navigation based on current page
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

    // Skills animation on hover
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
            showError('Blog post not found. Please check the URL and try again.');
        }
    }
});

// Function to check if we're in local development environment
function isLocalDevelopment() {
    return (
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        window.location.protocol === 'file:'
    );
}

// Function to fetch from API or use mock data in development
function fetchFromApiOrMock(endpoint, mockDataSelector) {
    if (isLocalDevelopment()) {
        // Check if mock data script is loaded
        if (typeof window.mockData === 'undefined') {
            console.warn('Mock data not loaded. Add <script src="js/mock-data.js"></script> to your HTML');
            return Promise.reject(new Error('Mock data not available'));
        }
        
        // Return mock data
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                const data = mockDataSelector(window.mockData);
                resolve(data);
            }, 500);
        });
    }
    
    // Use real API in production
    return fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            return response.json();
        });
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
    
    // Fetch featured posts from our API or mock data
    fetchFromApiOrMock(
        '/api/get-blogs?featured=true&limit=3&preview=true',
        (mockData) => {
            // Filter for featured posts only
            const posts = mockData.blogPosts.posts.filter(post => post.featured).slice(0, 3);
            return { posts };
        }
    )
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
    
    // Fetch blog posts from API or mock data
    fetchFromApiOrMock(
        `/api/get-blogs?page=${page}&limit=${limit}&preview=true`,
        (mockData) => {
            // Paginate mock data
            const allPosts = mockData.blogPosts.posts;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedPosts = allPosts.slice(startIndex, endIndex);
            
            return {
                posts: paginatedPosts,
                pagination: {
                    totalPosts: allPosts.length,
                    totalPages: Math.ceil(allPosts.length / limit),
                    currentPage: page
                }
            };
        }
    )
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
        }
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
        blogPostsContainer.innerHTML = '<div class="error">Error loading posts. Please try again later.</div>';
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
    
    // Fetch blog post from API or mock data
    fetchFromApiOrMock(
        `/api/get-blogs?slug=${slug}&preview=false`,
        (mockData) => {
            // Find post by slug
            const post = mockData.blogPosts.posts.find(p => p.slug === slug);
            return { posts: post ? [post] : [] };
        }
    )
    .then(data => {
        if (data.posts && data.posts.length > 0) {
            const post = data.posts[0];
            renderBlogPost(post);
            
            // Update the page title and meta description
            document.title = `${post.title} | Arunava Kar`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', post.excerpt);
            }
        } else {
            showError('Blog post not found. Please check the URL and try again.');
        }
    })
    .catch(error => {
        console.error('Error fetching blog post:', error);
        showError('An error occurred while loading the blog post. Please try again later.');
    });
}

// Function to render a blog post
function renderBlogPost(post) {
    // Get the container
    const container = document.getElementById('blog-post-container');
    
    // Format the date
    const publishDate = new Date(post.publishedAt);
    const formattedDate = publishDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Convert markdown content to HTML (if Marked.js is available)
    let contentHtml = post.content;
    if (typeof marked !== 'undefined') {
        contentHtml = marked.parse(post.content);
    }
    
    // Create the blog post HTML
    const html = `
        <div class="blog-post-container" data-aos="fade-up">
            <div class="blog-post-image">
                <div class="blog-placeholder ${getCategoryClass(post.category)}"></div>
            </div>
            <div class="blog-post-header">
                <div class="blog-post-meta">
                    <span class="blog-post-category">${post.category}</span>
                    <span class="blog-post-date">${formattedDate}</span>
                </div>
                <h1 class="blog-post-title">${post.title}</h1>
            </div>
            <div class="blog-post-content markdown-body">
                ${contentHtml}
            </div>
            <div class="blog-post-author" data-aos="fade-up">
                <div class="blog-post-author-image">
                    <div class="profile-placeholder small"></div>
                </div>
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

// Function to update pagination
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

// Function to create a blog post element
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
        <div class="post-image">
            <div class="blog-placeholder ${getCategoryClass(post.category)}"></div>
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-category">${post.category}</span>
                <span class="post-date">${formattedDate}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="blog-post.html?slug=${post.slug}" class="btn-small">Read More</a>
        </div>
    `;
    
    return postElement;
}

// Function to show error message
function showError(message) {
    // Get the container
    const container = document.getElementById('blog-post-container') || document.querySelector('.blog-posts-container');
    
    if (container) {
        // Show error message
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Helper function to get CSS class based on post category
function getCategoryClass(category) {
    const categoryMap = {
        'Sentiment Analysis': 'sentiment-analysis',
        'LLMs': 'llm',
        'NLP': 'ontology',
        'Case Study': 'youtube',
        'Gen AI': 'rag',
        'Language': 'bengali',
        'Project': 'pdf'
    };
    
    return categoryMap[category] || '';
}
