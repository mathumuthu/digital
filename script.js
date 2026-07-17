
/* ============================================
   PREMIUM HEADER JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Elements ---
  const header = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.header-nav-link');

  // --- Scroll Effect: Add/Remove 'scrolled' class ---
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- Mobile Menu Toggle ---
  function openMenu() {
    if (!hamburgerBtn || !mobileNav || !mobileOverlay) return;
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('active');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!hamburgerBtn || !mobileNav || !mobileOverlay) return;
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
      if (mobileNav.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking a mobile nav link
  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // --- Active Link Highlighting ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  desktopNavLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  mobileNavLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

});


/* ============================================
   DIGITAL AGENCY - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // PRELOADER
  // ==========================================
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 800);
    });
  }

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ==========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ==========================================
  // STATS COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // STAGGER ANIMATION FOR GRID ITEMS
  // ==========================================
  const staggerContainers = document.querySelectorAll('.stagger-container');
  staggerContainers.forEach(container => {
    const items = container.querySelectorAll('.stagger-item');
    const staggerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('active');
          }, index * 100);
        });
        staggerObserver.unobserve(container);
      }
    }, { threshold: 0.1 });
    staggerObserver.observe(container);
  });

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // RIPPLE EFFECT ON BUTTONS
  // ==========================================
  const rippleButtons = document.querySelectorAll('.ripple');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // FORM VALIDATION
  // ==========================================
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach(input => {
        const value = input.value.trim();
        const type = input.getAttribute('data-validate');
        const feedback = input.parentElement.querySelector('.invalid-feedback');

        // Reset
        input.classList.remove('is-invalid', 'is-valid');

        if (!type) return;

        let valid = true;
        let message = '';

        switch(type) {
          case 'name':
            if (!value) { valid = false; message = 'Name is required'; }
            else if (!/^[a-zA-Z\s]+$/.test(value)) { valid = false; message = 'Letters only, no numbers or special characters'; }
            else if (value.length < 2) { valid = false; message = 'Name must be at least 2 characters'; }
            break;

          case 'phone':
            if (!value) { valid = false; message = 'Phone number is required'; }
            else if (!/^\d{10}$/.test(value)) { valid = false; message = 'Exactly 10 digits required'; }
            break;

          case 'email':
            if (!value) { valid = false; message = 'Email is required'; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { valid = false; message = 'Please enter a valid email address'; }
            break;

          case 'password':
            if (!value) { valid = false; message = 'Password is required'; }
            else if (value.length < 8) { valid = false; message = 'Minimum 8 characters required'; }
            else if (!/[A-Z]/.test(value)) { valid = false; message = 'At least one uppercase letter required'; }
            else if (!/[a-z]/.test(value)) { valid = false; message = 'At least one lowercase letter required'; }
            else if (!/[0-9]/.test(value)) { valid = false; message = 'At least one number required'; }
            else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) { valid = false; message = 'At least one special character required'; }
            break;

          case 'confirm-password':
            const passwordField = form.querySelector('input[data-validate="password"]');
            const password = passwordField ? passwordField.value : '';
            if (!value) { valid = false; message = 'Please confirm your password'; }
            else if (value !== password) { valid = false; message = 'Passwords do not match'; }
            break;

          case 'message':
            if (!value) { valid = false; message = 'Message is required'; }
            else if (value.length < 10) { valid = false; message = 'Message must be at least 10 characters'; }
            break;

          case 'subject':
            if (!value) { valid = false; message = 'Subject is required'; }
            break;
        }

        if (!valid) {
          isValid = false;
          input.classList.add('is-invalid');
          if (feedback) feedback.textContent = message;
        } else if (value) {
          input.classList.add('is-valid');
        }
      });

      if (isValid) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success mt-3';
        successMsg.innerHTML = '<i class="fas fa-check-circle me-2"></i> Form submitted successfully! We will get back to you soon.';
        successMsg.style.cssText = 'background:#22c55e;color:white;padding:1rem;border-radius:8px;';
        form.appendChild(successMsg);
        form.reset();
        setTimeout(() => successMsg.remove(), 5000);
      }
    });

    // Real-time validation on blur
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('blur', function() {
        const type = this.getAttribute('data-validate');
        if (!type) return;
        const value = this.value.trim();
        const feedback = this.parentElement.querySelector('.invalid-feedback');
        this.classList.remove('is-invalid', 'is-valid');

        let valid = true;
        let message = '';

        switch(type) {
          case 'name':
            if (!value) { valid = false; message = 'Name is required'; }
            else if (!/^[a-zA-Z\s]+$/.test(value)) { valid = false; message = 'Letters only, no numbers or special characters'; }
            break;
          case 'phone':
            if (!value) { valid = false; message = 'Phone number is required'; }
            else if (!/^\d{10}$/.test(value)) { valid = false; message = 'Exactly 10 digits required'; }
            break;
          case 'email':
            if (!value) { valid = false; message = 'Email is required'; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { valid = false; message = 'Invalid email format'; }
            break;
          case 'password':
            if (!value) { valid = false; message = 'Password is required'; }
            else if (value.length < 8) { valid = false; message = 'Minimum 8 characters'; }
            else if (!/[A-Z]/.test(value)) { valid = false; message = 'Need uppercase letter'; }
            else if (!/[a-z]/.test(value)) { valid = false; message = 'Need lowercase letter'; }
            else if (!/[0-9]/.test(value)) { valid = false; message = 'Need a number'; }
            else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) { valid = false; message = 'Need special character'; }
            break;
          case 'confirm-password':
            const passwordField = form.querySelector('input[data-validate="password"]');
            if (!value) { valid = false; message = 'Confirm password required'; }
            else if (passwordField && value !== passwordField.value) { valid = false; message = 'Passwords do not match'; }
            break;
        }

        if (!valid) {
          this.classList.add('is-invalid');
          if (feedback) feedback.textContent = message;
        } else if (value) {
          this.classList.add('is-valid');
        }
      });
    });
  });

  // ==========================================
  // NEWSLETTER FORM
  // ==========================================
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        const btn = this.querySelector('button');
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 2000);
      }
    });
  });

  // ==========================================
  // PARTICLES GENERATION
  // ==========================================
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 6 + 2;
      particle.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 15}s;
        animation-duration: ${10 + Math.random() * 20}s;
        opacity: ${Math.random() * 0.5 + 0.1};
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ==========================================
  // PARALLAX EFFECT
  // ==========================================
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  // ==========================================
  // TYPING EFFECT FOR HERO (Optional)
  // ==========================================
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.getAttribute('data-text') || '';
    let index = 0;
    const type = () => {
      if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    };
    setTimeout(type, 1000);
  }

  // ==========================================
  // TESTIMONIAL SLIDER (Simple)
  // ==========================================
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    };
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };
    showSlide(0);
    setInterval(nextSlide, 5000);
  }

  // ==========================================
  // LAZY LOAD IMAGES
  // ==========================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));

  // ==========================================
  // PORTFOLIO FILTER (if filter buttons exist)
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
          }
        });
      });
    });
  }

  // ==========================================
  // MAGNETIC BUTTON EFFECT
  // ==========================================
  const magneticBtns = document.querySelectorAll('.magnetic');
  if (!window.matchMedia('(pointer: coarse)').matches) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ==========================================
  // CURSOR GLOW EFFECT (Desktop only)
  // ==========================================
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && !window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ==========================================
  // SCROLL PROGRESS BAR
  // ==========================================
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  // ==========================================
  // TOOLTIP INIT
  // ==========================================
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'custom-tooltip';
      tooltip.textContent = trigger.getAttribute('data-tooltip');
      tooltip.style.cssText = `
        position: fixed; background: var(--dark); color: white;
        padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.8rem;
        z-index: 10000; pointer-events: none; white-space: nowrap;
      `;
      document.body.appendChild(tooltip);
      const rect = trigger.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      trigger._tooltip = tooltip;
    });
    trigger.addEventListener('mouseleave', () => {
      if (trigger._tooltip) {
        trigger._tooltip.remove();
        delete trigger._tooltip;
      }
    });
  });

  // ==========================================
  // DARK MODE TOGGLE (if exists)
  // ==========================================
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // ==========================================
  // COUNTDOWN TIMER (if exists)
  // ==========================================
  const countdownElements = document.querySelectorAll('.countdown');
  countdownElements.forEach(el => {
    const targetDate = new Date(el.getAttribute('data-date')).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { el.innerHTML = 'Expired'; return; }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      el.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
  });

  // ==========================================
  // VIDEO LIGHTBOX
  // ==========================================
  const videoTriggers = document.querySelectorAll('[data-video]');
  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoUrl = trigger.getAttribute('data-video');
      const lightbox = document.createElement('div');
      lightbox.className = 'video-lightbox';
      lightbox.style.cssText = `
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0,0,0,0.9); display: flex;
        align-items: center; justify-content: center;
      `;
      lightbox.innerHTML = `
        <div style="position:relative;width:90%;max-width:900px;">
          <button class="lightbox-close" style="position:absolute;top:-40px;right:0;color:white;background:none;border:none;font-size:1.5rem;cursor:pointer;"><i class="fas fa-times"></i></button>
          <div style="position:relative;padding-bottom:56.25%;border-radius:12px;overflow:hidden;">
            <iframe src="${videoUrl}" style="position:absolute;inset:0;width:100%;height:100%;border:none;" allowfullscreen></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.remove();
        document.body.style.overflow = '';
      });
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.remove();
          document.body.style.overflow = '';
        }
      });
    });
  });

  // ==========================================
  // IMAGE LIGHTBOX
  // ==========================================
  const lightboxImages = document.querySelectorAll('[data-lightbox]');
  lightboxImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-lightbox') || img.src;
      const lightbox = document.createElement('div');
      lightbox.className = 'image-lightbox';
      lightbox.style.cssText = `
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0,0,0,0.9); display: flex;
        align-items: center; justify-content: center;
        padding: 2rem; cursor: zoom-out;
      `;
      lightbox.innerHTML = `<img src="${src}" style="max-width:100%;max-height:90vh;border-radius:8px;object-fit:contain;">`;
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      lightbox.addEventListener('click', () => {
        lightbox.remove();
        document.body.style.overflow = '';
      });
    });
  });

  // ==========================================
  // TABS
  // ==========================================
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        container.querySelector(`[data-panel="${target}"]`).classList.add('active');
      });
    });
  });

  // ==========================================
  // ACCORDION (Custom)
  // ==========================================
  const customAccordions = document.querySelectorAll('.custom-accordion');
  customAccordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item-custom');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body-custom');
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => {
          i.classList.remove('open');
          i.querySelector('.accordion-body-custom').style.maxHeight = '0';
        });
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  });

  console.log('Digital Agency website loaded successfully!');
});