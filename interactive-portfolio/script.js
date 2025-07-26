// Enhanced portfolio script with modern animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // ===== NAVIGATION =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Animate skill bars when skills section comes into view
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }

                // Animate stats when about section comes into view
                if (entry.target.id === 'about') {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== SKILL BAR ANIMATIONS =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    // ===== STATS COUNTER ANIMATION =====
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.textContent);
            const increment = target / 50;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                if (stat.textContent.includes('.')) {
                    stat.textContent = current.toFixed(1);
                } else if (stat.textContent.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 50);
        });
    }

    // ===== NAVBAR BACKGROUND ON SCROLL =====
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // ===== SCROLL EVENT LISTENERS =====
    window.addEventListener('scroll', () => {
        updateActiveNav();
        updateNavbar();
    });

    // ===== TYPING ANIMATION FOR HERO SUBTITLE =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Start typing animation after a delay
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 80);
        }
    }, 1000);

    // ===== PARALLAX EFFECT FOR HERO SECTION =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // ===== RESUME DOWNLOAD =====
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Create a comprehensive resume content
            const resumeContent = `
PRAJAKTA
Software Developer | Problem Solver | Tech Enthusiast

PERSONAL INFORMATION
Born: August 30, 2004
Location: BBSR, Odisha, India
University: CV Raman Global University
Status: Open to Work

CONTACT INFORMATION
Email: mallickprajakta180@gmail.com
LinkedIn: https://www.linkedin.com/in/prajakta-mallick/
GitHub: https://github.com/PrajaktaMallick

TECHNICAL SKILLS
Programming Languages: Python, JavaScript, Java, C++, HTML/CSS
Frameworks & Libraries: React, Node.js, Express.js, Bootstrap
Databases: MongoDB, MySQL, PostgreSQL
Tools & Technologies: Git, VS Code, Figma, Docker
Cloud Platforms: AWS, Firebase

LANGUAGES KNOWN
English (Fluent) - Professional working proficiency
Hindi (Native) - Native speaker
Odia (Native) - Native speaker

FEATURED PROJECTS
1. AtmosView - Modern Weather Application
   - Real-time weather data with beautiful UI
   - Technologies: JavaScript, CSS, Weather API

2. AI-Powered Test Automation Tool
   - Natural language testing commands
   - Technologies: Node.js, React, AI/ML

3. Interactive Portfolio Website
   - Modern responsive design with animations
   - Technologies: HTML5, CSS3, JavaScript

EDUCATION
CV Raman Global University
Bachelor's Degree in Computer Science
2022 - Present

ACHIEVEMENTS
- 10+ Completed Projects
- 5+ Programming Languages
- 3 Spoken Languages
- 3+ Years of Coding Experience
- Open Source Contributor

INTERESTS
- Full Stack Development
- UI/UX Design
- Artificial Intelligence
- Open Source Contribution
- Continuous Learning

Generated on: ${new Date().toLocaleDateString()}
Contact me for detailed project information and references.
            `;

            // Create and download the resume
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Prajakta_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            // Show success message
            showNotification('Resume downloaded successfully! 📄', 'success');
        });
    }

    // ===== LANGUAGE CARD INTERACTIONS =====
    const languageCards = document.querySelectorAll('.language-card');

    languageCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;

        // Add click interaction
        card.addEventListener('click', function() {
            const langName = this.querySelector('.language-name').textContent;
            const proficiency = this.querySelector('.proficiency-text').textContent;

            showNotification(`${langName} - ${proficiency} level! 🌍`, 'info');

            // Add a special effect
            this.style.transform = 'translateY(-15px) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 300);
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
        });
    });

    // ===== HERO TITLE INTERACTION =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('click', function() {
            showNotification('Hello! Nice to meet you! 👋', 'info');
        });
    }

    // ===== INITIALIZE =====
    updateActiveNav();
    updateNavbar();
});
