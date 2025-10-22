// Casa-Petrada Main JavaScript

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeNavigation();
    initializeModals();
    initializeCart();
    initializeWishlist();
    initializeForms();
    initializeAnimations();
    initializeScrollEffects();
    initializeImages();
    initializeNotifications();
    initializePerformanceMonitoring();
    initializeAdvancedUX();
    initializeServiceWorker();
    initializeAdvancedSearch();
    updateCartCount();
    showCookieBanner();
}

// Navigation - Enhanced Mobile Menu
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const header = document.querySelector('.main-header');
    const body = document.body;
    
    if (mobileMenuToggle && mobileMenu) {
        // Enhanced mobile menu toggle
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu when clicking on menu links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Prevent body scroll when menu is open
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (mobileMenu.classList.contains('active')) {
                        body.style.overflow = 'hidden';
                        mobileMenuToggle.setAttribute('aria-expanded', 'true');
                        mobileMenuToggle.setAttribute('aria-label', 'Close navigation menu');
                    } else {
                        body.style.overflow = '';
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
                    }
                }
            });
        });
        
        observer.observe(mobileMenu, { attributes: true });
    }
    
    // Sticky header with improved performance
    if (header) {
        let ticking = false;
        
        function updateStickyHeader() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateStickyHeader);
                ticking = true;
            }
        });
    }
    
    // Smooth scroll for anchor links with offset for sticky header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Helper functions
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileMenuToggle.setAttribute('aria-label', 'Close navigation menu');
        
        // Focus management
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
        
        // Return focus to toggle button
        mobileMenuToggle.focus();
    }
}

// Modals
function initializeModals() {
    // Newsletter modal
    const newsletterModal = document.getElementById('newsletterModal');
    const closeModalBtn = document.getElementById('closeModal');
    const declineBtn = document.getElementById('declineBtn');
    
    if (newsletterModal) {
        // Newsletter modal is disabled by default
        // Uncomment the lines below to enable auto-show functionality
        // setTimeout(() => {
        //     if (!localStorage.getItem('newsletterShown')) {
        //         newsletterModal.classList.add('active');
        //     }
        // }, 2000);
        
        // Close modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        if (declineBtn) {
            declineBtn.addEventListener('click', closeModal);
        }
        
        // Close on overlay click
        newsletterModal.addEventListener('click', function(e) {
            if (e.target === newsletterModal) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && newsletterModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // Generic modal functionality
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function closeModal(modal = null) {
    if (modal) {
        modal.classList.remove('active');
    } else {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            localStorage.setItem('newsletterShown', 'true');
        }
    }
}

// Cart functionality
function initializeCart() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            const product = getProductById(productId);
            if (product) {
                addToCart(product);
                showNotification('Produkt zum Warenkorb hinzugefügt!', 'success');
            }
        });
    });
    
    // Update cart display
    updateCartDisplay();
}

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            options: product.options || {}
        });
    }
    
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartDisplay();
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const count = getCartItemCount();
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'block' : 'none';
    }
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center">Ihr Warenkorb ist leer</p>';
            return;
        }
        
        cart.forEach(item => {
            const cartItem = createCartItemElement(item);
            cartItems.appendChild(cartItem);
        });
        
        updateCartSummary();
    }
}

function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <div class="cart-item-options">${formatItemOptions(item.options)}</div>
        </div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
    `;
    return div;
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal >= 39.90 ? 0 : 4.90;
    const total = subtotal + shipping;
    
    const summary = document.querySelector('.cart-summary');
    if (summary) {
        summary.innerHTML = `
            <h3>Bestellübersicht</h3>
            <div class="cart-summary-row">
                <span>Zwischensumme</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Versand</span>
                <span>${shipping === 0 ? 'Kostenlos' : formatPrice(shipping)}</span>
            </div>
            <div class="cart-summary-total">
                <span>Gesamt</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1rem;" onclick="proceedToCheckout()">
                Zur Kasse
            </button>
        `;
    }
}

// Wishlist functionality
function initializeWishlist() {
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            const product = getProductById(productId);
            if (product) {
                toggleWishlist(product);
            }
        });
    });
    
    updateWishlistDisplay();
}

function toggleWishlist(product) {
    const existingIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showNotification('Aus Wunschliste entfernt', 'info');
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        showNotification('Zur Wunschliste hinzugefügt!', 'success');
    }
    
    saveWishlist();
    updateWishlistDisplay();
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateWishlistDisplay() {
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        const productId = button.dataset.productId;
        const isWishlisted = isInWishlist(productId);
        
        button.classList.toggle('active', isWishlisted);
        button.innerHTML = isWishlisted ? '❤️' : '🤍';
    });
}

// Forms
function initializeForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Form validation
    initializeFormValidation();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Vielen Dank für Ihre Anmeldung! Sie erhalten 15% Rabatt.', 'success');
        e.target.reset();
        closeModal();
    }, 1000);
}

function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Ihre Nachricht wurde gesendet!', 'success');
        e.target.reset();
    }, 1000);
}

function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    clearFieldError(e);
    
    if (required && !value) {
        showFieldError(field, 'Dieses Feld ist erforderlich');
        return false;
    }
    
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
            return false;
        }
    }
    
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Bitte geben Sie eine gültige Telefonnummer ein');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorElement = field.parentNode.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('is-invalid');
    
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .category-card, .card').forEach(el => {
        observer.observe(el);
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Image Optimization and Lazy Loading
function initializeImages() {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading class
                    img.classList.add('img-loading');
                    
                    // Load the image
                    img.addEventListener('load', function() {
                        img.classList.remove('img-loading');
                        img.classList.add('loaded');
                    });
                    
                    // Handle image load errors
                    img.addEventListener('error', function() {
                        img.classList.remove('img-loading');
                        img.classList.add('img-error');
                        img.alt = 'Image failed to load';
                    });
                    
                    // Set src to trigger loading
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
        });
    }
    
    // Responsive image handling
    const productImages = document.querySelectorAll('.product-card-image img');
    productImages.forEach(img => {
        // Add responsive classes
        img.classList.add('responsive-img');
        
        // Handle image load
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle image error
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Product image unavailable';
        });
    });
    
    // Optimize images based on device pixel ratio
    const optimizeForRetina = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            if (pixelRatio > 1 && img.dataset.src2x) {
                img.src = img.dataset.src2x;
            }
        });
    };
    
    // Run optimization after page load
    window.addEventListener('load', optimizeForRetina);
}

// Notification System - Enhanced UX
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(container);
    }
}

// Enhanced notification system with design system
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    // Create notification content
    const icon = getNotificationIcon(type);
    const content = `
        <div class="notification-content">
            <div class="notification-icon">${icon}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    notification.innerHTML = content;
    
    // Add to container
    container.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.classList.add('notification-show');
    });
    
    // Auto remove after duration
    const timeout = setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(timeout);
        removeNotification(notification);
    });
    
    // Click to dismiss
    notification.addEventListener('click', (e) => {
        if (e.target === notification) {
            clearTimeout(timeout);
            removeNotification(notification);
        }
    });
}

function removeNotification(notification) {
    notification.classList.add('notification-hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '⚠',
        warning: '⚠',
        info: 'ℹ',
        loading: '⟳'
    };
    return icons[type] || icons.info;
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Skip to main content link
    addSkipLink();
    
    // Focus management for modals
    enhanceModalAccessibility();
    
    // Keyboard navigation improvements
    enhanceKeyboardNavigation();
    
    // Screen reader announcements
    setupScreenReaderAnnouncements();
}

function addSkipLink() {
    if (document.querySelector('.skip-link')) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary-500);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function enhanceModalAccessibility() {
    const modals = document.querySelectorAll('.modal-overlay');
    
    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const closeBtn = modal.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
            }
        });
        
        // Trap focus within modal
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    });
}

function enhanceKeyboardNavigation() {
    // Enhanced keyboard navigation for product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('a');
                if (link) link.click();
            }
        });
    });
}

function setupScreenReaderAnnouncements() {
    // Announce cart updates
    const originalUpdateCartCount = window.updateCartCount;
    if (originalUpdateCartCount) {
        window.updateCartCount = function() {
            originalUpdateCartCount();
            announceToScreenReader('Cart updated');
        };
    }
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Performance Monitoring - Advanced Analytics
function initializePerformanceMonitoring() {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            trackMetric('lcp', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                trackMetric('fid', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
            trackMetric('cls', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    // Resource loading performance
    window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        console.log('Page Load Time:', loadTime);
        trackMetric('load_time', loadTime);
    });

    // User interaction tracking
    trackUserInteractions();
}

function trackMetric(name, value) {
    // In a real application, send to analytics service
    console.log(`Metric: ${name} = ${value}`);
    
    // Store in localStorage for debugging
    const metrics = JSON.parse(localStorage.getItem('performance_metrics') || '{}');
    metrics[name] = value;
    metrics.timestamp = Date.now();
    localStorage.setItem('performance_metrics', JSON.stringify(metrics));
}

function trackUserInteractions() {
    // Track button clicks
    document.addEventListener('click', (e) => {
        if (e.target.matches('button, .btn, [role="button"]')) {
            trackEvent('button_click', {
                element: e.target.className,
                text: e.target.textContent?.trim()
            });
        }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
        trackEvent('form_submit', {
            form: e.target.className || e.target.id
        });
    });

    // Track cart interactions
    document.addEventListener('click', (e) => {
        if (e.target.matches('.add-to-cart, .remove-item, .quantity-btn')) {
            trackEvent('cart_interaction', {
                action: e.target.className,
                product: e.target.dataset.productId
            });
        }
    });
}

function trackEvent(eventName, data) {
    console.log(`Event: ${eventName}`, data);
    
    // In a real application, send to analytics service
    const events = JSON.parse(localStorage.getItem('user_events') || '[]');
    events.push({
        event: eventName,
        data: data,
        timestamp: Date.now()
    });
    localStorage.setItem('user_events', events.slice(-100)); // Keep last 100 events
}

// Advanced UX Features
function initializeAdvancedUX() {
    // Smooth scrolling enhancement
    enhanceSmoothScrolling();
    
    // Intersection Observer for animations
    initializeScrollAnimations();
    
    // Advanced hover effects
    initializeHoverEffects();
    
    // Keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Theme preferences
    initializeThemePreferences();
    
    // Offline detection
    initializeOfflineDetection();
}

function enhanceSmoothScrolling() {
    // Enhanced smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .feature-card, .section-title').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function initializeHoverEffects() {
    // Enhanced hover effects for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay.active');
            if (openModal) {
                const closeBtn = openModal.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
            }
        }
        
        // Ctrl/Cmd + Enter to submit forms
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const form = e.target.closest('form');
            if (form) {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}

function initializeThemePreferences() {
    // Dark mode support (if needed in future)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Store user preferences
    const themePreference = localStorage.getItem('theme_preference');
    if (themePreference) {
        document.documentElement.setAttribute('data-theme', themePreference);
    }
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme_preference')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

function initializeOfflineDetection() {
    function updateOnlineStatus() {
        if (navigator.onLine) {
            showNotification('You are back online', 'success', 3000);
        } else {
            showNotification('You are offline. Some features may not work.', 'warning', 5000);
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial check
    if (!navigator.onLine) {
        updateOnlineStatus();
    }
}

// Service Worker - Offline Functionality
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content is available, show update notification
                                showNotification('New version available! Refresh to update.', 'info', 10000);
                            }
                        });
                    });
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
        
        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('Message from SW:', event.data);
            
            if (event.data.type === 'CACHE_UPDATED') {
                showNotification('Content updated!', 'success', 3000);
            }
        });
        
        // Handle service worker updates
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    } else {
        console.log('Service Worker not supported');
    }
}

// Advanced Search Functionality
function initializeAdvancedSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('searchModal');
    const closeSearchModal = document.getElementById('closeSearchModal');
    const searchInput = document.getElementById('advanced-search-input');
    const searchSubmit = document.getElementById('search-submit');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchResults = document.getElementById('search-results');
    
    // Sample product data for search
    const products = [
        { id: 1, name: 'Goldenes Armband', category: 'armbänder', price: 89.99, description: 'Elegantes goldenes Armband mit Perlen' },
        { id: 2, name: 'Silberne Kette', category: 'ketten', price: 129.99, description: 'Moderne silberne Kette mit Anhänger' },
        { id: 3, name: 'Boho Fußkettchen', category: 'fußkettchen', price: 45.99, description: 'Trendiges Fußkettchen im Boho-Stil' },
        { id: 4, name: 'Perlenkette', category: 'ketten', price: 199.99, description: 'Luxuriöse Perlenkette für besondere Anlässe' },
        { id: 5, name: 'Lederarmband', category: 'armbänder', price: 39.99, description: 'Robustes Lederarmband mit Metallbeschlag' },
        { id: 6, name: 'Modeschmuck Set', category: 'modeschmuck', price: 79.99, description: 'Komplettes Schmuckset mit Ohrringen und Ring' }
    ];
    
    // Open search modal
    if (searchToggle && searchModal) {
        searchToggle.addEventListener('click', () => {
            searchModal.classList.add('active');
            searchInput.focus();
        });
    }
    
    // Close search modal
    if (closeSearchModal && searchModal) {
        closeSearchModal.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });
    }
    
    // Close modal on overlay click
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
    }
    
    // Search functionality
    if (searchInput && searchSubmit) {
        let searchTimeout;
        
        // Real-time search suggestions
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length < 2) {
                searchSuggestions.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 300);
        });
        
        // Search on submit
        searchSubmit.addEventListener('click', () => {
            performSearch();
        });
        
        // Search on Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    // Filter change handlers
    const categoryFilter = document.getElementById('category-filter');
    const priceRange = document.getElementById('price-range');
    const sortBy = document.getElementById('sort-by');
    
    [categoryFilter, priceRange, sortBy].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                if (searchInput.value.trim()) {
                    performSearch();
                }
            });
        }
    });
    
    function showSearchSuggestions(query) {
        const suggestions = products
            .filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5)
            .map(product => `
                <div class="suggestion-item" data-product-id="${product.id}">
                    <div class="suggestion-name">${product.name}</div>
                    <div class="suggestion-category">${product.category}</div>
                </div>
            `)
            .join('');
        
        if (suggestions) {
            searchSuggestions.innerHTML = suggestions;
            searchSuggestions.style.display = 'block';
            
            // Add click handlers to suggestions
            searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const productId = item.dataset.productId;
                    const product = products.find(p => p.id == productId);
                    if (product) {
                        searchInput.value = product.name;
                        searchSuggestions.style.display = 'none';
                        performSearch();
                    }
                });
            });
        } else {
            searchSuggestions.style.display = 'none';
        }
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        const category = categoryFilter?.value || '';
        const priceRangeValue = priceRange?.value || '';
        const sortByValue = sortBy?.value || 'relevance';
        
        if (!query) {
            searchResults.innerHTML = '<p>Bitte geben Sie einen Suchbegriff ein.</p>';
            return;
        }
        
        // Filter products
        let filteredProducts = products.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
                               product.description.toLowerCase().includes(query.toLowerCase()) ||
                               product.category.toLowerCase().includes(query.toLowerCase());
            
            const matchesCategory = !category || product.category === category;
            
            const matchesPrice = !priceRangeValue || checkPriceRange(product.price, priceRangeValue);
            
            return matchesQuery && matchesCategory && matchesPrice;
        });
        
        // Sort products
        filteredProducts = sortProducts(filteredProducts, sortByValue, query);
        
        // Display results
        displaySearchResults(filteredProducts, query);
    }
    
    function checkPriceRange(price, range) {
        switch (range) {
            case '0-50': return price >= 0 && price <= 50;
            case '50-100': return price > 50 && price <= 100;
            case '100-200': return price > 100 && price <= 200;
            case '200+': return price > 200;
            default: return true;
        }
    }
    
    function sortProducts(products, sortBy, query) {
        switch (sortBy) {
            case 'price-low':
                return products.sort((a, b) => a.price - b.price);
            case 'price-high':
                return products.sort((a, b) => b.price - a.price);
            case 'name':
                return products.sort((a, b) => a.name.localeCompare(b.name));
            case 'newest':
                return products.sort((a, b) => b.id - a.id);
            case 'relevance':
            default:
                return products.sort((a, b) => {
                    const aRelevance = calculateRelevance(a, query);
                    const bRelevance = calculateRelevance(b, query);
                    return bRelevance - aRelevance;
                });
        }
    }
    
    function calculateRelevance(product, query) {
        let score = 0;
        const queryLower = query.toLowerCase();
        
        if (product.name.toLowerCase().includes(queryLower)) score += 3;
        if (product.description.toLowerCase().includes(queryLower)) score += 2;
        if (product.category.toLowerCase().includes(queryLower)) score += 1;
        
        return score;
    }
    
    function displaySearchResults(products, query) {
        if (products.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <h4>Keine Ergebnisse gefunden</h4>
                    <p>Versuchen Sie andere Suchbegriffe oder passen Sie die Filter an.</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = `
            <div class="search-results-header">
                <h4>${products.length} Ergebnis${products.length !== 1 ? 'se' : ''} für "${query}"</h4>
            </div>
            <div class="search-results-grid">
                ${products.map(product => `
                    <div class="search-result-item">
                        <div class="result-image">
                            <img src="/assets/images/products/product-${product.id}.jpg" alt="${product.name}" loading="lazy">
                        </div>
                        <div class="result-content">
                            <h5 class="result-name">${product.name}</h5>
                            <p class="result-description">${product.description}</p>
                            <div class="result-meta">
                                <span class="result-category">${product.category}</span>
                                <span class="result-price">${product.price.toFixed(2)}€</span>
                            </div>
                            <button class="btn btn-primary btn-sm add-to-cart" data-product-id="${product.id}">
                                In den Warenkorb
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        searchResults.innerHTML = resultsHTML;
        
        // Add event listeners to add to cart buttons
        searchResults.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                const product = products.find(p => p.id == productId);
                if (product) {
                    // Simulate adding to cart
                    showNotification(`${product.name} wurde zum Warenkorb hinzugefügt!`, 'success');
                    searchModal.classList.remove('active');
                }
            });
        });
    }
}

// Cookie banner
function showCookieBanner() {
    const cookieBanner = document.querySelector('.cookie-banner');
    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    const cookieBanner = document.querySelector('.cookie-banner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
    }
}

function declineCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    const cookieBanner = document.querySelector('.cookie-banner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
    }
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

function formatItemOptions(options) {
    return Object.entries(options)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
}

function getProductById(id) {
    // This would typically fetch from an API
    // For now, return a mock product
    return {
        id: id,
        name: 'Beispielprodukt',
        price: 29.90,
        image: '/assets/images/products/placeholder.jpg'
    };
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Ihr Warenkorb ist leer', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// Global functions for HTML onclick handlers
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.toggleWishlist = toggleWishlist;
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.proceedToCheckout = proceedToCheckout;
