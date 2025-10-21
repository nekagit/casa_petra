// Casa-Petrada Cart Management

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;
let cartItemCount = 0;

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    updateCartDisplay();
    updateCartCount();
});

// Initialize cart
function initializeCart() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', handleQuantityChange);
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', handleRemoveItem);
    });
    
    // Clear cart button
    const clearCartBtn = document.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Apply discount code
    const discountForm = document.querySelector('.discount-form');
    if (discountForm) {
        discountForm.addEventListener('submit', handleDiscountCode);
    }
}

// Handle add to cart
function handleAddToCart(e) {
    e.preventDefault();
    
    const button = e.target;
    const productId = button.dataset.productId;
    const product = getProductById(productId);
    
    if (!product) {
        showNotification('Produkt nicht gefunden', 'error');
        return;
    }
    
    // Get selected options
    const options = getSelectedOptions(button.closest('.product-card, .product-detail'));
    
    // Check if product with same options already exists
    const existingItem = cart.find(item => 
        item.id === productId && 
        JSON.stringify(item.options) === JSON.stringify(options)
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            options: options,
            maxQuantity: product.stock || 99
        });
    }
    
    saveCart();
    updateCartDisplay();
    updateCartCount();
    showNotification('Produkt zum Warenkorb hinzugefügt!', 'success');
    
    // Update button state
    updateAddToCartButton(button, productId);
}

// Handle quantity change
function handleQuantityChange(e) {
    const button = e.target;
    const itemId = button.dataset.itemId;
    const action = button.dataset.action;
    
    const item = cart.find(item => item.id === itemId);
    if (!item) return;
    
    let newQuantity = item.quantity;
    
    if (action === 'increase') {
        if (newQuantity < item.maxQuantity) {
            newQuantity += 1;
        } else {
            showNotification('Maximale Anzahl erreicht', 'warning');
            return;
        }
    } else if (action === 'decrease') {
        newQuantity = Math.max(0, newQuantity - 1);
    }
    
    if (newQuantity === 0) {
        removeFromCart(itemId);
    } else {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
        updateCartCount();
    }
}

// Handle remove item
function handleRemoveItem(e) {
    e.preventDefault();
    
    const button = e.target;
    const itemId = button.dataset.itemId;
    
    removeFromCart(itemId);
    showNotification('Produkt entfernt', 'info');
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Clear cart
function clearCart() {
    if (confirm('Möchten Sie den Warenkorb wirklich leeren?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCount();
        showNotification('Warenkorb geleert', 'info');
    }
}

// Handle discount code
function handleDiscountCode(e) {
    e.preventDefault();
    
    const form = e.target;
    const codeInput = form.querySelector('input[name="discount-code"]');
    const code = codeInput.value.trim().toUpperCase();
    
    if (!code) {
        showNotification('Bitte geben Sie einen Gutscheincode ein', 'warning');
        return;
    }
    
    // Simulate discount code validation
    const validCodes = {
        'WELCOME15': { type: 'percentage', value: 15 },
        'SAVE10': { type: 'percentage', value: 10 },
        'FREESHIP': { type: 'shipping', value: 0 }
    };
    
    const discount = validCodes[code];
    
    if (discount) {
        applyDiscount(discount);
        showNotification('Gutscheincode angewendet!', 'success');
        codeInput.value = '';
    } else {
        showNotification('Ungültiger Gutscheincode', 'error');
    }
}

// Apply discount
function applyDiscount(discount) {
    localStorage.setItem('discount', JSON.stringify(discount));
    updateCartDisplay();
}

// Get selected options
function getSelectedOptions(container) {
    const options = {};
    
    // Size selection
    const sizeInput = container.querySelector('input[name="size"]:checked');
    if (sizeInput) {
        options.size = sizeInput.value;
    }
    
    // Color selection
    const colorInput = container.querySelector('input[name="color"]:checked');
    if (colorInput) {
        options.color = colorInput.value;
    }
    
    // Other options
    container.querySelectorAll('.option-btn.active').forEach(btn => {
        const optionName = btn.dataset.option;
        const optionValue = btn.dataset.value;
        if (optionName && optionValue) {
            options[optionName] = optionValue;
        }
    });
    
    return options;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');
    const emptyCart = document.querySelector('.empty-cart');
    
    if (!cartItems) return;
    
    // Clear existing items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        if (emptyCart) {
            emptyCart.style.display = 'block';
        }
        if (cartSummary) {
            cartSummary.style.display = 'none';
        }
        return;
    }
    
    if (emptyCart) {
        emptyCart.style.display = 'none';
    }
    if (cartSummary) {
        cartSummary.style.display = 'block';
    }
    
    // Render cart items
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItems.appendChild(cartItem);
    });
    
    // Update summary
    updateCartSummary();
}

// Create cart item element
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
            <button class="quantity-btn" data-item-id="${item.id}" data-action="decrease">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" data-item-id="${item.id}" data-action="increase">+</button>
        </div>
        <button class="cart-item-remove remove-item" data-item-id="${item.id}">&times;</button>
    `;
    
    // Re-attach event listeners
    const quantityBtns = div.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', handleQuantityChange);
    });
    
    const removeBtn = div.querySelector('.remove-item');
    removeBtn.addEventListener('click', handleRemoveItem);
    
    return div;
}

// Update cart summary
function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const discount = getDiscount();
    const shipping = calculateShipping(subtotal);
    const total = subtotal - discount.amount + shipping;
    
    const summary = document.querySelector('.cart-summary');
    if (!summary) return;
    
    summary.innerHTML = `
        <h3>Bestellübersicht</h3>
        <div class="cart-summary-row">
            <span>Zwischensumme</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        ${discount.amount > 0 ? `
            <div class="cart-summary-row discount-row">
                <span>Rabatt (${discount.code})</span>
                <span>-${formatPrice(discount.amount)}</span>
            </div>
        ` : ''}
        <div class="cart-summary-row">
            <span>Versand</span>
            <span>${shipping === 0 ? 'Kostenlos' : formatPrice(shipping)}</span>
        </div>
        <div class="cart-summary-total">
            <span>Gesamt</span>
            <span>${formatPrice(total)}</span>
        </div>
        <div class="discount-form">
            <input type="text" name="discount-code" placeholder="Gutscheincode" class="form-control">
            <button type="submit" class="btn btn-outline btn-sm">Anwenden</button>
        </div>
        <button class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1rem;" onclick="proceedToCheckout()">
            Zur Kasse
        </button>
    `;
    
    // Re-attach discount form listener
    const discountForm = summary.querySelector('.discount-form');
    if (discountForm) {
        discountForm.addEventListener('submit', handleDiscountCode);
    }
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get discount
function getDiscount() {
    const discount = JSON.parse(localStorage.getItem('discount')) || null;
    if (!discount) return { amount: 0, code: '' };
    
    const subtotal = calculateSubtotal();
    let amount = 0;
    
    if (discount.type === 'percentage') {
        amount = (subtotal * discount.value) / 100;
    } else if (discount.type === 'fixed') {
        amount = Math.min(discount.value, subtotal);
    }
    
    return {
        amount: amount,
        code: discount.code || ''
    };
}

// Calculate shipping
function calculateShipping(subtotal) {
    const freeShippingThreshold = 39.90;
    return subtotal >= freeShippingThreshold ? 0 : 4.90;
}

// Update cart count
function updateCartCount() {
    cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItemCount;
        cartCount.style.display = cartItemCount > 0 ? 'block' : 'none';
    }
    
    // Update cart count in navigation
    const navCartCount = document.querySelectorAll('.nav-cart-count');
    navCartCount.forEach(element => {
        element.textContent = cartItemCount;
        element.style.display = cartItemCount > 0 ? 'inline' : 'none';
    });
}

// Update add to cart button
function updateAddToCartButton(button, productId) {
    const isInCart = cart.some(item => item.id === productId);
    
    if (isInCart) {
        button.textContent = 'Im Warenkorb';
        button.classList.add('in-cart');
        button.disabled = true;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Format item options
function formatItemOptions(options) {
    return Object.entries(options)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
}

// Get product by ID (mock function)
function getProductById(id) {
    // This would typically fetch from an API
    const products = {
        '1': { id: '1', name: 'Boho Armband', price: 29.90, image: '/assets/images/products/bracelet1.jpg', stock: 10 },
        '2': { id: '2', name: 'Goldene Kette', price: 49.90, image: '/assets/images/products/necklace1.jpg', stock: 5 },
        '3': { id: '3', name: 'Perlenkette', price: 39.90, image: '/assets/images/products/necklace2.jpg', stock: 8 }
    };
    
    return products[id] || null;
}

// Show notification
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Ihr Warenkorb ist leer', 'warning');
        return;
    }
    
    // Save cart state for checkout
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    
    // Redirect to checkout
    window.location.href = 'checkout.html';
}

// Export functions for global access
window.updateCartQuantity = handleQuantityChange;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;
