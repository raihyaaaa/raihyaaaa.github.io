// ==================== AI LOADING SCREEN ====================
let progress = 0;
const loadingScreen = document.getElementById('loadingScreen');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const loadingStatus = document.getElementById('loadingStatus');

const statuses = [
    'Initializing AI Systems...',
    'Loading Neural Networks...',
    'Calibrating Design Tools...',
    'Rendering Portfolio...',
    'Optimizing Experience...',
    'Almost Ready...'
];

let statusIndex = 0;

const loadingInterval = setInterval(() => {
    progress += Math.random() * 1 + 10;
    
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        loadingStatus.textContent = 'Welcome!';
        
        progressFill.style.width = '100%';
        progressText.textContent = '100%';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 500);
    } else {
        progressFill.style.width = `${Math.min(progress, 100)}%`;
        progressText.textContent = `${Math.floor(Math.min(progress, 100))}%`;
        
        const newStatusIndex = Math.floor(progress / 20);
        if (newStatusIndex !== statusIndex && newStatusIndex < statuses.length) {
            statusIndex = newStatusIndex;
            loadingStatus.textContent = statuses[statusIndex];
        }
    }
}, 200);

setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }
}, 5000);

// Dynamic Favicon and Title Changer
const originalTitle = document.title;
const originalFavicon = document.querySelector('link[rel="icon"]').href;

// Array of alternative messages and icons
const awayMessages = [
    "Come back! 👋",
    "Hey, come back! ✨",
    "Still here! 👀"
];

const awayIcons = [
    "Assets/sasuke.png",      // Your existing favicon
];

let currentIconIndex = 0;
let iconChangeInterval = null;

// Function to change favicon
function changeFavicon(iconPath) {
    const link = document.querySelector('link[rel="icon"]');
    if (link) {
        link.href = iconPath;
    }
}

// Function to change title
function changeTitle(newTitle) {
    document.title = newTitle;
}

// Start rotating favicon when user leaves tab
function startFaviconRotation() {
    // Change immediately
    currentIconIndex = (currentIconIndex + 1) % awayIcons.length;
    changeFavicon(awayIcons[currentIconIndex]);
    
    // Then rotate every 2 seconds
    iconChangeInterval = setInterval(() => {
        currentIconIndex = (currentIconIndex + 1) % awayIcons.length;
        changeFavicon(awayIcons[currentIconIndex]);
    }, 2000);
}

// Stop rotating favicon
function stopFaviconRotation() {
    if (iconChangeInterval) {
        clearInterval(iconChangeInterval);
        iconChangeInterval = null;
    }
    changeFavicon(originalFavicon);
}

// Detect when user leaves/returns to tab
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // User left the tab
        const randomMessage = awayMessages[Math.floor(Math.random() * awayMessages.length)];
        changeTitle(randomMessage);
        startFaviconRotation();
    } else {
        // User returned to the tab
        changeTitle(originalTitle);
        stopFaviconRotation();
    }
});

// Also detect when window loses/gains focus (for better browser compatibility)
window.addEventListener('blur', () => {
    if (!document.hidden) {
        const randomMessage = awayMessages[Math.floor(Math.random() * awayMessages.length)];
        changeTitle(randomMessage);
        startFaviconRotation();
    }
});

window.addEventListener('focus', () => {
    if (!document.hidden) {
        changeTitle(originalTitle);
        stopFaviconRotation();
    }
});

console.log('%c🎨 Dynamic Favicon Active!', 'color: #6366f1; font-size: 14px; font-weight: bold;');
console.log('%cFavicon will change when you switch tabs!', 'color: #8b5cf6; font-size: 12px;');

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ==================== NAVIGATION ====================
const nav = document.getElementById('mainNav');
let lastScrollTop = 0;
let ticking = false;

function updateNav() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    
    if (scrollTop > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
    
    lastScrollTop = scrollTop;
    
    // ── IMPROVED: Navbar highlighting with better section detection ──
    const sections = document.querySelectorAll('section[id], footer[id]');
    let currentSection = '';
    
    // At the very top of the page
    if (scrollTop < 200) {
        currentSection = 'home';
    } else {
        // Find the section that's most in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if we're past the top of this section
            // Adjusted offset: 300px from top of viewport
            if (scrollTop >= (sectionTop - 300)) {
                currentSection = sectionId;
            }
        });
    }
    
    // Update active states on nav links
    navLinksItems.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const linkSection = href.substring(1); // Remove the #
            
            // Special handling: Contact button always has "active" class
            if (link.classList.contains('contact-btn')) {
                // Don't remove active class from contact button
                return;
            }
            
            // For other nav links
            if (linkSection === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNav();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial call to set correct active state on page load
updateNav();

// ==================== BINARY RAIN EFFECT ====================
const binaryRain = document.getElementById('binaryRain');
if (binaryRain) {
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -100px;
            font-family: monospace;
            font-size: 14px;
            color: rgba(99, 102, 241, 0.3);
            animation: fall ${5 + Math.random() * 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += Math.random() > 0.5 ? '1' : '0';
            text += '<br>';
        }
        column.innerHTML = text;
        binaryRain.appendChild(column);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== SCROLL ANIMATION OBSERVER ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Tech cards cascade animation
const techCards = document.querySelectorAll('.tech-card');
techCards.forEach((card, index) => {
    setTimeout(() => {
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    }, 100);
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    cardObserver.observe(card);
});

// Service cards cascade animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    setTimeout(() => {
        card.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    }, 100);
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    cardObserver.observe(card);
});

// Timeline cards reveal animation
document.querySelectorAll('.timeline-card').forEach((card) => {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cardObserver.observe(card);
});

// ==================== COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');

const countUp = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            // Add + symbol after the number (except for infinity)
            if (target === '∞') {
                element.textContent = '∞';
            } else {
                element.textContent = target + '+';
            }
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.getAttribute('data-target');
            if (target === '∞') {
                entry.target.textContent = '∞';
            } else {
                countUp(entry.target, parseInt(target));
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== PARALLAX SCROLL ====================
let scrollPos = 0;

function parallaxScroll() {
    scrollPos = window.pageYOffset;
    
    const parallaxElements = document.querySelectorAll('[data-scroll]');
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-scroll-speed')) || 0.5;
        const yPos = -(scrollPos * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
    
    requestAnimationFrame(parallaxScroll);
}

parallaxScroll();

// ==================== FORM SUBMISSION ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// ==================== TESTIMONIAL CAROUSEL (5 testimonials, 1 at a time) ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Event listeners for carousel buttons
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance carousel every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
const testimonialCarousel = document.querySelector('.testimonial-carousel');
if (testimonialCarousel) {
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// Initialize first slide
showSlide(0);

// ==================== CONSOLE MESSAGE ====================
console.log('%c✨ Raily Almeron Portfolio ✨', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDesigned with 💜 using AI-powered animations', 'color: #8b5cf6; font-size: 14px;');
console.log('%cInterested in working together? Let\'s connect! 🚀', 'color: #ec4899; font-size: 14px;');