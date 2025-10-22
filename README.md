# Casa-Petrada - Premium Jewelry E-commerce Website

A modern, responsive e-commerce website for premium handcrafted jewelry, built with a comprehensive design system and optimized for performance, accessibility, and user experience.

## 🌟 Features

### Design System
- **Comprehensive Design Tokens**: Colors, typography, spacing, shadows, borders, animations
- **Component Library**: Buttons, forms, cards, modals, navigation, products
- **Layout System**: Grid utilities, containers, responsive breakpoints
- **TypeScript Integration**: Type-safe design system configuration

### Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes (320px+)
- **Touch-Friendly**: 44px minimum touch targets
- **Flexible Grid System**: Auto-fit and responsive layouts
- **Progressive Enhancement**: Works on all devices

### Accessibility
- **WCAG 2.1 AA Compliant**: Full accessibility standards
- **Keyboard Navigation**: Complete keyboard support
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Focus Management**: Enhanced focus indicators and management

### Performance
- **Core Web Vitals Optimized**: LCP <2.5s, FID <100ms, CLS <0.1
- **Lazy Loading**: Images and content loading optimization
- **Minified Assets**: Production-ready optimized files
- **Performance Monitoring**: Built-in analytics and monitoring

### User Experience
- **Smooth Animations**: 60fps animations with reduced motion support
- **Loading States**: Visual feedback for all interactions
- **Notification System**: Toast notifications for user feedback
- **Offline Detection**: Graceful offline handling

## 🚀 Quick Start

### Development
```bash
# Clone the repository
git clone https://github.com/casa-petrada/website.git
cd casa-petrada

# Start development server
npm start
# or
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Production Build
```bash
# Build for production
npm run build

# Serve production build
npm run serve
```

## 📁 Project Structure

```
casa-petra/
├── design-system/           # Design system configuration
│   ├── tokens/             # Design tokens (colors, typography, etc.)
│   ├── components/         # Component configurations
│   ├── layouts/            # Layout configurations
│   ├── utilities/          # Utility class configurations
│   ├── docs/               # Documentation
│   ├── types.ts            # TypeScript type definitions
│   └── index.ts            # Design system orchestrator
├── assets/
│   ├── css/                # Stylesheets
│   │   ├── main.css        # Core styles and design tokens
│   │   ├── components.css  # Component styles
│   │   └── pages.css       # Page-specific styles
│   ├── js/                 # JavaScript files
│   │   ├── main.js         # Core application logic
│   │   ├── cart.js         # Shopping cart functionality
│   │   ├── form-validation.js # Form validation system
│   │   └── products.js     # Product management
│   └── images/             # Image assets
├── products/               # Product pages
├── *.html                  # Main HTML pages
├── build.js                # Production build script
├── package.json            # Project configuration
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary**: Modern blue (#3B82F6) with 50-950 scale
- **Secondary**: Teal (#14B8A6) with 50-950 scale
- **Neutral**: Comprehensive gray scale (50-950)
- **Semantic**: Success, warning, error, info colors

### Typography
- **Primary Font**: Inter (system-ui fallback)
- **Heading Font**: Merriweather (serif)
- **Scale**: Modular scale (1.25 ratio)
- **Weights**: 300-800 range

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: 0-96 (0-24rem)
- **Responsive**: Mobile-first breakpoints

### Breakpoints
- **xs**: 320px (mobile)
- **sm**: 640px (tablet)
- **md**: 768px (small laptop)
- **lg**: 1024px (laptop)
- **xl**: 1280px (desktop)
- **2xl**: 1536px (large desktop)

## 🛠️ Development

### Design System Usage
```typescript
// Access design tokens
const primaryColor = DesignSystem.getToken('colors.primary.500');
const spacing = DesignSystem.getToken('spacing.4');

// Use component configurations
const buttonConfig = DesignSystem.getComponent('buttons.primary');
```

### CSS Custom Properties
```css
/* Use design system tokens */
.my-component {
    color: var(--color-primary-500);
    padding: var(--spacing-4);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
}
```

### JavaScript API
```javascript
// Show notifications
showNotification('Product added to cart!', 'success');

// Track performance
trackMetric('page_load_time', loadTime);

// Form validation
validateField(inputElement);
```

## 📱 Responsive Design

### Mobile (320px+)
- Single column layouts
- Touch-friendly interactions
- Optimized images
- Simplified navigation

### Tablet (640px+)
- Two-column grids
- Enhanced navigation
- Improved spacing
- Better typography

### Desktop (1024px+)
- Multi-column layouts
- Full navigation
- Hover effects
- Advanced interactions

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order

### Features
- Skip to main content link
- Focus trapping in modals
- Screen reader announcements
- High contrast mode support
- Reduced motion preferences

## ⚡ Performance

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1

### Optimizations
- Lazy loading for images
- Minified CSS and JavaScript
- Optimized fonts with preloading
- Efficient animations with GPU acceleration
- Service Worker ready

## 🔧 Build System

### Development
```bash
npm start          # Start development server
npm run dev        # Alternative development command
```

### Production
```bash
npm run build      # Build for production
npm run serve      # Serve production build
```

### Build Features
- CSS minification and combination
- JavaScript minification and combination
- HTML optimization
- Asset copying and optimization
- Build information generation

## 📊 Analytics & Monitoring

### Performance Monitoring
- Core Web Vitals tracking
- User interaction analytics
- Error tracking and reporting
- Performance metrics storage

### User Experience Tracking
- Button click tracking
- Form submission monitoring
- Cart interaction analytics
- Page load performance

## 🌐 SEO

### Meta Tags
- Comprehensive meta descriptions
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Structured Data
- Organization schema
- Contact information
- Social media links
- Business details

### Technical SEO
- Semantic HTML5 structure
- Proper heading hierarchy
- Alt text for images
- Mobile-friendly design

## 🧪 Testing

### Manual Testing
- Cross-browser compatibility
- Mobile device testing
- Accessibility testing
- Performance testing

### Automated Testing
- Build system validation
- Asset optimization verification
- Performance monitoring
- Error detection

## 📈 Performance Metrics

### Lighthouse Scores
- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >90
- **SEO**: >90

### Real User Metrics
- Page load times
- User interaction delays
- Error rates
- Conversion tracking

## 🚀 Deployment

### Production Checklist
- [ ] Run production build
- [ ] Test all functionality
- [ ] Verify performance metrics
- [ ] Check accessibility compliance
- [ ] Validate SEO implementation
- [ ] Test on multiple devices

### Hosting Recommendations
- CDN for static assets
- HTTPS configuration
- Gzip compression
- Browser caching
- Security headers

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@casa-petrada.com
- Website: https://casa-petrada.com
- GitHub Issues: https://github.com/casa-petrada/website/issues

---

**Casa-Petrada** - Premium handcrafted jewelry with modern web technology.