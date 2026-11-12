/**
 * STACKLY SEASIDE RESORT - Core JavaScript
 * Faithful to Chalet Seaside Resort (Qode Interactive)
 * Pure vanilla JavaScript - Fast, responsive, professional animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Background Videos Autoplay Assurance (Bulletproof local file & web)
  // ------------------------------------------------------------------------
  const bgVideos = document.querySelectorAll('#heroBgVideo, #seasideBgVideo');
  bgVideos.forEach(video => {
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };

    playVideo();
    ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'].forEach(ev => {
      window.addEventListener(ev, playVideo, { once: true, passive: true });
    });
  });

  // ------------------------------------------------------------------------
  // 2. Adaptive Sticky Header (Compact 70px bar with ZERO content obstruction)
  // ------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 60) {
      siteHeader.classList.add('is-sticky');
    } else {
      siteHeader.classList.remove('is-sticky');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ------------------------------------------------------------------------
  // 3. Professional Scroll Reveal Animations
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible', 'is-revealed'));
  }

  // ------------------------------------------------------------------------
  // 4. Chalet Signature Terracotta Back to Top Button
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Mobile Drawer Navigation
  // ------------------------------------------------------------------------
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('mobileDrawerOverlay');
  const menuOpeners = document.querySelectorAll('.js-menu-opener');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-drawer-nav a');

  const openDrawer = () => {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.add('is-active');
    drawerOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer || !drawerOverlay) return;
    mobileDrawer.classList.remove('is-active');
    drawerOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  menuOpeners.forEach(btn => btn.addEventListener('click', openDrawer));
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // ------------------------------------------------------------------------
  // 6. Booking Engine Form Management & Defaults
  // ------------------------------------------------------------------------
  const checkInInput = document.getElementById('checkInDate');
  const checkOutInput = document.getElementById('checkOutDate');
  const bookingForm = document.getElementById('resortBookingForm');
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDetailsElem = document.getElementById('modalBookingDetails');

  // Format Date Helper (YYYY-MM-DD)
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const today = new Date();
  const defaultCheckIn = new Date();
  defaultCheckIn.setDate(today.getDate() + 1);

  const defaultCheckOut = new Date();
  defaultCheckOut.setDate(today.getDate() + 4);

  if (checkInInput && checkOutInput) {
    checkInInput.min = formatDate(today);
    checkInInput.value = formatDate(defaultCheckIn);
    
    checkOutInput.min = formatDate(defaultCheckIn);
    checkOutInput.value = formatDate(defaultCheckOut);

    checkInInput.addEventListener('change', () => {
      const selectedIn = new Date(checkInInput.value);
      const nextDay = new Date(selectedIn);
      nextDay.setDate(selectedIn.getDate() + 1);
      
      checkOutInput.min = formatDate(nextDay);
      if (new Date(checkOutInput.value) <= selectedIn) {
        checkOutInput.value = formatDate(nextDay);
      }
    });
  }

  // Booking Form Submission Handler (Directs to 404 Error page as requested)
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  }

  const bookStayBtn = document.querySelector('.booking-stay-btn');
  if (bookStayBtn) {
    bookStayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  }

  // Modal Open / Close Helpers
  const openModal = () => {
    if (bookingModal) {
      bookingModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  // Escape key closes modals and drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 7. Chalet Booking & View More & CTA Buttons & Footer Contacts -> Navigate to 404 Error Page
  // ------------------------------------------------------------------------
  const action404Buttons = document.querySelectorAll('.js-book-chalet, .room-chalet-btn, .seaside-btn, .nature-cta-actions a, .offer-action a, .footer-contact-link, a[href="404.html"]');
  action404Buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  // ------------------------------------------------------------------------
  // 8. Destination Tabs in Testimonials (Section 4) with Smooth Transitions
  // ------------------------------------------------------------------------
  const destinationData = {
    maldives: {
      quote: "Book an unforgettable stay in a romantic chalet in the pristine waters in Maldives",
      author: "Greta Doyle",
      role: "Verified Guest — Maldives Overwater Retreat"
    },
    chamonix: {
      quote: "An alpine coastal haven like no other. The private heated pool and ocean vistas were transcendent.",
      author: "Julian Vance",
      role: "Travel Connoisseur — Chamonix Seaside Villa"
    },
    amalfi: {
      quote: "Stackly captures the pure essence of seaside luxury. The cliffside views and sunset dinners are unforgettable.",
      author: "Elena Rostova",
      role: "Architect & Frequent Guest — Amalfi Coast Sanctuary"
    },
    santorini: {
      quote: "The Aegean breezes and whitewashed coastal elegance felt like stepping directly into paradise.",
      author: "Marcus Lindqvist",
      role: "Photographer — Greek Island House"
    }
  };

  const destTabButtons = document.querySelectorAll('.destination-tab-btn');
  const quoteElem = document.getElementById('destQuote');
  const authorElem = document.getElementById('destAuthor');
  const roleElem = document.getElementById('destRole');
  const bgSlides = document.querySelectorAll('.testimonial-bg-slide');

  destTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const destKey = btn.getAttribute('data-dest');
      destTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Seamlessly cross-fade destination background image
      bgSlides.forEach(slide => {
        if (slide.getAttribute('data-dest') === destKey) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      if (destinationData[destKey] && quoteElem && authorElem && roleElem) {
        quoteElem.style.opacity = '0';
        quoteElem.style.transform = 'translateY(10px)';

        setTimeout(() => {
          quoteElem.innerHTML = `&ldquo;${destinationData[destKey].quote}&rdquo;`;
          authorElem.textContent = destinationData[destKey].author;
          roleElem.textContent = destinationData[destKey].role;
          quoteElem.style.opacity = '1';
          quoteElem.style.transform = 'translateY(0)';
        }, 180);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. Toast Notification & Newsletter Handling
  // ------------------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  const showToast = (message) => {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 4000);
  };

  // ====================================================================
  // NEWSLETTER JAVASCRIPT VALIDATION (Replacing default HTML5 validation)
  // ====================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm && newsletterEmail) {
    // Robust email regex pattern according to standard specification
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    const setNewsletterError = (msg) => {
      newsletterEmail.classList.add('is-invalid');
      newsletterEmail.classList.remove('is-valid');
      if (newsletterFeedback) {
        newsletterFeedback.className = 'footer-newsletter-feedback error-msg';
        newsletterFeedback.innerHTML = `
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>${msg}</span>
        `;
      }
      newsletterEmail.focus();
    };

    const setNewsletterSuccess = (emailVal) => {
      newsletterEmail.classList.remove('is-invalid');
      newsletterEmail.classList.add('is-valid');
      if (newsletterFeedback) {
        newsletterFeedback.className = 'footer-newsletter-feedback success-msg';
        newsletterFeedback.innerHTML = `
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Subscribed successfully! Welcome to Stackly Journal.</span>
        `;
      }
      showToast(`Thank you! Exclusive travel invitations will be sent to ${emailVal}.`);
      newsletterEmail.value = '';
      setTimeout(() => {
        newsletterEmail.classList.remove('is-valid');
        if (newsletterFeedback && newsletterFeedback.classList.contains('success-msg')) {
          newsletterFeedback.className = 'footer-newsletter-feedback';
          newsletterFeedback.innerHTML = '';
        }
      }, 5000);
    };

    const clearNewsletterState = () => {
      newsletterEmail.classList.remove('is-invalid');
      if (newsletterFeedback && newsletterFeedback.classList.contains('error-msg')) {
        newsletterFeedback.className = 'footer-newsletter-feedback';
        newsletterFeedback.innerHTML = '';
      }
    };

    // Live reset of error state when user modifies input
    newsletterEmail.addEventListener('input', clearNewsletterState);

    const handleNewsletterSubmit = (e) => {
      if (e) e.preventDefault();
      const val = newsletterEmail.value ? newsletterEmail.value.trim() : '';

      if (!val) {
        setNewsletterError('Please enter your email address.');
        return;
      }

      if (!emailPattern.test(val)) {
        setNewsletterError('Please enter a valid email address (e.g. name@domain.com).');
        return;
      }

      // Valid email verified -> Redirect to 404 error page only
      window.location.href = '404.html';
    };

    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  // Reservation Confirmation Button in Modal
  const confirmReservationBtn = document.getElementById('confirmReservationBtn');
  if (confirmReservationBtn) {
    confirmReservationBtn.addEventListener('click', () => {
      closeModal();
      showToast('Reservation inquiry received! Our 24/7 resort concierge will contact you momentarily.');
    });
  }

  // ====================================================================
  // PARTNER LOGOS AUTO-SCROLL MARQUEE TOUCH INTERACTIONS
  // ====================================================================
  const marqueeContainer = document.querySelector('.clients-marquee-container');
  const marqueeTrack = document.getElementById('clientsMarqueeTrack');
  if (marqueeContainer && marqueeTrack) {
    marqueeContainer.addEventListener('touchstart', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    }, { passive: true });

    marqueeContainer.addEventListener('touchend', () => {
      marqueeTrack.style.animationPlayState = 'running';
    }, { passive: true });
  }
});
