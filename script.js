// Prevent browser from restoring previous scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force top on every load, including refresh
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}, { once: true });

// Extra insurance: run again after a tiny delay (catches async layout shifts)
setTimeout(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}, 50);

// Minimal shared behaviors

// Header scroll effect
window.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Smooth in-page scrolling + clean history
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, null, href);
    }
  });
});

// Optional: highlight active section in nav (rudimentary)
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 180 && rect.bottom >= 180) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}, { passive: true });