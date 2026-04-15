/*
====================================================
  Portfolio UI Script
  Author: Sumit Agnihotri
  File: main.js
  Description: Navigation, animations, particles, and accessibility helpers.
====================================================
*/

function createDataParticles() {
    const dataFlow = document.getElementById('dataFlow');
    if (!dataFlow) return;

    const particleCount = 110;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${8 + Math.random() * 10}s`;
        particle.style.width = `${1 + Math.random() * 2.2}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = `${0.35 + Math.random() * 0.55}`;

        const colors = ['#d4b27a', '#e2cfa7', '#b8925f', '#8f6d45', '#f8f4ec', '#bfd6ff', '#f3e6c9'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${6 + Math.random() * 18}px ${color}`;

        dataFlow.appendChild(particle);
    }
}

function heroTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i += 1;
            setTimeout(type, 36);
        }
    }
    type();
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function onClick(e) {
            const href = this.getAttribute('href');
            if (!href) return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!navLinks) return;

    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');

    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
    }
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!navLinks) return;

    navLinks.classList.remove('open');
    navLinks.setAttribute('aria-hidden', 'true');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

function setupMenuLinks() {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
}

function setupMenuKeyboard() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) return;

    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

function setupScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    const header = document.querySelector('header');
    if (!scrollTop || !header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 280) {
            scrollTop.classList.add('show');
            header.classList.add('obscur-mode');
        } else {
            scrollTop.classList.remove('show');
            header.classList.remove('obscur-mode');
        }
    });

    scrollTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

function setupScrollProgress() {
    const progress = document.getElementById('scrollProgress');
    if (!progress) return;

    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        progress.style.width = `${Math.min(100, Math.max(0, ratio))}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -90px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const parent = entry.target.parentElement;
            const siblings = parent ? Array.from(parent.children) : [entry.target];
            const index = siblings.indexOf(entry.target);

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Math.max(0, index) * 55);

            observer.unobserve(entry.target);
        });
    }, observerOptions);

    document
        .querySelectorAll('.fade-in, .skill-card, .project-card, .education-card, .honor-item, .contact-card')
        .forEach((el) => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
}

function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                if (!id || !entry.isIntersecting) return;

                navLinks.forEach((l) => l.classList.remove('active'));
                const current = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (current) current.classList.add('active');
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -45% 0px',
            threshold: 0
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function setupParallaxHero() {
    const parallax = document.querySelector('.parallax-bg');
    if (!parallax) return;

    window.addEventListener('scroll', () => {
        parallax.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    });
}

function setupNavMap() {
    const btn = document.getElementById('navMapBtn');
    const overlay = document.getElementById('navMap');
    const closeBtn = document.getElementById('navMapClose');
    if (!btn || !overlay || !closeBtn) return;

    const open = () => {
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');

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
        if (e.target === overlay) close();
    });

    overlay.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
}

window.addEventListener('load', () => {
    createDataParticles();
    heroTypingEffect();
    setupSmoothScroll();
    setupScrollProgress();
    setupScrollTop();
    setupObserver();
    setupActiveNav();
    setupMenuLinks();
    setupMenuKeyboard();
    setupParallaxHero();
    setupNavMap();

    document.addEventListener('click', (e) => {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.menu-toggle');
        if (!navLinks || !menuToggle) return;

        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuToggle) {
            closeMenu();
        }
    });
});
