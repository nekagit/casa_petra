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
    updateCartCount();
    showCookieBanner();
}

// Navigation
function initializeNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const header = document.querySelector('.main-header');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Sticky header
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// Modals
function initializeModals() {
    // Newsletter modal
    const newsletterModal = document.getElementById('newsletterModal');
    const closeModalBtn = document.getElementById('closeModal');
    const declineBtn = document.getElementById('declineBtn');
    
    if (newsletterModal) {
        // Show modal after delay
        setTimeout(() => {
            if (!localStorage.getItem('newsletterShown')) {
                newsletterModal.classList.add('active');
            }
        }, 2000);
        
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
