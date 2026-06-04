/*
 * ═══════════════════════════════════════════════════
 *  main.js  |  Sumit Agnihotri Portfolio
 *  Author: Sumit Agnihotri
 *  Description: Cursor, particles, navigation,
 *               scroll effects, typing animation,
 *               counters, resume tabs, contact form.
 * ═══════════════════════════════════════════════════
 */

'use strict';

/* ──────────────────────────────────────
   HELPERS
────────────────────────────────────── */
function qs(sel, ctx = document)  { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

/* ──────────────────────────────────────
   1. CUSTOM CURSOR
────────────────────────────────────── */
function initCursor() {
  const dot  = qs('#cur');
  const ring = qs('#cur-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Smooth ring follow via rAF lerp
  (function lerpRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerpRing);
  })();

  // Hover state
  const hoverEls = 'a, button, .sk-card, .proj-card, .val-card, .stat, ' +
                   '.tl-item, .ach-card, .exp-card, .cert-card, .meta-item, .clink';
  qsa(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '0.45';
  });
}

/* ──────────────────────────────────────
   2. PARTICLE CANVAS
────────────────────────────────────── */
function initParticles() {
  const canvas = qs('#particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = ['#a78bfa','#56d8f0','#f0c060','#f472b6','#34d399','#fb923c'];
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createPoints() {
    pts = [];
    for (let i = 0; i < 65; i++) {
      pts.push({
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    0.8 + Math.random() * 1.8,
        vx:   (Math.random() - 0.5) * 0.18,
        vy:   -(0.1 + Math.random() * 0.25),
        a:    0.2 + Math.random() * 0.5,
        c:    COLORS[Math.floor(Math.random() * COLORS.length)],
        glow: 3 + Math.random() * 10
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }

      ctx.save();
      ctx.globalAlpha  = p.a;
      ctx.shadowBlur   = p.glow;
      ctx.shadowColor  = p.c;
      ctx.fillStyle    = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createPoints(); });
  resize(); createPoints(); draw();
}

/* ──────────────────────────────────────
   3. SCROLL PROGRESS BAR
────────────────────────────────────── */
function initScrollProgress() {
  const bar = qs('#sprog');
  if (!bar) return;

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ──────────────────────────────────────
   4. HEADER SCROLL STATE
────────────────────────────────────── */
function initHeader() {
  const header    = qs('#header');
  const scrollTop = qs('#scroll-top');
  if (!header) return;

  function update() {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
    if (scrollTop) scrollTop.classList.toggle('show', window.scrollY > 320);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();

  if (scrollTop) {
    scrollTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }
}

/* ──────────────────────────────────────
   5. MOBILE NAVIGATION
────────────────────────────────────── */
function initMobileNav() {
  const btn   = qs('#hbg');
  const links = qs('#nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  qsa('a', links).forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!links.contains(e.target) && !btn.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Keyboard: Escape closes menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
}

/* ──────────────────────────────────────
   6. SMOOTH SCROLL (anchor links)
────────────────────────────────────── */
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = qs(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

/* ──────────────────────────────────────
   7. ACTIVE NAV HIGHLIGHTING
────────────────────────────────────── */
function initActiveNav() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.remove('active'));
      const match = qs(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ──────────────────────────────────────
   8. SCROLL REVEAL ANIMATION
────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el       = entry.target;
      const siblings = Array.from(el.parentElement.children);
      const index    = siblings.indexOf(el);

      setTimeout(() => el.classList.add('in'), Math.max(0, index) * 65);
      obs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -70px 0px' });

  qsa('.rv').forEach(el => obs.observe(el));
}

/* ──────────────────────────────────────
   9. TYPING EFFECT
────────────────────────────────────── */
function initTyping() {
  const el = qs('#typing-el');
  if (!el) return;

  const phrases = [
    'Python · ML · Data Science',
    'Building Intelligent Systems',
    'Data Analyst · 3+ Yrs Experience',
    'Ranked #1 at Amity on GFG',
    'Time-Series · Classification · EDA',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 42 : 78);
  }

  setTimeout(tick, 700);
}

/* ──────────────────────────────────────
   10. STATS COUNTER
────────────────────────────────────── */
function initStats() {
  function animateStat(el) {
    const target = +el.dataset.target;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '+';
    const dur    = 1600;
    const step   = 14;
    const inc    = target / (dur / step);
    let cur      = 0;

    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = prefix + Math.round(cur) + suffix;
    }, step);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      qsa('.stat-num', entry.target).forEach(animateStat);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  const grid = qs('.stats-grid');
  if (grid) obs.observe(grid);
}

/* ──────────────────────────────────────
   11. RESUME TABS
────────────────────────────────────── */
function initResumeTabs() {
  const buttons = qsa('.tab-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      qsa('.tab-pane').forEach(p => p.classList.remove('active'));

      // Activate clicked
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const pane = qs('#tab-' + btn.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });
}

/* ──────────────────────────────────────
   12. CONTACT FORM
────────────────────────────────────── */
function initContactForm() {
  const form    = qs('#contact-form');
  const success = qs('#form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = (qs('#f-name',    form).value || '').trim();
    const email   = (qs('#f-email',  form).value || '').trim();
    const subject = (qs('#f-subject',form).value || '').trim() || 'Portfolio Contact';
    const msg     = (qs('#f-msg',    form).value || '').trim();

    if (!name || !email || !msg) return;

    const body = encodeURIComponent(
      `Hi Sumit,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`
    );
    window.location.href =
      `mailto:sagnihotri9710@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    if (success) {
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }
    form.reset();
  });
}

/* ──────────────────────────────────────
   13. PARALLAX ORBS ON SCROLL
────────────────────────────────────── */
function initParallaxOrbs() {
  const o1 = qs('.o1');
  const o2 = qs('.o2');
  const o3 = qs('.o3');
  if (!o1 || !o2 || !o3) return;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    o1.style.transform = `translateY(${sy * 0.07}px)`;
    o2.style.transform = `translateY(${-sy * 0.05}px)`;
    o3.style.transform = `translateY(${sy * 0.06}px)`;
  }, { passive: true });
}

/* ──────────────────────────────────────
   INIT — run everything on load
────────────────────────────────────── */
window.addEventListener('load', () => {
  initCursor();
  initParticles();
  initScrollProgress();
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initActiveNav();
  initReveal();
  initTyping();
  initStats();
  initResumeTabs();
  initContactForm();
  initParallaxOrbs();
});