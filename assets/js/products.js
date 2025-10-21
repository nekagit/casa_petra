// Casa-Petrada Product Management

// Product data (mock data - would typically come from API)
const products = [
    {
        id: '1',
        name: 'Boho Perlen Armband',
        price: 29.90,
        originalPrice: 39.90,
        image: '/assets/images/products/bracelet1.jpg',
        images: ['/assets/images/products/bracelet1.jpg', '/assets/images/products/bracelet1-2.jpg'],
        category: 'bracelets',
        tags: ['boho', 'perlen', 'handgemacht'],
        description: 'Handgefertigtes Boho-Armband aus natürlichen Perlen und Gold-Akzenten.',
        inStock: true,
        stock: 10,
        rating: 4.5,
        reviews: 23,
        options: {
            size: ['S', 'M', 'L'],
            color: ['Gold', 'Silber', 'Rose Gold']
        },
        variants: [
            { id: '1-gold-s', size: 'S', color: 'Gold', price: 29.90, stock: 5 },
            { id: '1-gold-m', size: 'M', color: 'Gold', price: 29.90, stock: 3 },
            { id: '1-silver-m', size: 'M', color: 'Silber', price: 29.90, stock: 2 }
        ]
    },
    {
        id: '2',
        name: 'Goldene Halskette mit Anhänger',
        price: 49.90,
        image: '/assets/images/products/necklace1.jpg',
        images: ['/assets/images/products/necklace1.jpg', '/assets/images/products/necklace1-2.jpg'],
        category: 'necklaces',
        tags: ['gold', 'anhänger', 'elegant'],
        description: 'Elegante goldene Halskette mit handgefertigtem Anhänger.',
        inStock: true,
        stock: 5,
        rating: 4.8,
        reviews: 15,
        options: {
            length: ['40cm', '45cm', '50cm'],
            color: ['Gold', 'Rose Gold']
        }
    },
    {
        id: '3',
        name: 'Perlenkette mit Edelsteinen',
        price: 39.90,
        image: '/assets/images/products/necklace2.jpg',
        images: ['/assets/images/products/necklace2.jpg'],
        category: 'necklaces',
        tags: ['perlen', 'edelsteine', 'boho'],
        description: 'Wunderschöne Perlenkette mit echten Edelsteinen.',
        inStock: true,
        stock: 8,
        rating: 4.3,
        reviews: 31,
        options: {
            length: ['42cm', '47cm'],
            color: ['Multicolor', 'Weiß', 'Rosa']
        }
    },
    {
        id: '4',
        name: 'Fußkettchen mit Glöckchen',
        price: 19.90,
        image: '/assets/images/products/anklet1.jpg',
        images: ['/assets/images/products/anklet1.jpg'],
        category: 'anklets',
        tags: ['fußkettchen', 'glöckchen', 'sommer'],
        description: 'Süßes Fußkettchen mit kleinen Glöckchen.',
        inStock: true,
        stock: 12,
        rating: 4.1,
        reviews: 8,
        options: {
            size: ['One Size'],
            color: ['Gold', 'Silber']
        }
    },
    {
        id: '5',
        name: 'Boho Ohrringe Set',
        price: 24.90,
        image: '/assets/images/products/earrings1.jpg',
        images: ['/assets/images/products/earrings1.jpg'],
        category: 'fashion-jewelry',
        tags: ['ohrringe', 'boho', 'set'],
        description: 'Set aus 3 verschiedenen Boho-Ohrringen.',
        inStock: true,
        stock: 6,
        rating: 4.6,
        reviews: 12,
        options: {
            type: ['Set 1', 'Set 2', 'Set 3']
        }
    },
    {
        id: '6',
        name: 'Leder Handtasche',
        price: 89.90,
        originalPrice: 119.90,
        image: '/assets/images/products/bag1.jpg',
        images: ['/assets/images/products/bag1.jpg'],
        category: 'bags',
        tags: ['leder', 'handtasche', 'boho'],
        description: 'Echte Leder Handtasche im Boho-Stil.',
        inStock: true,
        stock: 4,
        rating: 4.7,
        reviews: 19,
        options: {
            color: ['Braun', 'Schwarz', 'Beige']
        }
    }
];

// Filter and sort state
let currentFilters = {
    category: '',
    priceRange: [0, 1000],
    color: [],
    size: [],
    inStock: false,
    onSale: false
};

let currentSort = 'name';
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 12;

// Initialize product functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeFilters();
    initializeSorting();
    initializePagination();
    initializeProductGallery();
    initializeProductOptions();
});

// Initialize products
function initializeProducts() {
    renderProducts();
    updateProductCount();
}

// Initialize filters
function initializeFilters() {
    // Category filter
    const categoryFilter = document.querySelector('.category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    // Price range filter
    const priceRange = document.querySelector('.price-range');
    if (priceRange) {
        priceRange.addEventListener('input', handlePriceFilter);
    }
    
    // Color filter
    document.querySelectorAll('.color-filter input').forEach(input => {
        input.addEventListener('change', handleColorFilter);
    });
    
    // Size filter
    document.querySelectorAll('.size-filter input').forEach(input => {
        input.addEventListener('change', handleSizeFilter);
    });
    
    // Stock filter
    const stockFilter = document.querySelector('.stock-filter');
    if (stockFilter) {
        stockFilter.addEventListener('change', handleStockFilter);
    }
    
    // Sale filter
    const saleFilter = document.querySelector('.sale-filter');
    if (saleFilter) {
        saleFilter.addEventListener('change', handleSaleFilter);
    });
    
    // Clear filters
    const clearFilters = document.querySelector('.clear-filters');
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }
}

// Initialize sorting
function initializeSorting() {
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
}

// Initialize pagination
function initializePagination() {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.addEventListener('click', handlePagination);
    }
}

// Initialize product gallery
function initializeProductGallery() {
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.querySelector('.product-main-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            // Update main image
            if (mainImage) {
                mainImage.src = this.src;
            }
        });
    });
}

// Initialize product options
function initializeProductOptions() {
    // Size options
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all size options
            document.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            updateAddToCartButton();
        });
    });
    
    // Color options
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all color options
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            updateAddToCartButton();
        });
    });
    
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const quantityInput = this.parentNode.querySelector('.quantity-input');
            let quantity = parseInt(quantityInput.value) || 1;
            
            if (action === 'increase') {
                quantity += 1;
            } else if (action === 'decrease') {
                quantity = Math.max(1, quantity - 1);
            }
            
            quantityInput.value = quantity;
            updateAddToCartButton();
        });
    });
}

// Handle category filter
function handleCategoryFilter(e) {
    currentFilters.category = e.target.value;
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Handle price filter
function handlePriceFilter(e) {
    const value = parseInt(e.target.value);
    currentFilters.priceRange[1] = value;
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Handle color filter
function handleColorFilter(e) {
    const color = e.target.value;
    if (e.target.checked) {
        currentFilters.color.push(color);
    } else {
        currentFilters.color = currentFilters.color.filter(c => c !== color);
    }
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Handle size filter
function handleSizeFilter(e) {
    const size = e.target.value;
    if (e.target.checked) {
        currentFilters.size.push(size);
    } else {
        currentFilters.size = currentFilters.size.filter(s => s !== size);
    }
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Handle stock filter
function handleStockFilter(e) {
    currentFilters.inStock = e.target.checked;
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Handle sale filter
function handleSaleFilter(e) {
    currentFilters.onSale = e.target.checked;
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Clear all filters
function clearAllFilters() {
    currentFilters = {
        category: '',
        priceRange: [0, 1000],
        color: [],
        size: [],
        inStock: false,
        onSale: false
    };
    
    // Reset form elements
    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });
    
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    currentPage = 1;
    renderProducts();
    updateProductCount();
}

// Handle sort
function handleSort(e) {
    currentSort = e.target.value;
    currentPage = 1;
    renderProducts();
}

// Handle pagination
function handlePagination(e) {
    e.preventDefault();
    
    const link = e.target.closest('a');
    if (!link) return;
    
    const page = parseInt(link.dataset.page);
    if (page && page !== currentPage) {
        currentPage = page;
        renderProducts();
        scrollToTop();
    }
}

// Render products
function renderProducts() {
    const container = document.querySelector('.products-grid');
    if (!container) return;
    
    const filteredProducts = getFilteredProducts();
    const sortedProducts = getSortedProducts(filteredProducts);
    const paginatedProducts = getPaginatedProducts(sortedProducts);
    
    container.innerHTML = '';
    
    if (paginatedProducts.length === 0) {
        container.innerHTML = '<p class="no-products">Keine Produkte gefunden</p>';
        return;
    }
    
    paginatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    renderPagination(filteredProducts.length);
}

// Create product card
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    
    const isOnSale = product.originalPrice && product.originalPrice > product.price;
    const discount = isOnSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    div.innerHTML = `
        <div class="product-card-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${isOnSale ? `<div class="product-card-badge sale">-${discount}%</div>` : ''}
            ${!product.inStock ? '<div class="product-card-badge">Ausverkauft</div>' : ''}
            <div class="product-card-actions">
                <button class="product-card-action add-to-wishlist" data-product-id="${product.id}" title="Zur Wunschliste">
                    🤍
                </button>
                <button class="product-card-action quick-view" data-product-id="${product.id}" title="Schnellansicht">
                    👁️
                </button>
            </div>
        </div>
        <div class="product-card-content">
            <h3 class="product-card-title">${product.name}</h3>
            <div class="product-card-price">
                <span class="product-card-price-current">${formatPrice(product.price)}</span>
                ${isOnSale ? `<span class="product-card-price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <div class="product-card-rating">
                <div class="product-card-stars">${generateStars(product.rating)}</div>
                <span class="product-card-reviews">(${product.reviews})</span>
            </div>
            <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'In den Warenkorb' : 'Ausverkauft'}
            </button>
        </div>
    `;
    
    // Add event listeners
    const addToCartBtn = div.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', handleAddToCart);
    
    const addToWishlistBtn = div.querySelector('.add-to-wishlist');
    addToWishlistBtn.addEventListener('click', handleAddToWishlist);
    
    const quickViewBtn = div.querySelector('.quick-view');
    quickViewBtn.addEventListener('click', handleQuickView);
    
    return div;
}

// Handle add to cart
function handleAddToCart(e) {
    e.preventDefault();
    
    const productId = e.target.dataset.productId;
    const product = products.find(p => p.id === productId);
    
    if (!product || !product.inStock) {
        showNotification('Produkt nicht verfügbar', 'warning');
        return;
    }
    
    // Get selected options
    const options = getSelectedProductOptions();
    
    // Add to cart (this would integrate with cart.js)
    if (typeof addToCart === 'function') {
        addToCart(product, 1, options);
    }
    
    showNotification('Produkt zum Warenkorb hinzugefügt!', 'success');
}

// Handle add to wishlist
function handleAddToWishlist(e) {
    e.preventDefault();
    
    const productId = e.target.dataset.productId;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Toggle wishlist (this would integrate with wishlist functionality)
    const isWishlisted = e.target.classList.contains('active');
    
    if (isWishlisted) {
        e.target.classList.remove('active');
        e.target.textContent = '🤍';
        showNotification('Aus Wunschliste entfernt', 'info');
    } else {
        e.target.classList.add('active');
        e.target.textContent = '❤️';
        showNotification('Zur Wunschliste hinzugefügt!', 'success');
    }
}

// Handle quick view
function handleQuickView(e) {
    e.preventDefault();
    
    const productId = e.target.dataset.productId;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    showQuickViewModal(product);
}

// Show quick view modal
function showQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">${product.name}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="quick-view-content">
                    <img src="${product.image}" alt="${product.name}" class="quick-view-image">
                    <div class="quick-view-details">
                        <div class="quick-view-price">${formatPrice(product.price)}</div>
                        <div class="quick-view-rating">${generateStars(product.rating)} (${product.reviews} Bewertungen)</div>
                        <p class="quick-view-description">${product.description}</p>
                        <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                            In den Warenkorb
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    
    const addToCartBtn = modal.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', (e) => {
        handleAddToCart(e);
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Get filtered products
function getFilteredProducts() {
    return products.filter(product => {
        // Category filter
        if (currentFilters.category && product.category !== currentFilters.category) {
            return false;
        }
        
        // Price range filter
        if (product.price < currentFilters.priceRange[0] || product.price > currentFilters.priceRange[1]) {
            return false;
        }
        
        // Color filter
        if (currentFilters.color.length > 0) {
            const hasMatchingColor = currentFilters.color.some(color => 
                product.options && product.options.color && product.options.color.includes(color)
            );
            if (!hasMatchingColor) return false;
        }
        
        // Size filter
        if (currentFilters.size.length > 0) {
            const hasMatchingSize = currentFilters.size.some(size => 
                product.options && product.options.size && product.options.size.includes(size)
            );
            if (!hasMatchingSize) return false;
        }
        
        // Stock filter
        if (currentFilters.inStock && !product.inStock) {
            return false;
        }
        
        // Sale filter
        if (currentFilters.onSale && !product.originalPrice) {
            return false;
        }
        
        return true;
    });
}

// Get sorted products
function getSortedProducts(products) {
    return [...products].sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return b.id - a.id; // Assuming higher ID = newer
            default:
                return 0;
        }
    });
}

// Get paginated products
function getPaginatedProducts(products) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
}

// Render pagination
function renderPagination(totalItems) {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    if (currentPage > 1) {
        html += `<a href="#" class="pagination-item" data-page="${currentPage - 1}">‹</a>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<a href="#" class="pagination-item ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="pagination-item disabled">...</span>';
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        html += `<a href="#" class="pagination-item" data-page="${currentPage + 1}">›</a>`;
    }
    
    pagination.innerHTML = html;
}

// Update product count
function updateProductCount() {
    const count = getFilteredProducts().length;
    const countElement = document.querySelector('.products-count');
    if (countElement) {
        countElement.textContent = `${count} Produkte gefunden`;
    }
}

// Get selected product options
function getSelectedProductOptions() {
    const options = {};
    
    // Size
    const selectedSize = document.querySelector('.size-option.active');
    if (selectedSize) {
        options.size = selectedSize.dataset.value;
    }
    
    // Color
    const selectedColor = document.querySelector('.color-option.active');
    if (selectedColor) {
        options.color = selectedColor.dataset.value;
    }
    
    return options;
}

// Update add to cart button
function updateAddToCartButton() {
    const button = document.querySelector('.add-to-cart');
    if (!button) return;
    
    const productId = button.dataset.productId;
    const product = products.find(p => p.id === productId);
    
    if (!product || !product.inStock) {
        button.disabled = true;
        button.textContent = 'Nicht verfügbar';
        return;
    }
    
    button.disabled = false;
    button.textContent = 'In den Warenkorb';
}

// Generate stars for rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
