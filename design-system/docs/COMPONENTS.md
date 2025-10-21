# Component Library Reference

This document provides a comprehensive guide to all components in the Casa-Petrada design system, including usage examples, variants, and class combinations.

## Table of Contents

- [Buttons](#buttons)
- [Forms](#forms)
- [Cards](#cards)
- [Modals](#modals)
- [Navigation](#navigation)
- [Products](#products)

## Buttons

### Variants

#### Primary Button
Main call-to-action buttons with solid background.

```html
<button class="btn btn-primary">Primary Button</button>
```

**Generated Classes:**
```css
.btn.btn-primary {
  inline-flex items-center justify-center font-semibold text-white bg-primary-600 border border-transparent rounded-md transition-all duration-200 ease-in-out;
  /* Hover: hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5 */
  /* Active: active:bg-primary-800 active:translate-y-0 */
  /* Focus: focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 */
  /* Disabled: disabled:opacity-50 disabled:cursor-not-allowed */
}
```

#### Secondary Button
Secondary actions with outlined style.

```html
<button class="btn btn-secondary">Secondary Button</button>
```

#### Outline Button
Subtle actions with border only.

```html
<button class="btn btn-outline">Outline Button</button>
```

#### Ghost Button
Minimal style for subtle actions.

```html
<button class="btn btn-ghost">Ghost Button</button>
```

#### Danger Button
Destructive actions with error styling.

```html
<button class="btn btn-danger">Delete Item</button>
```

### Sizes

#### Extra Small
```html
<button class="btn btn-primary btn-xs">Extra Small</button>
```

#### Small
```html
<button class="btn btn-primary btn-sm">Small</button>
```

#### Medium (Default)
```html
<button class="btn btn-primary">Medium</button>
```

#### Large
```html
<button class="btn btn-primary btn-lg">Large</button>
```

#### Extra Large
```html
<button class="btn btn-primary btn-xl">Extra Large</button>
```

### States

#### Loading State
```html
<button class="btn btn-primary" disabled>
  <span class="spinner"></span>
  Loading...
</button>
```

#### Full Width
```html
<button class="btn btn-primary w-full">Full Width Button</button>
```

#### Icon Only
```html
<button class="btn btn-primary btn-icon-only btn-sm">
  <svg class="w-4 h-4"><!-- icon --></svg>
</button>
```

## Forms

### Input Fields

#### Basic Input
```html
<div class="form-group">
  <label class="form-label" for="email">Email Address</label>
  <input type="email" id="email" class="form-control" placeholder="Enter your email">
</div>
```

#### Input Sizes
```html
<!-- Small -->
<input class="form-control form-control-sm" placeholder="Small input">

<!-- Medium (Default) -->
<input class="form-control" placeholder="Medium input">

<!-- Large -->
<input class="form-control form-control-lg" placeholder="Large input">
```

#### Input States
```html
<!-- Error State -->
<div class="form-group">
  <input class="form-control is-invalid" placeholder="Error input">
  <div class="form-error">This field is required</div>
</div>

<!-- Success State -->
<input class="form-control is-valid" placeholder="Success input">

<!-- Disabled State -->
<input class="form-control" disabled placeholder="Disabled input">
```

### Textarea
```html
<div class="form-group">
  <label class="form-label" for="message">Message</label>
  <textarea id="message" class="form-control form-textarea" rows="4" placeholder="Enter your message"></textarea>
</div>
```

### Select Dropdown
```html
<div class="form-group">
  <label class="form-label" for="country">Country</label>
  <select id="country" class="form-select">
    <option>Select a country</option>
    <option value="de">Germany</option>
    <option value="fr">France</option>
  </select>
</div>
```

### Checkboxes and Radio Buttons
```html
<!-- Checkbox -->
<div class="form-check">
  <input type="checkbox" id="terms" class="form-check-input">
  <label for="terms" class="form-check-label">I agree to the terms and conditions</label>
</div>

<!-- Radio Button -->
<div class="form-check">
  <input type="radio" id="option1" name="options" class="form-check-input">
  <label for="option1" class="form-check-label">Option 1</label>
</div>
```

### Form Groups
```html
<!-- Inline Form Group -->
<div class="form-group form-group-inline">
  <input type="text" class="form-control" placeholder="First name">
  <input type="text" class="form-control" placeholder="Last name">
</div>

<!-- Stacked Form Group -->
<div class="form-group form-group-stacked">
  <input type="text" class="form-control" placeholder="Username">
  <input type="email" class="form-control" placeholder="Email">
</div>
```

## Cards

### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
    <p class="card-subtitle">Card subtitle</p>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Card Variants
```html
<!-- Elevated Card -->
<div class="card card-elevated">
  <div class="card-body">Elevated card content</div>
</div>

<!-- Outlined Card -->
<div class="card card-outlined">
  <div class="card-body">Outlined card content</div>
</div>

<!-- Filled Card -->
<div class="card card-filled">
  <div class="card-body">Filled card content</div>
</div>
```

### Card Sizes
```html
<!-- Small -->
<div class="card card-sm">
  <div class="card-body">Small card</div>
</div>

<!-- Medium (Default) -->
<div class="card">
  <div class="card-body">Medium card</div>
</div>

<!-- Large -->
<div class="card card-lg">
  <div class="card-body">Large card</div>
</div>
```

### Product Card
```html
<div class="product-card">
  <div class="product-card-image">
    <img src="product.jpg" alt="Product name">
    <div class="product-card-badge sale">-20%</div>
    <div class="product-card-actions">
      <button class="product-card-action add-to-wishlist">🤍</button>
      <button class="product-card-action quick-view">👁️</button>
    </div>
  </div>
  <div class="product-card-content">
    <h3 class="product-card-title">Product Name</h3>
    <div class="product-card-price">
      <span class="product-card-price-current">29,90 €</span>
      <span class="product-card-price-original">39,90 €</span>
    </div>
    <div class="product-card-rating">
      <div class="product-card-stars">★★★★☆</div>
      <span class="product-card-reviews">(23)</span>
    </div>
    <button class="btn btn-primary add-to-cart">In den Warenkorb</button>
  </div>
</div>
```

### Category Card
```html
<div class="category-card">
  <img src="category.jpg" alt="Category" class="category-card-image">
  <div class="category-card-overlay">
    <h3 class="category-card-title">Category Name</h3>
  </div>
</div>
```

## Modals

### Basic Modal
```html
<div class="modal-overlay">
  <div class="modal modal-md">
    <div class="modal-header">
      <h3 class="modal-title">Modal Title</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Modal content goes here.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Modal Sizes
```html
<!-- Small -->
<div class="modal modal-sm">...</div>

<!-- Medium -->
<div class="modal modal-md">...</div>

<!-- Large -->
<div class="modal modal-lg">...</div>

<!-- Extra Large -->
<div class="modal modal-xl">...</div>

<!-- Full Width -->
<div class="modal modal-full">...</div>
```

### Newsletter Modal
```html
<div class="modal-overlay newsletter-modal">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">15% Rabatt auf deine Bestellung</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Jetzt zum Newsletter anmelden und wir schenken dir 15% Rabatt auf deine Bestellung.</p>
      <form class="newsletter-form">
        <div class="form-group">
          <label for="firstName" class="form-label">Vorname</label>
          <input type="text" id="firstName" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">E-Mail Adresse</label>
          <input type="email" id="email" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-full">Jetzt 15% sparen</button>
        <button type="button" class="btn btn-ghost w-full">Nein, danke.</button>
      </form>
    </div>
  </div>
</div>
```

## Navigation

### Header Navigation
```html
<header class="main-header">
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon">👑</div>
        <h1 class="logo-text">CASA-PETRADA</h1>
        <p class="logo-tagline">MODE & ACCESSOIRES</p>
      </div>
      
      <nav class="main-nav">
        <ul>
          <li><a href="/products" class="nav-link">Products</a></li>
          <li><a href="/about" class="nav-link active">About</a></li>
          <li><a href="/contact" class="nav-link">Contact</a></li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <button class="icon-btn search-btn">🔍</button>
        <button class="icon-btn user-btn">👤</button>
        <button class="icon-btn cart-btn">
          🛍️
          <span class="cart-count">3</span>
        </button>
      </div>
      
      <button class="mobile-menu-toggle">☰</button>
    </div>
    
    <div class="mobile-menu">
      <ul>
        <li><a href="/products" class="mobile-nav-link">Products</a></li>
        <li><a href="/about" class="mobile-nav-link active">About</a></li>
        <li><a href="/contact" class="mobile-nav-link">Contact</a></li>
      </ul>
    </div>
  </div>
</header>
```

### Breadcrumb Navigation
```html
<nav class="breadcrumb">
  <div class="breadcrumb-item">
    <a href="/">Start</a>
  </div>
  <div class="breadcrumb-item">
    <a href="/products">Products</a>
  </div>
  <div class="breadcrumb-item active">Bracelets</div>
</nav>
```

### Pagination
```html
<nav class="pagination">
  <a href="#" class="pagination-item pagination-prev disabled">‹</a>
  <a href="#" class="pagination-item active">1</a>
  <a href="#" class="pagination-item">2</a>
  <a href="#" class="pagination-item">3</a>
  <a href="#" class="pagination-item pagination-next">›</a>
</nav>
```

### Tabs
```html
<div class="tabs">
  <ul class="tabs-list">
    <li><a href="#tab1" class="tabs-item active">Tab 1</a></li>
    <li><a href="#tab2" class="tabs-item">Tab 2</a></li>
    <li><a href="#tab3" class="tabs-item">Tab 3</a></li>
  </ul>
</div>
```

### Sidebar Navigation
```html
<div class="sidebar">
  <div class="sidebar-header">
    <h3 class="sidebar-title">Navigation</h3>
    <button class="sidebar-close">×</button>
  </div>
  <nav class="sidebar-nav">
    <a href="/dashboard" class="sidebar-link active">Dashboard</a>
    <a href="/products" class="sidebar-link">Products</a>
    <a href="/orders" class="sidebar-link">Orders</a>
    <a href="/settings" class="sidebar-link">Settings</a>
  </nav>
</div>
```

## Products

### Product Grid
```html
<div class="products-grid">
  <div class="product-card">
    <!-- Product card content -->
  </div>
  <div class="product-card">
    <!-- Product card content -->
  </div>
  <!-- More product cards -->
</div>
```

### Product Filters
```html
<div class="products-filters">
  <div class="filter-group">
    <label class="filter-label">Price</label>
    <select class="filter-select price-filter">
      <option value="">All Prices</option>
      <option value="0-20">Under €20</option>
      <option value="20-40">€20 - €40</option>
      <option value="40-60">€40 - €60</option>
    </select>
  </div>
  
  <div class="filter-group">
    <label class="filter-label">Color</label>
    <select class="filter-select color-filter">
      <option value="">All Colors</option>
      <option value="gold">Gold</option>
      <option value="silver">Silver</option>
      <option value="rose-gold">Rose Gold</option>
    </select>
  </div>
  
  <button class="btn btn-outline clear-filters">Clear Filters</button>
</div>
```

### Product Toolbar
```html
<div class="products-toolbar">
  <div class="products-count">12 products found</div>
  <div class="view-toggle">
    <button class="view-toggle-btn active" data-view="grid">⊞</button>
    <button class="view-toggle-btn" data-view="list">☰</button>
  </div>
  <div class="sort-controls">
    <label class="sort-label">Sort by:</label>
    <select class="sort-select">
      <option value="name">Name</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Rating</option>
    </select>
  </div>
</div>
```

### Product List View
```html
<div class="products-list">
  <div class="product-list-item">
    <img src="product.jpg" alt="Product" class="product-list-image">
    <div class="product-list-content">
      <h3 class="product-list-title">Product Name</h3>
      <p class="product-list-description">Product description goes here.</p>
      <div class="product-list-price">€29.90</div>
    </div>
    <div class="product-list-actions">
      <button class="btn btn-primary btn-sm">Add to Cart</button>
    </div>
  </div>
  <!-- More list items -->
</div>
```

### Empty State
```html
<div class="products-empty">
  <div class="empty-icon">🔍</div>
  <h2 class="empty-title">No products found</h2>
  <p class="empty-description">Try adjusting your search or filter criteria.</p>
  <button class="btn btn-primary">Clear Filters</button>
</div>
```

### Loading State
```html
<div class="products-loading">
  <div class="loading-skeleton">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-button"></div>
    </div>
  </div>
  <!-- More skeleton items -->
</div>
```

## Usage with JavaScript

### Component Class Generation
```javascript
import designSystem from './design-system';

// Generate button classes
const primaryButtonClasses = designSystem.generateComponentClass('buttons', 'primary', 'md');
// Result: "inline-flex items-center justify-center font-semibold text-white bg-primary-600..."

// Generate card classes
const productCardClasses = designSystem.generateComponentClass('cards', 'product');
// Result: "group relative bg-white rounded-lg shadow-sm border border-neutral-200..."

// Generate responsive classes
const responsiveClasses = designSystem.generateResponsiveClasses('text-lg', 'md');
// Result: "md:text-lg"
```

### Dynamic Component Creation
```javascript
// Create a button element with proper classes
function createButton(text, variant = 'primary', size = 'md') {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = designSystem.generateComponentClass('buttons', variant, size);
  return button;
}

// Usage
const primaryBtn = createButton('Click me', 'primary', 'lg');
const dangerBtn = createButton('Delete', 'danger', 'sm');
```

### Theme Application
```javascript
// Apply custom theme to an element
const element = document.querySelector('.custom-component');
designSystem.applyTheme(element, {
  primaryColor: '#3b82f6',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
});
```

## Best Practices

1. **Consistency**: Always use predefined component classes
2. **Accessibility**: Include proper ARIA labels and keyboard navigation
3. **Responsive**: Use responsive variants for different screen sizes
4. **Performance**: Minimize custom CSS overrides
5. **Maintainability**: Update component configurations in JSON files
6. **Testing**: Test components across different browsers and devices
