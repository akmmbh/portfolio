// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initTypingAnimation();
    initSmoothScrolling();
    initScrollAnimations();
    initStatCounters();
    initSkillBars();
    initContactForm();
    initNavbarScroll();
});

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const skills = [
        'Backend Developer',
        'Problem Solver',
        'Node.js Expert',
        'Go Developer',
        '600+ Problems Solved',
        'System Designer'
    ];
    
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeSkill() {
        const currentSkill = skills[skillIndex];
        
        if (!isDeleting && charIndex <= currentSkill.length) {
            typingText.textContent = currentSkill.substring(0, charIndex);
            charIndex++;
            
            if (charIndex > currentSkill.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000);
            }
        } else if (isDeleting && charIndex >= 0) {
            typingText.textContent = currentSkill.substring(0, charIndex);
            charIndex--;
            
            if (charIndex < 0) {
                isDeleting = false;
                skillIndex = (skillIndex + 1) % skills.length;
                charIndex = 0;
            }
        }
        
        if (!isPaused) {
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeSkill, typingSpeed);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeSkill, 1000);
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .hero-content > *');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'animated');
                
                // Trigger skill bars animation when skills section is visible
                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animation when about section is visible
                if (entry.target.closest('#about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Animated Statistics Counters
function initStatCounters() {
    // This will be triggered by intersection observer
}

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        if (stat.classList.contains('animated-counter')) return;
        
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
                stat.classList.add('animated-counter');
            } else {
                stat.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    });
}

// Skill Progress Bars Animation
function initSkillBars() {
    // This will be triggered by intersection observer
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        if (bar.classList.contains('animated-bar')) return;
        
        const width = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = width + '%';
            bar.classList.add('animated-bar');
        }, Math.random() * 500);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 212, 255, 0.9)' : 'rgba(139, 92, 246, 0.9)'};
        color: ${type === 'error' ? '#fff' : '#0f1629'};
        padding: 16px 20px;
        border-radius: 8px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(15, 22, 41, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 22, 41, 0.9)';
        }
        
        // Update active section in navigation
        updateActiveSection();
        
        lastScrollTop = scrollTop;
    });
}

// Update Active Section Based on Scroll
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Tech Icon Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tech = this.getAttribute('data-tech');
            showTechTooltip(this, tech);
        });
        
        icon.addEventListener('mouseleave', function() {
            hideTechTooltip();
        });
    });
});

function showTechTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 212, 255, 0.9);
        color: #0f1629;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(-50%);
        white-space: nowrap;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.bottom + 10 + 'px';
    
    document.body.appendChild(tooltip);
}

function hideTechTooltip() {
    const tooltip = document.querySelector('.tech-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded) .hero-content > * {
            opacity: 0;
            transform: translateY(50px);
        }
        
        body.loaded .hero-content > * {
            animation: fadeInUp 1s ease-out forwards;
        }
        
        body.loaded .hero-title { animation-delay: 0.2s; }
        body.loaded .hero-subtitle { animation-delay: 0.4s; }
        body.loaded .typing-container { animation-delay: 0.6s; }
        body.loaded .hero-buttons { animation-delay: 0.8s; }
        body.loaded .floating-icons { animation-delay: 1s; }
    `;
    document.head.appendChild(style);
});

// Add mobile menu toggle (for responsive design)
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 24px;
        cursor: pointer;
        
        @media (max-width: 768px) {
            display: block;
        }
    `;
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);