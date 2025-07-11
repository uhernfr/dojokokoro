// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#' || this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.offsetTop - (navHeight / 4);
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (mobileMenu) mobileMenu.classList.add('hidden');
      }
    }
  });
});
// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-up');
    }
  });
}, observerOptions);
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
// Navigation background change on scroll
const nav = document.querySelector('nav');
function updateNavBackground() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    nav.classList.add('bg-white', 'border-b', 'border-gray-200');
    nav.classList.remove('bg-white/95');
  } else {
    if (window.scrollY > 100) {
      nav.classList.add('bg-white', 'border-b', 'border-gray-200');
      nav.classList.remove('bg-white/95');
    } else {
      nav.classList.remove('bg-white', 'border-b', 'border-gray-200');
      nav.classList.add('bg-white/95');
    }
  }
}
window.addEventListener('scroll', updateNavBackground);
window.addEventListener('resize', updateNavBackground);
updateNavBackground();
// === Ocultar menu na sessão hero (exceto mobile) ===
function handleHeroNavVisibility(entries) {
  entries.forEach(entry => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      if (entry.isIntersecting) {
        nav.classList.add('invisible');
      } else {
        nav.classList.remove('invisible');
      }
    } else {
      nav.classList.remove('invisible');
    }
  });
}
const heroSection = document.getElementById('inicio');
if (heroSection) {
  const heroObserver = new IntersectionObserver(handleHeroNavVisibility, { threshold: 0.5 });
  heroObserver.observe(heroSection);
}
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    nav.classList.remove('invisible');
  }
});
// Map Modal Functions (copie apenas se for usar o mapa em todas as páginas)
function openMap(location) {
  let title = '';
  let address = '';
  if (location === 'sorocaba') {
    title = 'Dojo Kokoro - Sorocaba';
    address = 'Rua Esmeraldo Tarquínio, 53, Campolim, Sorocaba - SP';
  } else if (location === 'indaiatuba') {
    title = 'Dojo Kokoro - Indaiatuba';
    address = 'Rua Amazonas, 262, Centro, Indaiatuba - SP';
  }
  if (address) {
    document.getElementById('mapTitle').textContent = title;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=16`;
    document.getElementById('mapFrame').src = mapUrl;
    document.getElementById('mapModal').classList.remove('hidden');
  } else {
    alert('Localização não disponível para este mapa.');
  }
}
function closeMap() {
  document.getElementById('mapModal').classList.add('hidden');
  document.getElementById('mapFrame').src = '';
} 