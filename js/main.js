/* ================================================================
   PROYECTO ADUANAL — Shared JS
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── Navbar scroll ──
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ── Mobile menu toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isDecimal = String(target).includes('.');
      const duration = 1600;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = isDecimal ? (target * eased).toFixed(1) : Math.floor(target * eased);
        el.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ── Active nav link ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Comercializadora toggle on form ──
  const comercToggle = document.getElementById('comercializadora-toggle');
  const comercFields = document.getElementById('comercializadora-fields');
  if (comercToggle && comercFields) {
    comercToggle.addEventListener('change', () => {
      comercFields.style.display = comercToggle.value === 'si' ? 'grid' : 'none';
    });
  }

  // ── TMS Portal Link (injected across all pages) ──
  const TMS_URL = 'https://tms-proyecto-aduanal.vercel.app/login';

  // Desktop nav — insert "Portal Clientes" before the CTA button
  const navLinks = document.querySelector('.nav-links');
  const navCta = navLinks ? navLinks.querySelector('.nav-cta') : null;
  if (navLinks && navCta) {
    const portalLink = document.createElement('a');
    portalLink.href = TMS_URL;
    portalLink.textContent = 'Portal Clientes';
    portalLink.target = '_blank';
    navLinks.insertBefore(portalLink, navCta);
  }

  // Mobile menu — insert "Portal Clientes" before "Cotizar Envío"
  const mobileNav = document.querySelector('.nav-mobile-menu');
  if (mobileNav) {
    const mobileLinks = mobileNav.querySelectorAll('a');
    const mobileCta = [...mobileLinks].find(a => a.textContent.includes('Cotizar'));
    const mobilePortal = document.createElement('a');
    mobilePortal.href = TMS_URL;
    mobilePortal.textContent = 'Portal Clientes';
    mobilePortal.target = '_blank';
    if (mobileCta) {
      mobileNav.insertBefore(mobilePortal, mobileCta);
    } else {
      mobileNav.appendChild(mobilePortal);
    }
  }

  // Footer — add admin access link
  const footerLegal = document.querySelector('.footer-legal-links');
  if (footerLegal) {
    const adminLink = document.createElement('a');
    adminLink.href = TMS_URL;
    adminLink.textContent = 'Administración';
    adminLink.target = '_blank';
    adminLink.style.cssText = 'opacity:0.5;font-size:12px;';
    footerLegal.appendChild(adminLink);
  }

});
