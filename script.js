/**
 * ELITE AUTO DETAILING - Core Frontend Application Script
 * Vanilla JavaScript (ES6+) - No external libraries/frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // CONFIGURATION & CONSTANTS
  // ==========================================================================
  const businessWhatsAppNumber = "385911234567";

  // Before & After Dataset
  const baData = {
    paint: {
      title: "Paint Correction",
      beforeImg: "images/ba-paint-before.jpg",
      afterImg: "images/ba-paint-after.jpg",
      beforeAlt: "Before paint correction showing heavy swirl marks and micro-scratches",
      afterAlt: "After Stage 2 paint correction with deep mirror reflection",
      caption: "<strong>Paint Correction:</strong> Eliminates spiderweb swirl marks, light scratches and clear-coat haze to reveal pure mirror-depth gloss."
    },
    interior: {
      title: "Interior Cleaning",
      beforeImg: "images/ba-interior-before.jpg",
      afterImg: "images/ba-interior-after.jpg",
      beforeAlt: "Before interior cleaning showing soiled seats and accumulated dust",
      afterAlt: "After deep steam extraction and matte OEM leather conditioning",
      caption: "<strong>Interior Cleaning:</strong> Deep steam sanitization, leather restoration and extraction leaves cabins refreshed with an authentic factory matte feel."
    },
    headlight: {
      title: "Headlight Restoration",
      beforeImg: "images/ba-headlight-before.jpg",
      afterImg: "images/ba-headlight-after.jpg",
      beforeAlt: "Before headlight restoration showing yellow oxidized hazy polycarbonate",
      afterAlt: "After headlight wet-sanding, polishing and UV sealant protection",
      caption: "<strong>Headlight Restoration:</strong> Removes cloudy yellow oxidation and micro-crazing to restore nighttime illumination and pristine optics."
    }
  };

  // Gallery Data
  const galleryItems = [
    {
      src: "images/gallery-exterior-1.jpg",
      title: "Mercedes AMG Dark Studio Finish",
      category: "Exterior",
      categoryKey: "exterior"
    },
    {
      src: "images/gallery-exterior-2.jpg",
      title: "Forged Wheels & Calipers Treatment",
      category: "Exterior",
      categoryKey: "exterior"
    },
    {
      src: "images/gallery-interior-1.jpg",
      title: "Cockpit Leather Rejuvenation",
      category: "Interior",
      categoryKey: "interior"
    },
    {
      src: "images/gallery-interior-2.jpg",
      title: "Alcantara & Console Detailing",
      category: "Interior",
      categoryKey: "interior"
    },
    {
      src: "images/gallery-paint-1.jpg",
      title: "Stage 2 Polishing & Swirl Removal",
      category: "Paint Correction",
      categoryKey: "paint-correction"
    },
    {
      src: "images/gallery-paint-2.jpg",
      title: "Mirror-Gloss Finish Inspection",
      category: "Paint Correction",
      categoryKey: "paint-correction"
    },
    {
      src: "images/gallery-ceramic-1.jpg",
      title: "9H Hydrophobic Water Beading",
      category: "Ceramic Coating",
      categoryKey: "ceramic-coating"
    },
    {
      src: "images/gallery-ceramic-2.jpg",
      title: "Multi-Year Ceramic Studio Cure",
      category: "Ceramic Coating",
      categoryKey: "ceramic-coating"
    }
  ];

  // ==========================================================================
  // 1. DYNAMIC FOOTER YEAR
  // ==========================================================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 2. STICKY NAVIGATION & ACTIVE SECTION HIGHLIGHT (ScrollSpy)
  // ==========================================================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Init on load

  // ==========================================================================
  // 3. MOBILE HAMBURGER MENU
  // ==========================================================================
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  const openMobileMenu = () => {
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const toggleMobileMenu = () => {
    const isExpanded = mobileToggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  if (mobileToggleBtn && mobileNav) {
    mobileToggleBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile nav when clicking any link inside it
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // ==========================================================================
  // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================================================
  // 5. ANIMATED STATISTICS COUNTERS
  // ==========================================================================
  const statsSection = document.getElementById('stats');
  const counterElements = document.querySelectorAll('.stat-counter');
  let hasCountersAnimated = false;

  const animateCounters = () => {
    if (hasCountersAnimated) return;
    hasCountersAnimated = true;

    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quadratic function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  // ==========================================================================
  // 6. BEFORE / AFTER COMPARISON SLIDER
  // ==========================================================================
  const baContainer = document.getElementById('ba-comparison');
  const baBeforeLayer = document.getElementById('ba-before-layer');
  const baImgBefore = document.getElementById('ba-img-before');
  const baImgAfter = document.getElementById('ba-img-after');
  const baHandle = document.getElementById('ba-handle');
  const baRange = document.getElementById('ba-range');
  const baCaptionText = document.getElementById('ba-caption-text');
  const baTabButtons = document.querySelectorAll('.ba-tab-btn');

  // Synchronize internal before image width to container width
  const updateBaImageWidth = () => {
    if (baContainer && baImgBefore) {
      const containerWidth = baContainer.getBoundingClientRect().width;
      baImgBefore.style.width = `${containerWidth}px`;
    }
  };

  // Set slider percentage position (0 to 100)
  const setSliderPosition = (percent) => {
    const clamped = Math.max(0, Math.min(100, percent));
    if (baBeforeLayer) baBeforeLayer.style.width = `${clamped}%`;
    if (baHandle) baHandle.style.left = `${clamped}%`;
    if (baRange) baRange.value = clamped;
  };

  // Switch comparison category
  const setBaCategory = (categoryKey) => {
    const data = baData[categoryKey];
    if (!data) return;

    baTabButtons.forEach(btn => {
      const isSelected = btn.getAttribute('data-ba') === categoryKey;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (baImgBefore && baImgAfter) {
      baImgBefore.src = data.beforeImg;
      baImgBefore.alt = data.beforeAlt;
      baImgAfter.src = data.afterImg;
      baImgAfter.alt = data.afterAlt;
    }

    if (baCaptionText) {
      baCaptionText.innerHTML = data.caption;
    }

    setSliderPosition(50);
  };

  baTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-ba');
      setBaCategory(cat);
    });
  });

  // Drag interaction with Pointer Events
  if (baContainer) {
    let isDragging = false;

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const rect = baContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    };

    const stopDragging = () => {
      isDragging = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointercancel', stopDragging);
    };

    baContainer.addEventListener('pointerdown', (e) => {
      isDragging = true;
      const rect = baContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', stopDragging);
      window.addEventListener('pointercancel', stopDragging);
    });

    // Keyboard support via range input
    if (baRange) {
      baRange.addEventListener('input', (e) => {
        setSliderPosition(parseFloat(e.target.value));
      });
    }

    window.addEventListener('resize', updateBaImageWidth);
    updateBaImageWidth();
  }

  // ==========================================================================
  // 7. GALLERY FILTERING & LIGHTBOX
  // ==========================================================================
  const galleryFilterBtns = document.querySelectorAll('.filter-btn');
  const galleryItemEls = document.querySelectorAll('.gallery-item');

  let currentCategory = 'all';
  let activeLightboxIndex = 0;
  let activeFilteredIndices = [0, 1, 2, 3, 4, 5, 6, 7];

  // Gallery Filter Handler
  const filterGallery = (category) => {
    currentCategory = category;

    galleryFilterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });

    activeFilteredIndices = [];

    galleryItemEls.forEach((item, idx) => {
      const itemCat = item.getAttribute('data-category');
      if (category === 'all' || itemCat === category) {
        item.classList.remove('hidden');
        activeFilteredIndices.push(idx);
      } else {
        item.classList.add('hidden');
      }
    });
  };

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterGallery(filter);
    });
  });

  // Lightbox Modal Elements
  const lightboxModal = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');

  const updateLightboxContent = (index) => {
    const item = galleryItems[index];
    if (!item) return;

    activeLightboxIndex = index;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxCategory.textContent = item.category;
    lightboxCaption.textContent = item.title;

    // Display current position within filtered list
    const currentPos = activeFilteredIndices.indexOf(index) + 1;
    const totalPos = activeFilteredIndices.length;
    lightboxCounter.textContent = `${currentPos > 0 ? currentPos : 1} / ${totalPos}`;
  };

  const openLightbox = (index) => {
    updateLightboxContent(index);
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showNextLightbox = () => {
    const currentPos = activeFilteredIndices.indexOf(activeLightboxIndex);
    const nextPos = (currentPos + 1) % activeFilteredIndices.length;
    updateLightboxContent(activeFilteredIndices[nextPos]);
  };

  const showPrevLightbox = () => {
    const currentPos = activeFilteredIndices.indexOf(activeLightboxIndex);
    const prevPos = (currentPos - 1 + activeFilteredIndices.length) % activeFilteredIndices.length;
    updateLightboxContent(activeFilteredIndices[prevPos]);
  };

  // Gallery Card Click Handler
  galleryItemEls.forEach(itemEl => {
    const card = itemEl.querySelector('.gallery-card');
    const index = parseInt(itemEl.getAttribute('data-index'), 10);

    card.addEventListener('click', () => openLightbox(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevLightbox);

  // ==========================================================================
  // 8. QUOTE MODAL & PRIVACY MODAL CONTROLLERS
  // ==========================================================================
  const quoteModal = document.getElementById('quote-modal');
  const quoteModalClose = document.getElementById('quote-modal-close');
  const quoteModalBackdrop = document.getElementById('quote-modal-backdrop');
  const openQuoteButtons = document.querySelectorAll('.open-quote-modal-btn');
  const packageSelectButtons = document.querySelectorAll('.package-select-btn');

  const privacyModal = document.getElementById('privacy-modal');
  const privacyLink = document.getElementById('privacy-link');
  const privacyModalClose = document.getElementById('privacy-modal-close');
  const privacyModalBackdrop = document.getElementById('privacy-modal-backdrop');

  const openQuoteModal = (preselectedService = '') => {
    if (preselectedService) {
      const modalSelect = document.getElementById('m-quote-service');
      const inPageSelect = document.getElementById('quote-service');
      if (modalSelect) modalSelect.value = preselectedService;
      if (inPageSelect) inPageSelect.value = preselectedService;
    }

    quoteModal.classList.add('active');
    quoteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    const firstInput = quoteModal.querySelector('input');
    if (firstInput) firstInput.focus();
  };

  const closeQuoteModal = () => {
    quoteModal.classList.remove('active');
    quoteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openPrivacyModal = () => {
    privacyModal.classList.add('active');
    privacyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePrivacyModal = () => {
    privacyModal.classList.remove('active');
    privacyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Open modal buttons
  openQuoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If clicking from nav or hero
      const service = btn.getAttribute('data-service') || btn.getAttribute('data-default-service') || '';
      openQuoteModal(service);
    });
  });

  // Package cards select buttons
  packageSelectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = btn.getAttribute('data-package') || '';
      openQuoteModal(pkg);
    });
  });

  if (quoteModalClose) quoteModalClose.addEventListener('click', closeQuoteModal);
  if (quoteModalBackdrop) quoteModalBackdrop.addEventListener('click', closeQuoteModal);

  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyModal();
    });
  }
  if (privacyModalClose) privacyModalClose.addEventListener('click', closePrivacyModal);
  if (privacyModalBackdrop) privacyModalBackdrop.addEventListener('click', closePrivacyModal);

  // Global ESC Key Listener & Arrow Keys
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
      } else if (quoteModal && quoteModal.classList.contains('active')) {
        closeQuoteModal();
      } else if (privacyModal && privacyModal.classList.contains('active')) {
        closePrivacyModal();
      } else if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    } else if (e.key === 'ArrowRight' && lightboxModal && lightboxModal.classList.contains('active')) {
      showNextLightbox();
    } else if (e.key === 'ArrowLeft' && lightboxModal && lightboxModal.classList.contains('active')) {
      showPrevLightbox();
    }
  });

  // ==========================================================================
  // 9. FORM VALIDATION & WHATSAPP QUOTE GENERATION
  // ==========================================================================
  
  /**
   * Validates form fields and displays localized inline error feedback.
   * Returns null if invalid, or an object containing trimmed field values.
   */
  const validateQuoteForm = (prefix = '') => {
    const nameEl = document.getElementById(`${prefix}quote-fullname`);
    const phoneEl = document.getElementById(`${prefix}quote-phone`);
    const emailEl = document.getElementById(`${prefix}quote-email`);
    const serviceEl = document.getElementById(`${prefix}quote-service`);
    const makeEl = document.getElementById(`${prefix}quote-make`);
    const modelEl = document.getElementById(`${prefix}quote-model`);
    const yearEl = document.getElementById(`${prefix}quote-year`);
    const msgEl = document.getElementById(`${prefix}quote-message`);

    const errName = document.getElementById(`${prefix}err-fullname`);
    const errPhone = document.getElementById(`${prefix}err-phone`);
    const errEmail = document.getElementById(`${prefix}err-email`);
    const errService = document.getElementById(`${prefix}err-service`);
    const errMake = document.getElementById(`${prefix}err-make`);
    const errModel = document.getElementById(`${prefix}err-model`);

    let isValid = true;

    // Helper to set error
    const setError = (inputEl, feedbackEl, message) => {
      inputEl.classList.add('has-error');
      if (feedbackEl) {
        feedbackEl.textContent = message;
        feedbackEl.classList.add('visible');
      }
      isValid = false;
    };

    // Helper to clear error
    const clearError = (inputEl, feedbackEl) => {
      inputEl.classList.remove('has-error');
      if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.classList.remove('visible');
      }
    };

    // Full Name Validation
    const nameVal = nameEl.value.trim();
    if (!nameVal) {
      setError(nameEl, errName, 'Please enter your full name.');
    } else if (nameVal.length < 2) {
      setError(nameEl, errName, 'Name must be at least 2 characters.');
    } else {
      clearError(nameEl, errName);
    }

    // Phone Validation
    const phoneVal = phoneEl.value.trim();
    if (!phoneVal) {
      setError(phoneEl, errPhone, 'Please provide a contact phone number.');
    } else if (phoneVal.replace(/\D/g, '').length < 6) {
      setError(phoneEl, errPhone, 'Please enter a valid phone number.');
    } else {
      clearError(phoneEl, errPhone);
    }

    // Optional Email Validation
    const emailVal = emailEl ? emailEl.value.trim() : '';
    if (emailVal) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        setError(emailEl, errEmail, 'Please enter a valid email address.');
      } else {
        clearError(emailEl, errEmail);
      }
    } else if (emailEl) {
      clearError(emailEl, errEmail);
    }

    // Service Selection Validation
    const serviceVal = serviceEl.value;
    if (!serviceVal) {
      setError(serviceEl, errService, 'Please select a detailing service or package.');
    } else {
      clearError(serviceEl, errService);
    }

    // Vehicle Make Validation
    const makeVal = makeEl.value.trim();
    if (!makeVal) {
      setError(makeEl, errMake, 'Vehicle make is required (e.g. Porsche, Audi).');
    } else {
      clearError(makeEl, errMake);
    }

    // Vehicle Model Validation
    const modelVal = modelEl.value.trim();
    if (!modelVal) {
      setError(modelEl, errModel, 'Vehicle model is required (e.g. 911 GT3, M4).');
    } else {
      clearError(modelEl, errModel);
    }

    if (!isValid) {
      return null;
    }

    return {
      name: nameVal,
      phone: phoneVal,
      email: emailVal || 'Not specified',
      make: makeVal,
      model: modelVal,
      year: (yearEl && yearEl.value.trim()) ? yearEl.value.trim() : 'Not specified',
      service: serviceVal,
      message: (msgEl && msgEl.value.trim()) ? msgEl.value.trim() : 'None'
    };
  };

  /**
   * Generates WhatsApp message template and opens wa.me URL in new window
   */
  const handleWhatsAppBooking = (formData, alertElement) => {
    // Exact template requested by user:
    const messageTemplate = 
`Hello Elite Auto Detailing,
I would like to request a quote.

Customer:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Vehicle:
Make: ${formData.make}
Model: ${formData.model}
Year: ${formData.year}

Requested service:
${formData.service}

Additional information:
${formData.message}

Thank you!`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Display client notification notice
    if (alertElement) {
      alertElement.className = 'form-alert alert-info';
      alertElement.style.display = 'flex';
      alertElement.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor" style="width:20px;height:20px;flex-shrink:0;"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
        <span>Your request is ready in WhatsApp. Please press Send to complete your request.</span>
      `;
    }
  };

  /**
   * Handles local standard quote submission (without WhatsApp)
   */
  const handleStandardSubmission = (alertElement, formElement) => {
    if (alertElement) {
      alertElement.className = 'form-alert alert-success';
      alertElement.style.display = 'flex';
      alertElement.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor" style="width:20px;height:20px;flex-shrink:0;"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
        <span>Thank you! Your quote request has been prepared.</span>
      `;
    }
  };

  // Wire In-Page Quote Form
  const inPageForm = document.getElementById('quote-form');
  const inPageAlert = document.getElementById('quote-form-alert');
  const inPageWhatsAppBtn = document.getElementById('btn-submit-whatsapp');

  if (inPageForm) {
    inPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = validateQuoteForm('');
      if (formData) {
        handleStandardSubmission(inPageAlert, inPageForm);
      }
    });

    if (inPageWhatsAppBtn) {
      inPageWhatsAppBtn.addEventListener('click', () => {
        const formData = validateQuoteForm('');
        if (formData) {
          handleWhatsAppBooking(formData, inPageAlert);
        }
      });
    }
  }

  // Wire Modal Quote Form
  const modalForm = document.getElementById('modal-quote-form');
  const modalAlert = document.getElementById('modal-form-alert');
  const modalWhatsAppBtn = document.getElementById('m-btn-submit-whatsapp');

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = validateQuoteForm('m-');
      if (formData) {
        handleStandardSubmission(modalAlert, modalForm);
      }
    });

    if (modalWhatsAppBtn) {
      modalWhatsAppBtn.addEventListener('click', () => {
        const formData = validateQuoteForm('m-');
        if (formData) {
          handleWhatsAppBooking(formData, modalAlert);
        }
      });
    }
  }

  // Synchronize inputs between forms dynamically
  const syncInputs = (sourceId, targetId) => {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);
    if (source && target) {
      source.addEventListener('input', () => {
        target.value = source.value;
      });
      source.addEventListener('change', () => {
        target.value = source.value;
      });
    }
  };

  syncInputs('quote-fullname', 'm-quote-fullname');
  syncInputs('m-quote-fullname', 'quote-fullname');
  syncInputs('quote-phone', 'm-quote-phone');
  syncInputs('m-quote-phone', 'quote-phone');
  syncInputs('quote-service', 'm-quote-service');
  syncInputs('m-quote-service', 'quote-service');
  syncInputs('quote-make', 'm-quote-make');
  syncInputs('m-quote-make', 'quote-make');
  syncInputs('quote-model', 'm-quote-model');
  syncInputs('m-quote-model', 'quote-model');

});
