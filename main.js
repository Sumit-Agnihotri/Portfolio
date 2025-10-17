/*
====================================================
  Cinematic Portfolio JS for Sumit Agnihotri
  Author: Sumit Agnihotri
  File: main.js
  Description: Modular, grouped, and well-commented JS for a cinematic, warrior-themed portfolio.
====================================================
*/

// ========== DATA FLOW PARTICLES ========== //
function createDataParticles() {
    const dataFlow = document.getElementById('dataFlow');
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        dataFlow.appendChild(particle);
    }
}

// ========== HERO SECTION TYPING EFFECT ========== //
function heroTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

// ========== SMOOTH SCROLLING ========== //
function setupSmoothScroll() {
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
}

// ========== MOBILE MENU ========== //
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
    // Accessibility: focus first link if opening
    if (navLinks.classList.contains('open')) {
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
    }
}
function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('open');
}
// Close menu on nav link click (mobile)
function setupMenuLinks() {
    const navLinks = document.getElementById('navLinks');
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });
}
// Keyboard accessibility for menu
function setupMenuKeyboard() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }
}

// ========== SCROLL TO TOP BUTTON ========== //
function setupScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });
    // Keyboard accessibility
    scrollTop.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== SECTION ANIMATIONS ========== //
function setupObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in, .skill-card, .project-card, .education-card, .honor-item, .contact-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ========== ACTIVE NAV LINK ON SCROLL ========== //
function setupActiveNav() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== INITIALIZE ALL ========== //
window.addEventListener('load', () => {
    createDataParticles();
    heroTypingEffect();
    setupSmoothScroll();
    setupScrollTop();
    setupObserver();
    setupActiveNav();
    setupMenuLinks();
    setupMenuKeyboard();
    // Accessibility: close menu on outside click
    document.addEventListener('click', (e) => {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuToggle) {
            closeMenu();
        }
    });
    setupParallaxHero();
});

// ========== PARALLAX HERO BACKGROUND ========== //
function setupParallaxHero() {
    const parallax = document.querySelector('.parallax-bg');
    if (!parallax) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}
