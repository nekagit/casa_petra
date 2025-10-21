# Responsive Design Guidelines

This document provides comprehensive guidelines for implementing responsive design using the Casa-Petrada design system.

## Table of Contents

- [Breakpoint System](#breakpoint-system)
- [Mobile-First Approach](#mobile-first-approach)
- [Container System](#container-system)
- [Grid System](#grid-system)
- [Typography Scaling](#typography-scaling)
- [Component Responsiveness](#component-responsiveness)
- [Testing Guidelines](#testing-guidelines)

## Breakpoint System

### Breakpoint Scale
Our responsive system uses a mobile-first approach with the following breakpoints:

```json
{
  "breakpoints": {
    "xs": "320px",   // Extra small devices (phones)
    "sm": "640px",   // Small devices (tablets)
    "md": "768px",   // Medium devices (small laptops)
    "lg": "1024px",  // Large devices (laptops)
    "xl": "1280px",  // Extra large devices (desktops)
    "2xl": "1536px"  // 2X large devices (large desktops)
  }
}
```

### Breakpoint Usage
Always use the `min-width` approach for responsive design:

```css
/* Mobile first - base styles for mobile */
.component {
  font-size: 1rem;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .component {
    font-size: 1.125rem;
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    font-size: 1.25rem;
    padding: 2rem;
  }
}
```

### Breakpoint-Only Queries
For targeting specific breakpoint ranges:

```css
/* Only small devices */
@media (min-width: 640px) and (max-width: 767px) {
  .component {
    /* Styles for tablets only */
  }
}

/* Only medium devices */
@media (min-width: 768px) and (max-width: 1023px) {
  .component {
    /* Styles for small laptops only */
  }
}
```

## Mobile-First Approach

### Core Principles

1. **Start with Mobile**: Design and develop for mobile devices first
2. **Progressive Enhancement**: Add features and complexity for larger screens
3. **Touch-Friendly**: Ensure all interactive elements are at least 44px
4. **Performance**: Optimize for mobile performance constraints

### Implementation Strategy

```css
/* 1. Base styles for mobile (320px+) */
.container {
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

/* 2. Enhance for tablets (640px+) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
  }
}

/* 3. Enhance for laptops (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 2rem;
  }
}

/* 4. Enhance for desktops (1280px+) */
@media (min-width: 1280px) {
  .container {
    max-width: 1400px;
  }
}
```

## Container System

### Container Sizes
Responsive container widths that adapt to different screen sizes:

```json
{
  "container": {
    "xs": "100%",      // Full width on extra small screens
    "sm": "640px",     // Fixed width on small screens
    "md": "768px",     // Fixed width on medium screens
    "lg": "1024px",    // Fixed width on large screens
    "xl": "1280px",    // Fixed width on extra large screens
    "2xl": "1400px"    // Maximum width on 2X large screens
  }
}
```

### Container Implementation
```html
<!-- Basic container -->
<div class="container">
  <div class="content">Content goes here</div>
</div>

<!-- Responsive container with different max-widths -->
<div class="container container-responsive">
  <div class="content">Responsive content</div>
</div>
```

### Container Classes
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding: 0 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding: 0 2rem;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1400px;
  }
}
```

## Grid System

### Responsive Grid Classes
Pre-defined grid classes that adapt to different screen sizes:

```css
/* 1 column on mobile, 2 on tablet, 3 on desktop */
.grid-responsive-3 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid-responsive-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-responsive-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Auto-Fit Grid
Dynamic grid that automatically adjusts the number of columns:

```css
/* Auto-fit grid with minimum column width */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

/* Responsive auto-fit */
@media (min-width: 640px) {
  .grid-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
```

### Grid Gap Responsiveness
```css
.grid {
  gap: 0.5rem; /* Small gap on mobile */
}

@media (min-width: 640px) {
  .grid {
    gap: 1rem; /* Medium gap on tablets */
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: 1.5rem; /* Large gap on desktop */
  }
}
```

## Typography Scaling

### Responsive Font Sizes
Typography that scales appropriately across devices:

```css
/* Mobile-first typography */
.text-responsive {
  font-size: 1rem;        /* 16px on mobile */
  line-height: 1.5;
}

@media (min-width: 640px) {
  .text-responsive {
    font-size: 1.125rem;  /* 18px on tablets */
  }
}

@media (min-width: 1024px) {
  .text-responsive {
    font-size: 1.25rem;   /* 20px on desktop */
  }
}
```

### Heading Scale
```css
h1 {
  font-size: 2rem;        /* 32px on mobile */
  line-height: 1.2;
}

@media (min-width: 640px) {
  h1 {
    font-size: 2.5rem;    /* 40px on tablets */
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 3rem;      /* 48px on desktop */
  }
}

@media (min-width: 1280px) {
  h1 {
    font-size: 3.5rem;    /* 56px on large desktop */
  }
}
```

### Fluid Typography
Using `clamp()` for truly fluid typography:

```css
.fluid-text {
  font-size: clamp(1rem, 2.5vw, 2rem);
  line-height: clamp(1.4, 2vw, 1.6);
}
```

## Component Responsiveness

### Button Responsiveness
```css
.btn {
  padding: 0.5rem 1rem;   /* Compact on mobile */
  font-size: 0.875rem;
  min-height: 44px;       /* Touch-friendly */
}

@media (min-width: 640px) {
  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .btn {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
}
```

### Card Responsiveness
```css
.card {
  margin-bottom: 1rem;
  padding: 1rem;
}

@media (min-width: 640px) {
  .card {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .card {
    margin-bottom: 2rem;
    padding: 2rem;
  }
}
```

### Navigation Responsiveness
```css
/* Mobile navigation */
.main-nav {
  display: none;
}

.mobile-menu-toggle {
  display: block;
}

@media (min-width: 768px) {
  .main-nav {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: none;
  }
}
```

### Product Grid Responsiveness
```css
.products-grid {
  display: grid;
  grid-template-columns: 1fr;           /* 1 column on mobile */
  gap: 1rem;
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on tablets */
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on laptops */
    gap: 2rem;
  }
}

@media (min-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columns on desktop */
  }
}
```

## Responsive Utilities

### Visibility Classes
Show/hide elements at different breakpoints:

```css
/* Hide on mobile, show on tablet and up */
.hidden-mobile {
  display: none;
}

@media (min-width: 640px) {
  .hidden-mobile {
    display: block;
  }
}

/* Show on mobile, hide on tablet and up */
.visible-mobile {
  display: block;
}

@media (min-width: 640px) {
  .visible-mobile {
    display: none;
  }
}
```

### Spacing Responsiveness
```css
/* Responsive margins */
.margin-responsive {
  margin: 1rem;
}

@media (min-width: 640px) {
  .margin-responsive {
    margin: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .margin-responsive {
    margin: 2rem;
  }
}

/* Responsive padding */
.padding-responsive {
  padding: 1rem;
}

@media (min-width: 640px) {
  .padding-responsive {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .padding-responsive {
    padding: 2rem;
  }
}
```

### Flexbox Responsiveness
```css
/* Stack on mobile, row on desktop */
.flex-responsive {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .flex-responsive {
    flex-direction: row;
    gap: 2rem;
  }
}
```

## Testing Guidelines

### Device Testing
Test your responsive design on the following devices:

#### Mobile Devices
- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPhone 12/13 Pro Max (428px)
- Samsung Galaxy S21 (360px)
- Google Pixel 5 (393px)

#### Tablets
- iPad (768px)
- iPad Pro (1024px)
- Samsung Galaxy Tab (800px)

#### Desktop
- Small laptop (1366px)
- Standard desktop (1920px)
- Large desktop (2560px)

### Browser Testing
Test across different browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Testing Tools
1. **Browser DevTools**: Use responsive design mode
2. **Real Devices**: Test on actual devices when possible
3. **Online Tools**: Use tools like BrowserStack for cross-browser testing
4. **Performance**: Test on slower devices and networks

### Common Issues to Check

#### Touch Targets
Ensure all interactive elements are at least 44px:

```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem; /* Provides adequate touch area */
}
```

#### Text Readability
Ensure text is readable without zooming:

```css
.readable-text {
  font-size: 16px; /* Minimum readable size */
  line-height: 1.5; /* Adequate line spacing */
}
```

#### Image Responsiveness
Make images scale properly:

```css
.responsive-image {
  max-width: 100%;
  height: auto;
  display: block;
}
```

#### Overflow Handling
Prevent horizontal scrolling:

```css
.no-overflow {
  overflow-x: hidden;
  width: 100%;
}
```

## Performance Considerations

### Mobile Performance
- Minimize HTTP requests
- Optimize images for mobile
- Use efficient CSS selectors
- Avoid expensive animations on mobile

### CSS Optimization
```css
/* Use efficient selectors */
.component { /* Good */ }
div.component { /* Less efficient */ }
div .component { /* Even less efficient */ }

/* Use transform instead of changing layout properties */
.animate {
  transform: translateX(100px); /* Good */
  /* left: 100px; Bad - causes layout recalculation */
}
```

### JavaScript Considerations
- Use `matchMedia` for responsive JavaScript
- Debounce resize events
- Use intersection observer for scroll-based animations

```javascript
// Responsive JavaScript
const mediaQuery = window.matchMedia('(min-width: 768px)');

function handleTabletChange(e) {
  if (e.matches) {
    // Tablet and up
    enableDesktopFeatures();
  } else {
    // Mobile
    enableMobileFeatures();
  }
}

mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);
```

## Best Practices

1. **Mobile-First**: Always start with mobile design
2. **Progressive Enhancement**: Add features for larger screens
3. **Touch-Friendly**: Ensure adequate touch targets
4. **Performance**: Optimize for mobile performance
5. **Testing**: Test on real devices regularly
6. **Consistency**: Use consistent breakpoints and spacing
7. **Accessibility**: Ensure responsive design doesn't break accessibility
8. **Content Priority**: Show most important content first on mobile
