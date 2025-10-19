/*
====================================================
  Cinematic Portfolio JS for Sumit Agnihotri
  Author: Sumit Agnihotri
  File: main.js
  Description: Modular, grouped, and well-commented JS for a cinematic, warrior-themed portfolio.
====================================================
*/

// ========== KRATOS EMBER PARTICLES ========== //
function createDataParticles() {
    const dataFlow = document.getElementById('dataFlow');
    const particleCount = 40; // Increased for more dramatic effect
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's'; // Faster particles!
        
        // Random ember colors (orange/red/gold for Kratos theme)
        const colors = ['#ff6b35', '#ffd369', '#f77f00', '#00d4ff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 ${10 + Math.random() * 15}px ${particle.style.background}`;
        
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
    // Accessibility: update ARIA attributes
    const menuToggle = document.querySelector('.menu-toggle');
    const isOpen = navLinks.classList.contains('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.setAttribute('aria-hidden', String(!isOpen));
    // Focus management: focus first link if opening
    if (isOpen) {
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
        // Ensure space toggles as click for screen readers
        menuToggle.addEventListener('click', () => {
            const navLinks = document.getElementById('navLinks');
            menuToggle.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
        });
    }
}

// ========== WARRIOR SCROLL BUTTON ========== //
function setupScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTop.classList.add('show');
            // Add warrior mode to header on scroll
            header.classList.add('warrior-mode');
        } else {
            scrollTop.classList.remove('show');
            header.classList.remove('warrior-mode');
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

// ========== KRATOS BATTLE-READY ANIMATIONS ========== //
function setupObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animation for cards in a grid
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children);
                const index = siblings.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50); // 50ms delay between each card - faster!
                
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
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -45% 0px',
        threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));
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
    setupNavMap();
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

// ========== MOBILE NAV MAP (FLOW) ========== //
function setupNavMap() {
    const btn = document.getElementById('navMapBtn');
    const overlay = document.getElementById('navMap');
    const closeBtn = document.getElementById('navMapClose');
    if (!btn || !overlay || !closeBtn) return;

    const open = () => {
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        // focus first link
        const firstLink = overlay.querySelector('a');
        if (firstLink) firstLink.focus();
    };
    const close = () => {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
    };

    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        // close when clicking backdrop (not the dialog content)
        if (e.target === overlay) close();
    });
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
    // When clicking a map node, close after navigation
    overlay.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            close();
        });
    });
}