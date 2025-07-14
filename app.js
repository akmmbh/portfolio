// Portfolio JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typingTexts = [
        "Backend Developer",
        "Problem Solver",
        "Code Wizard",
        "Bug Whisperer",
        "Coffee Consumer",
        "Midnight Coder",
        "Stack Overflow Survivor"
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenTexts = 2000;

    function typeText() {
        const currentText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
                setTimeout(typeText, 500);
                return;
            }
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, delayBetweenTexts);
                return;
            }
        }
        
        setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    }

    // Start typing animation
    typeText();

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations
                if (entry.target.classList.contains('stats-grid')) {
                    animateCounters();
                }
                
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe specific elements
    const statsGrid = document.querySelector('.stats-grid');
    const skillsGrid = document.querySelector('.skills-grid');
    
    if (statsGrid) {
        observer.observe(statsGrid);
    }
    
    if (skillsGrid) {
        observer.observe(skillsGrid);
    }

    // Animated counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target === 9999) {
                    counter.textContent = Math.floor(current) + '+';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 20);
        });
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        });
    }

    // Navigation background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(31, 33, 33, 0.98)';
        } else {
            nav.style.background = 'rgba(31, 33, 33, 0.95)';
        }
    });

    // Easter Egg - Konami Code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function showEasterEgg() {
        const easterEgg = document.getElementById('easter-egg');
        easterEgg.classList.remove('hidden');
        
        // Add some fun effects
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }

    window.hideEasterEgg = function() {
        const easterEgg = document.getElementById('easter-egg');
        easterEgg.classList.add('hidden');
        document.body.style.animation = '';
    };

    // Add rainbow animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Achievement card hover effects
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Contact method hover effects
    document.querySelectorAll('.contact-method').forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline item hover effects
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) translateX(0)';
        });
    });

    // Tech item click effects
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Secret click counter easter egg
    let clickCount = 0;
    const secretElement = document.querySelector('.hero-title');
    
    secretElement.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 5) {
            this.textContent = 'Abhinandan Mishra 🎉';
            this.style.color = '#32B8C6';
            
            setTimeout(() => {
                this.textContent = 'Abhinandan Mishra';
                this.style.color = '';
            }, 2000);
        }
        
        if (clickCount === 10) {
            showSecretMessage();
            clickCount = 0;
        }
    });

    function showSecretMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #32B8C6, #ff6b6b);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                z-index: 9999;
                animation: slideInFromRight 0.5s ease-out;
                font-weight: 600;
            ">
                🎊 You found the secret! You're persistent! 🎊
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Add slide in animation
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(slideStyle);

    // Particle effect for hero background
    function createParticles() {
        const heroBackground = document.querySelector('.hero-background');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(50, 184, 198, 0.6);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            heroBackground.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Skill bar animation on hover
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const fill = this.querySelector('.skill-fill');
            fill.style.background = 'linear-gradient(90deg, #ff6b6b, #feca57)';
        });
        
        bar.addEventListener('mouseleave', function() {
            const fill = this.querySelector('.skill-fill');
            fill.style.background = 'linear-gradient(90deg, var(--color-primary), var(--color-warning))';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--color-background);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeOut 1s ease-out 0.5s forwards;
            ">
                <div style="
                    font-size: 24px;
                    color: var(--color-primary);
                    animation: pulse 1s ease-in-out infinite;
                ">
                    Loading the magic... ✨
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.remove();
        }, 1500);
    });

    // Add fade out animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; visibility: hidden; }
        }
    `;
    document.head.appendChild(fadeOutStyle);

    // Add some randomness to particle movements
    setInterval(() => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = x + '%';
            particle.style.top = y + '%';
        });
    }, 5000);

    // Console Easter Egg
    console.log(`
    🎉 Welcome to Abhinandan's Portfolio! 🎉
    
    Try these easter eggs:
    1. Use the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    2. Click the title 10 times
    3. Check the console for more surprises!
    
    Built with ❤️ and lots of ☕
    `);

    // Fun console commands
    window.surprise = function() {
        console.log('🎊 You found the console command! Here\'s a virtual high-five! 🖐️');
        document.body.style.animation = 'rainbow 1s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    };

    window.coffee = function() {
        console.log('☕ Coffee level: Maximum! Energy boosted! 🚀');
        const energy = document.createElement('div');
        energy.innerHTML = '☕ +100 Energy!';
        energy.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            color: #8B4513;
            font-weight: bold;
            z-index: 9999;
            animation: bounce 1s ease-out;
        `;
        document.body.appendChild(energy);
        setTimeout(() => energy.remove(), 1000);
    };

    console.log('Try typing surprise() or coffee() in the console! 😄');
});