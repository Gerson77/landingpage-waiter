/* ================================================================
   WAITERAPP — Landing Page Scripts
   - Mobile menu toggle
   - Header scroll detection
   - Intersection Observer animations
   - Smooth scroll fallback
   ================================================================ */

// ---- Mobile Menu ----
const hambBtn     = document.getElementById('hamb-btn');
const hambIcon    = document.getElementById('hamb-icon');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mob-link, .mobile-menu .btn');

function toggleMenu(open) {
  const isOpen = typeof open === 'boolean' ? open : !mobileMenu.classList.contains('active');
  mobileMenu.classList.toggle('active', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  hambBtn.setAttribute('aria-expanded', isOpen);
  hambIcon.className = isOpen ? 'ph ph-x' : 'ph ph-list';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

hambBtn.addEventListener('click', () => toggleMenu());

mobileLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// ---- Header Scroll ----
const header = document.getElementById('header');

function handleScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // run on load

// ---- Scroll Animations ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -30px 0px',
});

document.querySelectorAll('[data-animate], [data-stagger]').forEach(el => {
  io.observe(el);
});

// ---- Smooth Scroll (native + fallback) ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
