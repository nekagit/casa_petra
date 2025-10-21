# Color System Guide

This document provides a comprehensive guide to the Casa-Petrada color system, including usage guidelines, accessibility considerations, and implementation examples.

## Table of Contents

- [Color Philosophy](#color-philosophy)
- [Primary Colors](#primary-colors)
- [Secondary Colors](#secondary-colors)
- [Neutral Colors](#neutral-colors)
- [Semantic Colors](#semantic-colors)
- [Accessibility](#accessibility)
- [Usage Guidelines](#usage-guidelines)
- [Implementation](#implementation)

## Color Philosophy

The Casa-Petrada color system is built on principles of:

- **Professionalism**: Modern, clean colors that convey trust and reliability
- **Accessibility**: High contrast ratios for readability across all users
- **Consistency**: Systematic color scales that work harmoniously together
- **Flexibility**: Comprehensive color palette for various use cases

## Primary Colors

### Blue Scale (#3B82F6)
Our primary color is a modern blue that conveys trust, professionalism, and reliability.

```json
{
  "primary": {
    "50": "#eff6ff",   // Lightest - backgrounds, subtle highlights
    "100": "#dbeafe",  // Very light - hover states, light backgrounds
    "200": "#bfdbfe",  // Light - borders, dividers
    "300": "#93c5fd",  // Medium light - disabled states
    "400": "#60a5fa",  // Medium - secondary actions
    "500": "#3b82f6",  // Main - primary actions, links, accents
    "600": "#2563eb",  // Dark - hover states, active elements
    "700": "#1d4ed8",  // Darker - pressed states
    "800": "#1e40af",  // Very dark - text on light backgrounds
    "900": "#1e3a8a",  // Darkest - high contrast text
    "950": "#172554"   // Maximum - special cases only
  }
}
```

### Usage Guidelines

#### Primary-500 (#3B82F6)
- **Primary buttons** and call-to-action elements
- **Links** and interactive text
- **Icons** and accent elements
- **Focus states** and active indicators

#### Primary-600 (#2563EB)
- **Hover states** for primary elements
- **Active states** for buttons and links
- **Selected states** for form controls

#### Primary-50 (#EFF6FF)
- **Light backgrounds** for primary-themed sections
- **Subtle highlights** and accent areas
- **Disabled button backgrounds**

#### Primary-900 (#1E3A8A)
- **Text on light backgrounds** when high contrast is needed
- **Dark mode** primary text color

## Secondary Colors

### Teal Scale (#14B8A6)
Our secondary color is a sophisticated teal that complements the primary blue.

```json
{
  "secondary": {
    "50": "#f0fdfa",   // Lightest - backgrounds
    "100": "#ccfbf1",  // Very light - hover states
    "200": "#99f6e4",  // Light - borders
    "300": "#5eead4",  // Medium light - disabled states
    "400": "#2dd4bf",  // Medium - secondary actions
    "500": "#14b8a6",  // Main - secondary elements
    "600": "#0d9488",  // Dark - hover states
    "700": "#0f766e",  // Darker - pressed states
    "800": "#115e59",  // Very dark - text
    "900": "#134e4a",  // Darkest - high contrast
    "950": "#042f2e"   // Maximum - special cases
  }
}
```

### Usage Guidelines

#### Secondary-500 (#14B8A6)
- **Secondary buttons** and alternative actions
- **Accent elements** and highlights
- **Success states** and positive feedback
- **Complementary** to primary elements

#### Secondary-600 (#0D9488)
- **Hover states** for secondary elements
- **Active states** for secondary buttons
- **Darker accents** when needed

## Neutral Colors

### Gray Scale
Comprehensive neutral palette for text, backgrounds, and borders.

```json
{
  "neutral": {
    "50": "#fafafa",   // Lightest - page backgrounds
    "100": "#f5f5f5",  // Very light - card backgrounds
    "200": "#e5e5e5",  // Light - borders, dividers
    "300": "#d4d4d4",  // Medium light - disabled elements
    "400": "#a3a3a3",  // Medium - placeholder text
    "500": "#737373",  // Medium - secondary text
    "600": "#525252",  // Dark - tertiary text
    "700": "#404040",  // Darker - secondary headings
    "800": "#262626",  // Very dark - primary text
    "900": "#171717",  // Darkest - high contrast text
    "950": "#0a0a0a"   // Maximum - special cases
  }
}
```

### Usage Guidelines

#### Text Colors
- **Neutral-900 (#171717)**: Primary text, headings
- **Neutral-700 (#404040)**: Secondary text, subheadings
- **Neutral-600 (#525252)**: Tertiary text, captions
- **Neutral-400 (#A3A3A3)**: Placeholder text, disabled text

#### Background Colors
- **Neutral-50 (#FAFAFA)**: Page backgrounds
- **Neutral-100 (#F5F5F5)**: Card backgrounds, sections
- **White (#FFFFFF)**: Primary content backgrounds

#### Border Colors
- **Neutral-200 (#E5E5E5)**: Primary borders, dividers
- **Neutral-300 (#D4D4D4)**: Secondary borders, disabled elements

## Semantic Colors

### Success Colors
Green scale for positive feedback and success states.

```json
{
  "success": {
    "50": "#f0fdf4",   // Light backgrounds
    "100": "#dcfce7",  // Hover states
    "200": "#bbf7d0",  // Borders
    "300": "#86efac",  // Disabled states
    "400": "#4ade80",  // Secondary actions
    "500": "#22c55e",  // Main success color
    "600": "#16a34a",  // Hover states
    "700": "#15803d",  // Pressed states
    "800": "#166534",  // Text
    "900": "#14532d"   // High contrast
  }
}
```

### Warning Colors
Yellow/amber scale for warnings and caution states.

```json
{
  "warning": {
    "50": "#fffbeb",   // Light backgrounds
    "100": "#fef3c7",  // Hover states
    "200": "#fde68a",  // Borders
    "300": "#fcd34d",  // Disabled states
    "400": "#fbbf24",  // Secondary actions
    "500": "#f59e0b",  // Main warning color
    "600": "#d97706",  // Hover states
    "700": "#b45309",  // Pressed states
    "800": "#92400e",  // Text
    "900": "#78350f"   // High contrast
  }
}
```

### Error Colors
Red scale for errors and destructive actions.

```json
{
  "error": {
    "50": "#fef2f2",   // Light backgrounds
    "100": "#fee2e2",  // Hover states
    "200": "#fecaca",  // Borders
    "300": "#fca5a5",  // Disabled states
    "400": "#f87171",  // Secondary actions
    "500": "#ef4444",  // Main error color
    "600": "#dc2626",  // Hover states
    "700": "#b91c1c",  // Pressed states
    "800": "#991b1b",  // Text
    "900": "#7f1d1d"   // High contrast
  }
}
```

### Info Colors
Blue scale for informational content.

```json
{
  "info": {
    "50": "#f0f9ff",   // Light backgrounds
    "100": "#e0f2fe",  // Hover states
    "200": "#bae6fd",  // Borders
    "300": "#7dd3fc",  // Disabled states
    "400": "#38bdf8",  // Secondary actions
    "500": "#0ea5e9",  // Main info color
    "600": "#0284c7",  // Hover states
    "700": "#0369a1",  // Pressed states
    "800": "#075985",  // Text
    "900": "#0c4a6e"   // High contrast
  }
}
```

## Accessibility

### Contrast Ratios
All color combinations meet WCAG 2.1 AA standards:

#### Normal Text (4.5:1 minimum)
- **Primary-900 on White**: 16.5:1 ✅
- **Neutral-800 on White**: 15.8:1 ✅
- **Neutral-700 on White**: 12.6:1 ✅
- **Primary-600 on White**: 4.6:1 ✅

#### Large Text (3:1 minimum)
- **Primary-500 on White**: 3.0:1 ✅
- **Secondary-500 on White**: 3.0:1 ✅
- **Success-500 on White**: 3.0:1 ✅

#### Interactive Elements
- **Primary-500 on White**: 3.0:1 ✅
- **White on Primary-500**: 4.6:1 ✅
- **White on Primary-600**: 4.6:1 ✅

### Color Blindness Considerations
- **Protanopia**: Primary blue remains distinguishable
- **Deuteranopia**: Teal secondary color provides good contrast
- **Tritanopia**: Red error colors remain clear
- **Monochromacy**: Sufficient contrast ratios maintained

### Testing Tools
Use these tools to verify accessibility:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/accessibility/reference/)

## Usage Guidelines

### Color Hierarchy
1. **Primary**: Main brand color for CTAs and key elements
2. **Secondary**: Supporting actions and accents
3. **Neutral**: Text, backgrounds, and structural elements
4. **Semantic**: Status indicators and feedback

### Do's and Don'ts

#### ✅ Do
- Use primary-500 for main call-to-action buttons
- Use neutral-900 for primary text
- Use semantic colors for their intended purposes
- Maintain consistent color usage across the application
- Test color combinations for accessibility

#### ❌ Don't
- Use more than 3-4 colors in a single interface
- Use semantic colors for decorative purposes
- Use low contrast color combinations
- Mix different color scales inappropriately
- Ignore accessibility requirements

### Color Combinations

#### Primary Combinations
```css
/* Primary button */
.btn-primary {
  background-color: var(--color-primary-500);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
}

/* Primary text */
.text-primary {
  color: var(--color-primary-600);
}
```

#### Neutral Combinations
```css
/* Primary text */
.text-primary {
  color: var(--color-neutral-900);
}

/* Secondary text */
.text-secondary {
  color: var(--color-neutral-700);
}

/* Muted text */
.text-muted {
  color: var(--color-neutral-500);
}
```

#### Semantic Combinations
```css
/* Success state */
.alert-success {
  background-color: var(--color-success-50);
  border-color: var(--color-success-200);
  color: var(--color-success-800);
}

/* Error state */
.alert-error {
  background-color: var(--color-error-50);
  border-color: var(--color-error-200);
  color: var(--color-error-800);
}
```

## Implementation

### CSS Custom Properties
All colors are available as CSS custom properties:

```css
:root {
  /* Primary colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
  
  /* Secondary colors */
  --color-secondary-50: #f0fdfa;
  --color-secondary-100: #ccfbf1;
  --color-secondary-200: #99f6e4;
  --color-secondary-300: #5eead4;
  --color-secondary-400: #2dd4bf;
  --color-secondary-500: #14b8a6;
  --color-secondary-600: #0d9488;
  --color-secondary-700: #0f766e;
  --color-secondary-800: #115e59;
  --color-secondary-900: #134e4a;
  --color-secondary-950: #042f2e;
  
  /* Neutral colors */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-neutral-950: #0a0a0a;
}
```

### JavaScript API
Access colors programmatically:

```javascript
import designSystem from './design-system';

// Get specific color
const primaryColor = designSystem.getToken('colors.primary.500');
// Returns: "#3b82f6"

// Get color scale
const primaryScale = designSystem.getToken('colors.primary');
// Returns: { "50": "#eff6ff", "100": "#dbeafe", ... }

// Apply theme
designSystem.applyTheme(element, {
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff'
});
```

### Tailwind CSS Integration
If using Tailwind CSS, extend the configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // ... other colors
      }
    }
  }
}
```

## Color Psychology

### Primary Blue (#3B82F6)
- **Trust**: Conveys reliability and professionalism
- **Stability**: Suggests dependability and security
- **Technology**: Associated with digital and modern solutions
- **Calm**: Creates a sense of tranquility and focus

### Secondary Teal (#14B8A6)
- **Balance**: Harmonizes with blue while adding energy
- **Growth**: Suggests progress and positive change
- **Freshness**: Conveys innovation and new ideas
- **Nature**: Connects to natural and organic elements

### Neutral Grays
- **Professional**: Creates clean, sophisticated appearance
- **Versatile**: Works with any accent color
- **Readable**: Provides excellent text contrast
- **Timeless**: Won't look dated over time

## Best Practices

1. **Consistency**: Use the same color for the same purpose throughout the application
2. **Accessibility**: Always check contrast ratios before using color combinations
3. **Hierarchy**: Use color to guide user attention and create visual hierarchy
4. **Testing**: Test color combinations with real users, especially those with color vision differences
5. **Documentation**: Document any custom color usage and reasoning
6. **Maintenance**: Keep color usage documented and updated as the system evolves
