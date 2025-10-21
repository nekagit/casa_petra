# Design Tokens Reference

This document provides a comprehensive reference for all design tokens used in the Casa-Petrada design system.

## Table of Contents

- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Breakpoints](#breakpoints)
- [Shadows](#shadows)
- [Borders](#borders)
- [Animations](#animations)

## Colors

### Primary Colors
The primary color palette uses a modern blue scale that provides excellent contrast and accessibility.

```json
{
  "primary": {
    "50": "#eff6ff",   // Lightest blue
    "100": "#dbeafe", 
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "#60a5fa",
    "500": "#3b82f6",  // Main primary color
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a",
    "950": "#172554"   // Darkest blue
  }
}
```

**Usage:**
- `primary-500` - Main brand color for buttons, links, and accents
- `primary-600` - Hover states and active elements
- `primary-50` - Light backgrounds and subtle highlights
- `primary-900` - Dark text on light backgrounds

### Secondary Colors
Complementary teal scale for secondary actions and highlights.

```json
{
  "secondary": {
    "50": "#f0fdfa",   // Lightest teal
    "100": "#ccfbf1",
    "200": "#99f6e4",
    "300": "#5eead4",
    "400": "#2dd4bf",
    "500": "#14b8a6",  // Main secondary color
    "600": "#0d9488",
    "700": "#0f766e",
    "800": "#115e59",
    "900": "#134e4a",
    "950": "#042f2e"   // Darkest teal
  }
}
```

### Neutral Colors
Comprehensive gray scale for text, borders, and backgrounds.

```json
{
  "neutral": {
    "50": "#fafafa",   // Lightest gray
    "100": "#f5f5f5",
    "200": "#e5e5e5",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717",  // Darkest gray
    "950": "#0a0a0a"
  }
}
```

### Semantic Colors
Colors for different states and feedback.

#### Success
```json
{
  "success": {
    "50": "#f0fdf4",
    "500": "#22c55e",  // Main success color
    "900": "#14532d"
  }
}
```

#### Warning
```json
{
  "warning": {
    "50": "#fffbeb",
    "500": "#f59e0b",  // Main warning color
    "900": "#78350f"
  }
}
```

#### Error
```json
{
  "error": {
    "50": "#fef2f2",
    "500": "#ef4444",  // Main error color
    "900": "#7f1d1d"
  }
}
```

#### Info
```json
{
  "info": {
    "50": "#f0f9ff",
    "500": "#0ea5e9",  // Main info color
    "900": "#0c4a6e"
  }
}
```

### Background Colors
```json
{
  "background": {
    "primary": "#ffffff",    // Main background
    "secondary": "#fafafa",  // Secondary background
    "tertiary": "#f5f5f5",   // Tertiary background
    "inverse": "#171717"     // Dark background
  }
}
```

### Text Colors
```json
{
  "text": {
    "primary": "#171717",    // Main text color
    "secondary": "#525252",  // Secondary text
    "tertiary": "#a3a3a3",   // Tertiary text
    "inverse": "#ffffff",    // Light text on dark
    "disabled": "#d4d4d4"    // Disabled text
  }
}
```

## Typography

### Font Families
```json
{
  "fontFamilies": {
    "primary": ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
    "heading": ["Merriweather", "Georgia", "Times New Roman", "serif"],
    "mono": ["JetBrains Mono", "Fira Code", "Monaco", "Consolas", "monospace"]
  }
}
```

### Font Sizes
```json
{
  "fontSizes": {
    "xs": "0.75rem",    // 12px
    "sm": "0.875rem",   // 14px
    "base": "1rem",     // 16px
    "lg": "1.125rem",   // 18px
    "xl": "1.25rem",    // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "3.75rem",   // 60px
    "7xl": "4.5rem",    // 72px
    "8xl": "6rem",      // 96px
    "9xl": "8rem"       // 128px
  }
}
```

### Font Weights
```json
{
  "fontWeights": {
    "thin": "100",
    "extralight": "200",
    "light": "300",
    "normal": "400",
    "medium": "500",
    "semibold": "600",
    "bold": "700",
    "extrabold": "800",
    "black": "900"
  }
}
```

### Line Heights
```json
{
  "lineHeights": {
    "none": "1",
    "tight": "1.25",
    "snug": "1.375",
    "normal": "1.5",
    "relaxed": "1.625",
    "loose": "2"
  }
}
```

### Text Styles
Pre-defined text styles combining font size, weight, line height, and letter spacing.

#### Headings
```json
{
  "h1": {
    "fontSize": "3rem",
    "fontWeight": "700",
    "lineHeight": "1.2",
    "letterSpacing": "-0.025em"
  },
  "h2": {
    "fontSize": "2.25rem",
    "fontWeight": "700",
    "lineHeight": "1.25",
    "letterSpacing": "-0.025em"
  },
  "h3": {
    "fontSize": "1.875rem",
    "fontWeight": "600",
    "lineHeight": "1.3",
    "letterSpacing": "-0.025em"
  }
}
```

#### Body Text
```json
{
  "body": {
    "fontSize": "1rem",
    "fontWeight": "400",
    "lineHeight": "1.6",
    "letterSpacing": "0em"
  },
  "bodyLarge": {
    "fontSize": "1.125rem",
    "fontWeight": "400",
    "lineHeight": "1.6",
    "letterSpacing": "0em"
  },
  "bodySmall": {
    "fontSize": "0.875rem",
    "fontWeight": "400",
    "lineHeight": "1.5",
    "letterSpacing": "0em"
  }
}
```

## Spacing

### Spacing Scale
Based on a 4px base unit with consistent scaling.

```json
{
  "spacing": {
    "0": "0",
    "px": "1px",
    "0.5": "0.125rem",  // 2px
    "1": "0.25rem",     // 4px
    "1.5": "0.375rem",  // 6px
    "2": "0.5rem",      // 8px
    "2.5": "0.625rem",  // 10px
    "3": "0.75rem",     // 12px
    "3.5": "0.875rem",  // 14px
    "4": "1rem",        // 16px
    "5": "1.25rem",     // 20px
    "6": "1.5rem",      // 24px
    "8": "2rem",        // 32px
    "10": "2.5rem",     // 40px
    "12": "3rem",       // 48px
    "16": "4rem",       // 64px
    "20": "5rem",       // 80px
    "24": "6rem",       // 96px
    "32": "8rem",       // 128px
    "40": "10rem",      // 160px
    "48": "12rem",      // 192px
    "56": "14rem",      // 224px
    "64": "16rem",      // 256px
    "72": "18rem",      // 288px
    "80": "20rem",      // 320px
    "96": "24rem"       // 384px
  }
}
```

### Size Scale
Same as spacing but includes additional utility values.

```json
{
  "sizes": {
    "auto": "auto",
    "full": "100%",
    "screen": "100vh",
    "min": "min-content",
    "max": "max-content",
    "fit": "fit-content"
  }
}
```

## Breakpoints

### Breakpoint Scale
Mobile-first responsive breakpoints.

```json
{
  "breakpoints": {
    "xs": "320px",   // Extra small devices
    "sm": "640px",   // Small devices (tablets)
    "md": "768px",   // Medium devices (small laptops)
    "lg": "1024px",  // Large devices (laptops)
    "xl": "1280px",  // Extra large devices (desktops)
    "2xl": "1536px"  // 2X large devices (large desktops)
  }
}
```

### Container Sizes
Maximum widths for containers at different breakpoints.

```json
{
  "container": {
    "xs": "100%",
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1400px"
  }
}
```

### Media Queries
Pre-defined media query strings for responsive design.

```json
{
  "queries": {
    "xs": "(min-width: 320px)",
    "sm": "(min-width: 640px)",
    "md": "(min-width: 768px)",
    "lg": "(min-width: 1024px)",
    "xl": "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
    "xsOnly": "(max-width: 639px)",
    "smOnly": "(min-width: 640px) and (max-width: 767px)",
    "mdOnly": "(min-width: 768px) and (max-width: 1023px)",
    "lgOnly": "(min-width: 1024px) and (max-width: 1279px)",
    "xlOnly": "(min-width: 1280px) and (max-width: 1535px)"
  }
}
```

## Shadows

### Shadow Scale
Elevation system with consistent shadow definitions.

```json
{
  "shadows": {
    "none": "none",
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "base": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "focus": "0 0 0 3px rgb(59 130 246 / 0.5)",
    "focusError": "0 0 0 3px rgb(239 68 68 / 0.5)",
    "focusSuccess": "0 0 0 3px rgb(34 197 94 / 0.5)"
  }
}
```

### Elevation System
Numbered elevation levels for consistent depth.

```json
{
  "elevation": {
    "0": "none",
    "1": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "2": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "3": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "4": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "5": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  }
}
```

## Borders

### Border Radius
Consistent border radius scale.

```json
{
  "radius": {
    "none": "0",
    "sm": "0.125rem",   // 2px
    "base": "0.25rem",  // 4px
    "md": "0.375rem",   // 6px
    "lg": "0.5rem",     // 8px
    "xl": "0.75rem",    // 12px
    "2xl": "1rem",      // 16px
    "3xl": "1.5rem",    // 24px
    "full": "9999px"    // Fully rounded
  }
}
```

### Border Width
```json
{
  "width": {
    "0": "0",
    "1": "1px",
    "2": "2px",
    "4": "4px",
    "8": "8px"
  }
}
```

### Border Styles
```json
{
  "styles": {
    "solid": "solid",
    "dashed": "dashed",
    "dotted": "dotted",
    "double": "double",
    "none": "none"
  }
}
```

## Animations

### Duration Scale
Consistent timing for animations and transitions.

```json
{
  "duration": {
    "75": "75ms",
    "100": "100ms",
    "150": "150ms",
    "200": "200ms",
    "300": "300ms",
    "500": "500ms",
    "700": "700ms",
    "1000": "1000ms"
  }
}
```

### Easing Functions
```json
{
  "easing": {
    "linear": "linear",
    "in": "cubic-bezier(0.4, 0, 1, 1)",
    "out": "cubic-bezier(0, 0, 0.2, 1)",
    "inOut": "cubic-bezier(0.4, 0, 0.2, 1)",
    "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    "elastic": "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
  }
}
```

### Transition Presets
Pre-defined transition combinations.

```json
{
  "transitions": {
    "fast": {
      "duration": "150ms",
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    "normal": {
      "duration": "300ms",
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    "slow": {
      "duration": "500ms",
      "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }
}
```

### Keyframe Animations
Pre-defined keyframe animations.

#### Fade Animations
```json
{
  "fadeIn": {
    "0%": { "opacity": "0" },
    "100%": { "opacity": "1" }
  },
  "fadeOut": {
    "0%": { "opacity": "1" },
    "100%": { "opacity": "0" }
  }
}
```

#### Slide Animations
```json
{
  "slideInUp": {
    "0%": { "transform": "translateY(100%)", "opacity": "0" },
    "100%": { "transform": "translateY(0)", "opacity": "1" }
  },
  "slideInDown": {
    "0%": { "transform": "translateY(-100%)", "opacity": "0" },
    "100%": { "transform": "translateY(0)", "opacity": "1" }
  }
}
```

#### Scale Animations
```json
{
  "scaleIn": {
    "0%": { "transform": "scale(0.9)", "opacity": "0" },
    "100%": { "transform": "scale(1)", "opacity": "1" }
  },
  "scaleOut": {
    "0%": { "transform": "scale(1)", "opacity": "1" },
    "100%": { "transform": "scale(0.9)", "opacity": "0" }
  }
}
```

## Usage Examples

### CSS Custom Properties
All tokens are automatically converted to CSS custom properties:

```css
:root {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --font-size-base: 1rem;
  --spacing-4: 1rem;
  --radius-md: 0.375rem;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### JavaScript API
Access tokens programmatically:

```javascript
import designSystem from './design-system';

// Get a specific token
const primaryColor = designSystem.getToken('colors.primary.500');

// Get all tokens
const allTokens = designSystem.getAllTokens();

// Apply theme to element
designSystem.applyTheme(element, {
  primaryColor: '#3b82f6',
  borderRadius: '0.375rem'
});
```

### Component Classes
Generate component classes:

```javascript
// Generate button classes
const buttonClasses = designSystem.generateComponentClass('buttons', 'primary', 'md');

// Generate responsive classes
const responsiveClasses = designSystem.generateResponsiveClasses('text-lg', 'md');
```

## Best Practices

1. **Consistency**: Always use predefined tokens instead of hardcoded values
2. **Accessibility**: Ensure sufficient color contrast ratios (4.5:1 for normal text, 3:1 for large text)
3. **Responsive**: Use breakpoint tokens for responsive design
4. **Performance**: Prefer CSS custom properties for dynamic theming
5. **Maintainability**: Update tokens in the JSON files rather than individual CSS files
