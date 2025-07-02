// main.js

document.addEventListener('DOMContentLoaded', function() {
  // --- Common Elements ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const particlesContainer = document.getElementById('particles');
  const scrollIndicator = document.getElementById('scrollIndicator');
  const body = document.body;

  // --- Mobile Menu Toggle ---
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --- Scroll Progress Indicator ---
  function updateScrollIndicator() {
    if (scrollIndicator) {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollIndicator.style.width = scrollPercent + '%';
    }
  }

  // --- Particle Animation (from home.html) ---
  function createParticles() {
    if (particlesContainer) {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particlesContainer.appendChild(particle);
      }
    }
  }

  // --- Neural Network Background (from aboutus.html) ---
  function createNeuralNetwork() {
    const neuralBg = document.getElementById('neuralBg');
    if (neuralBg) {
      for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'neural-line';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
        line.style.width = Math.random() * 200 + 50 + 'px';
        line.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        line.style.animationDelay = Math.random() * 3 + 's';
        neuralBg.appendChild(line);
      }
    }
  }

  // --- Interactive Aurora & Card Glow Effect (from contactus.html) ---
  const updateMousePosition = (e) => {
    const { clientX, clientY } = e;
    body.style.setProperty('--mouse-x', `${clientX}px`);
    body.style.setProperty('--mouse-y', `${clientY}px`);

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardX = clientX - rect.left;
      const cardY = clientY - rect.top;
      card.style.setProperty('--mouse-x-rel', `${cardX}px`);
      card.style.setProperty('--mouse-y-rel', `${cardY}px`);
    });
  };

  // Only add mousemove listener if the aurora effect is intended for the current page (e.g., contact page)
  if (window.location.pathname.includes('/contact')) {
    body.addEventListener('mousemove', updateMousePosition);
  }

  // --- Fade In Animation on Scroll (common) ---
  const handleScrollAnimations = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
        // For elements with animation-delay, ensure animation starts
        if (element.style.animationPlayState === 'paused') {
          element.style.animationPlayState = 'running';
        }
      } else {
        // Optional: remove visible class if it scrolls back up for re-triggering
        // element.classList.remove('visible');
        // element.style.animationPlayState = 'paused'; // Pause if scrolled out of view
      }
    });
  };

  // --- Smooth scrolling for anchor links (common) ---
  function initSmoothScrolling() {
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

  // --- Enhanced hover effects for service cards (from home.html) ---
  function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateX(8deg) rotateY(2deg)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      });
    });
  }

  // --- Parallax effect for hero background (from home.html) ---
  function initHeroParallax() {
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
      });
    }
  }

  // --- Dynamic glow intensity based on scroll (from home.html) ---
  function initGlowIntensity() {
    window.addEventListener('scroll', () => {
      const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
      const intensity = 1 + scrollPercent * 0.5;
      document.documentElement.style.setProperty('--glow-intensity', intensity);
    });
  }

  // --- Portfolio item reveal on scroll (from portfolio.html) ---
  function initPortfolioAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // Disconnect after animation to prevent re-triggering if desired
          // observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    document.querySelectorAll('.portfolio-item').forEach(item => {
      observer.observe(item);
    });
  }

  // --- Dynamic Cursor Effect (desktop only, from aboutus.html and portfolio.html) ---
  function initCustomCursor() {
    if (window.innerWidth > 768) {
      let cursor_element = document.querySelector('.custom-cursor');
      if (!cursor_element) {
        cursor_element = document.createElement('div');
        cursor_element.className = 'custom-cursor';
        document.body.appendChild(cursor_element);
      }
      
      document.addEventListener('mousemove', function(e) {
        cursor_element.style.left = e.clientX - 5 + 'px'; // Adjusted for 10px width
        cursor_element.style.top = e.clientY - 5 + 'px';  // Adjusted for 10px height
      });

      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor_element.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
          cursor_element.style.transform = 'scale(1)';
        });
      });
    }
  }

  // --- Loading Overlay (from portfolio.html) ---
  function initLoadingOverlay() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      window.addEventListener('load', function() {
        setTimeout(() => {
          loadingOverlay.style.opacity = '0';
          setTimeout(() => {
            loadingOverlay.style.display = 'none';
          }, 500);
        }, 500);
      });
    }
  }

  // --- Highlight active nav link based on current page URL (unified logic) ---
  function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active', 'font-bold'); // Remove from all first
      let linkHref = link.getAttribute('href');

      // Normalize current path and link href for consistent comparison
      let normalizedCurrentPath = currentPath;
      let normalizedLinkHref = linkHref;

      // Handle root path variations
      if (normalizedCurrentPath === '/index.html' || normalizedCurrentPath === '/home') {
        normalizedCurrentPath = '/';
      }
      if (normalizedLinkHref === '/index.html' || normalizedLinkHref === '/home') {
        normalizedLinkHref = '/';
      }

      // Handle /aboutus and /contactus to /about and /contact
      if (normalizedCurrentPath.endsWith('us') && normalizedCurrentPath !== '/') {
        normalizedCurrentPath = normalizedCurrentPath.slice(0, -2);
      }
      if (normalizedLinkHref.endsWith('us') && normalizedLinkHref !== '/') {
        normalizedLinkHref = normalizedLinkHref.slice(0, -2);
      }
      
      // Special case for /portfolio.html when the link is /portfolio
      if (normalizedCurrentPath.includes('portfolio.html') && normalizedLinkHref === '/portfolio') {
        link.classList.add('active', 'font-bold');
      } else if (normalizedLinkHref === normalizedCurrentPath) {
        link.classList.add('active', 'font-bold');
      }
    });
  }

  // --- Initialize all effects based on page content ---
  // Always run these:
  createParticles();
  initSmoothScrolling();
  highlightActiveNavLink();
  updateScrollIndicator(); // Initial call

  // Run on scroll:
  window.addEventListener('scroll', () => {
    updateScrollIndicator();
    handleScrollAnimations();
  });
  
  // Initial trigger for elements already in view
  handleScrollAnimations();

  // Page-specific initializations
  if (document.getElementById('neuralBg')) { // For aboutus.html
    createNeuralNetwork();
  }
  if (document.querySelector('.service-card')) { // For home.html
    initServiceCardEffects();
  }
  if (document.querySelector('.hero-bg')) { // For home.html
    initHeroParallax();
    initGlowIntensity();
  }
  if (document.querySelector('.portfolio-item')) { // For portfolio.html
    initPortfolioAnimations();
  }
  if (document.getElementById('loadingOverlay')) { // For portfolio.html
    initLoadingOverlay();
  }
  // Initialize custom cursor on relevant pages or globally if desired
  // For now, it's global as it was present on aboutus and portfolio and makes sense everywhere.
  initCustomCursor();
});
