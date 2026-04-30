const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = `Message from ${name || 'Website visitor'}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:Compassionatealliance@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const tempLink = document.createElement('a');
    tempLink.href = mailto;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // Display the success alert
    const alertBox = document.getElementById('alert-message');
    alertBox.style.display = 'block';

    // Hide the alert after 5 seconds
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 5000);

    // Keep a fallback in case the mailto does not open immediately.
    setTimeout(() => {
      window.location.href = mailto;
    }, 100);
  });
}

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
const navMenu = document.getElementById('nav-menu');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (navToggle && navMenu && nav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

document.body.classList.add('is-ready');

const revealGroups = [
  { selector: '.hero-text', direction: 'reveal-left' },
  { selector: '.carousel-wrapper', direction: 'reveal-right' },
  { selector: '.about-text', direction: 'reveal-left' },
  { selector: '.about-image', direction: 'reveal-right' },
  { selector: '.mission-image', direction: 'reveal-left' },
  { selector: '.mission-text', direction: 'reveal-right' },
  { selector: '.offer', direction: 'reveal-left' },
  { selector: '.service-image', direction: 'reveal-right' },
  { selector: '.why-card', direction: 'reveal-left' },
  { selector: '.step-card', direction: 'reveal-right' },
  { selector: '.team-card', direction: 'reveal-left' },
  { selector: '.faq-card', direction: 'reveal-right' },
  { selector: '.review h3', direction: '' },
  { selector: '.review-item', direction: '' },
  { selector: '.contact', direction: 'reveal-left' },
  { selector: '.office', direction: '' },
  { selector: '.form', direction: 'reveal-right' }
];

const revealElements = revealGroups.flatMap(({ selector, direction }) => {
  return Array.from(document.querySelectorAll(selector)).map((element, index) => {
    element.classList.add('reveal-on-scroll');

    if (direction) {
      element.classList.add(direction);
    }

    element.style.setProperty('--reveal-delay', `${index * 0.12}s`);
    return element;
  });
});

const heroIntroElements = [
  document.querySelector('.hero-text'),
  document.querySelector('.carousel-wrapper')
].filter(Boolean);

const showElement = (element) => {
  element.classList.add('is-visible');
};

if (prefersReducedMotion.matches) {
  revealElements.forEach(showElement);
} else {
  heroIntroElements.forEach((element, index) => {
    window.setTimeout(() => showElement(element), 140 + index * 180);
  });

  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      showElement(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });

  revealElements.forEach((element) => {
    if (!heroIntroElements.includes(element)) {
      observer.observe(element);
    }
  });
}

const heroLogo = document.querySelector('.hero-img img');

if (heroLogo && !prefersReducedMotion.matches) {
  window.setTimeout(() => {
    heroLogo.classList.add('is-floating');
  }, 900);
}

const reviewItems = document.querySelectorAll('.review-item');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!prefersReducedMotion.matches && supportsHover) {
  reviewItems.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty('--card-rotate-y', `${offsetX * 8}deg`);
      card.style.setProperty('--card-rotate-x', `${offsetY * -8}deg`);
      card.style.setProperty('--card-lift', '-8px');
      card.classList.add('is-tilting');
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--card-rotate-y', '0deg');
      card.style.setProperty('--card-rotate-x', '0deg');
      card.style.setProperty('--card-lift', '0px');
      card.classList.remove('is-tilting');
    });
  });
}
