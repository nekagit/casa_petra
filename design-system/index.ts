/**
 * Casa-Petrada Design System Orchestrator
 * Runtime configuration loader and helper functions
 */

import type { 
  DesignSystem, 
  DesignTokens, 
  ComponentConfigs, 
  LayoutConfigs, 
  UtilityConfigs,
  DesignSystemAPI 
} from './types';

class DesignSystemOrchestrator implements DesignSystemAPI {
  private configs: DesignSystem | null = null;
  private isLoaded = false;
  private hotReloadListeners: (() => void)[] = [];

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the design system by loading all configurations
   */
  private async initialize(): Promise<void> {
    try {
      await this.loadAllConfigs();
      this.isLoaded = true;
      this.generateCSS();
      console.log('🎨 Design System loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load design system:', error);
    }
  }

  /**
   * Load all configuration files
   */
  private async loadAllConfigs(): Promise<void> {
    const [tokens, components, layouts, utilities] = await Promise.all([
      this.loadTokens(),
      this.loadComponents(),
      this.loadLayouts(),
      this.loadUtilities()
    ]);

    this.configs = {
      tokens,
      components,
      layouts,
      utilities
    };
  }

  /**
   * Load all token configurations
   */
  private async loadTokens(): Promise<DesignTokens> {
    const [colors, typography, spacing, breakpoints, shadows, borders, animations] = await Promise.all([
      this.loadConfig('tokens/colors.json'),
      this.loadConfig('tokens/typography.json'),
      this.loadConfig('tokens/spacing.json'),
      this.loadConfig('tokens/breakpoints.json'),
      this.loadConfig('tokens/shadows.json'),
      this.loadConfig('tokens/borders.json'),
      this.loadConfig('tokens/animations.json')
    ]);

    return {
      colors,
      typography,
      spacing,
      breakpoints,
      shadows,
      borders,
      animations
    };
  }

  /**
   * Load all component configurations
   */
  private async loadComponents(): Promise<ComponentConfigs> {
    const [buttons, forms, cards, modals, navigation, products] = await Promise.all([
      this.loadConfig('components/buttons.json'),
      this.loadConfig('components/forms.json'),
      this.loadConfig('components/cards.json'),
      this.loadConfig('components/modals.json'),
      this.loadConfig('components/navigation.json'),
      this.loadConfig('components/products.json')
    ]);

    return {
      buttons,
      forms,
      cards,
      modals,
      navigation,
      products
    };
  }

  /**
   * Load all layout configurations
   */
  private async loadLayouts(): Promise<LayoutConfigs> {
    const [grid, containers] = await Promise.all([
      this.loadConfig('layouts/grid.json'),
      this.loadConfig('layouts/containers.json')
    ]);

    return {
      grid,
      containers
    };
  }

  /**
   * Load all utility configurations
   */
  private async loadUtilities(): Promise<UtilityConfigs> {
    const [utilityClasses, responsiveHelpers] = await Promise.all([
      this.loadConfig('utilities/utility-classes.json'),
      this.loadConfig('utilities/responsive-helpers.json')
    ]);

    return {
      utilityClasses,
      responsiveHelpers
    };
  }

  /**
   * Load a specific configuration file
   */
  async loadConfig(configName: string): Promise<any> {
    try {
      const response = await fetch(`/design-system/${configName}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${configName}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error loading ${configName}:`, error);
      throw error;
    }
  }

  /**
   * Get a token value by path (e.g., 'colors.primary.500')
   */
  getToken(path: string): any {
    if (!this.configs) {
      console.warn('Design system not loaded yet');
      return null;
    }

    const keys = path.split('.');
    let value = this.configs.tokens as any;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Token not found: ${path}`);
        return null;
      }
    }

    return value;
  }

  /**
   * Get a component configuration by name
   */
  getComponent(name: string): any {
    if (!this.configs) {
      console.warn('Design system not loaded yet');
      return null;
    }

    const component = this.configs.components[name as keyof ComponentConfigs];
    if (!component) {
      console.warn(`Component not found: ${name}`);
      return null;
    }

    return component;
  }

  /**
   * Apply theme tokens to an element
   */
  applyTheme(element: HTMLElement, tokens: object): void {
    if (!element || typeof tokens !== 'object') {
      console.warn('Invalid element or tokens provided');
      return;
    }

    const style = element.style;
    const flattenedTokens = this.flattenObject(tokens);

    Object.entries(flattenedTokens).forEach(([key, value]) => {
      const cssProperty = this.kebabCase(key);
      style.setProperty(`--${cssProperty}`, value as string);
    });
  }

  /**
   * Get responsive value for a specific breakpoint
   */
  getResponsiveValue(breakpoint: string, token: string): any {
    if (!this.configs) {
      console.warn('Design system not loaded yet');
      return null;
    }

    const breakpoints = this.configs.tokens.breakpoints.breakpoints;
    if (!(breakpoint in breakpoints)) {
      console.warn(`Breakpoint not found: ${breakpoint}`);
      return null;
    }

    // For now, return the token value
    // In a more sophisticated implementation, this would handle responsive values
    return this.getToken(token);
  }

  /**
   * Generate utility class string
   */
  generateUtilityClass(utility: string, value: string): string {
    if (!this.configs) {
      console.warn('Design system not loaded yet');
      return '';
    }

    const utilityConfig = this.configs.utilities.utilityClasses[utility as keyof typeof this.configs.utilities.utilityClasses];
    if (!utilityConfig) {
      console.warn(`Utility not found: ${utility}`);
      return '';
    }

    if (typeof utilityConfig === 'object' && value in utilityConfig) {
      return (utilityConfig as any)[value];
    }

    return '';
  }

  /**
   * Validate token usage
   */
  validateToken(path: string, value: any): boolean {
    const tokenValue = this.getToken(path);
    return tokenValue !== null && tokenValue === value;
  }

  /**
   * Generate CSS custom properties from tokens
   */
  generateCSS(): string {
    if (!this.configs) {
      return '';
    }

    const tokens = this.configs.tokens;
    const cssVariables: string[] = [];

    // Generate color variables
    this.generateColorVariables(tokens.colors, cssVariables);
    
    // Generate typography variables
    this.generateTypographyVariables(tokens.typography, cssVariables);
    
    // Generate spacing variables
    this.generateSpacingVariables(tokens.spacing, cssVariables);
    
    // Generate other token variables
    this.generateOtherVariables(tokens, cssVariables);

    return `:root {\n${cssVariables.join('\n')}\n}`;
  }

  /**
   * Generate color CSS variables
   */
  private generateColorVariables(colors: any, cssVariables: string[]): void {
    const colorEntries = Object.entries(colors);
    
    colorEntries.forEach(([category, value]) => {
      if (typeof value === 'object' && value !== null) {
        if (category === 'semantic') {
          Object.entries(value).forEach(([semanticType, semanticValue]) => {
            if (typeof semanticValue === 'object' && semanticValue !== null) {
              Object.entries(semanticValue).forEach(([shade, colorValue]) => {
                cssVariables.push(`  --color-${semanticType}-${shade}: ${colorValue};`);
              });
            }
          });
        } else if (category === 'primary' || category === 'secondary' || category === 'neutral') {
          Object.entries(value).forEach(([shade, colorValue]) => {
            cssVariables.push(`  --color-${category}-${shade}: ${colorValue};`);
          });
        } else {
          Object.entries(value).forEach(([key, colorValue]) => {
            cssVariables.push(`  --color-${category}-${key}: ${colorValue};`);
          });
        }
      }
    });
  }

  /**
   * Generate typography CSS variables
   */
  private generateTypographyVariables(typography: any, cssVariables: string[]): void {
    // Font families
    Object.entries(typography.fontFamilies).forEach(([key, value]) => {
      cssVariables.push(`  --font-family-${key}: ${Array.isArray(value) ? value.join(', ') : value};`);
    });

    // Font sizes
    Object.entries(typography.fontSizes).forEach(([key, value]) => {
      cssVariables.push(`  --font-size-${key}: ${value};`);
    });

    // Font weights
    Object.entries(typography.fontWeights).forEach(([key, value]) => {
      cssVariables.push(`  --font-weight-${key}: ${value};`);
    });

    // Line heights
    Object.entries(typography.lineHeights).forEach(([key, value]) => {
      cssVariables.push(`  --line-height-${key}: ${value};`);
    });

    // Letter spacing
    Object.entries(typography.letterSpacing).forEach(([key, value]) => {
      cssVariables.push(`  --letter-spacing-${key}: ${value};`);
    });
  }

  /**
   * Generate spacing CSS variables
   */
  private generateSpacingVariables(spacing: any, cssVariables: string[]): void {
    Object.entries(spacing.spacing).forEach(([key, value]) => {
      cssVariables.push(`  --spacing-${key}: ${value};`);
    });

    Object.entries(spacing.sizes).forEach(([key, value]) => {
      cssVariables.push(`  --size-${key}: ${value};`);
    });
  }

  /**
   * Generate other token CSS variables
   */
  private generateOtherVariables(tokens: any, cssVariables: string[]): void {
    // Breakpoints
    Object.entries(tokens.breakpoints.breakpoints).forEach(([key, value]) => {
      cssVariables.push(`  --breakpoint-${key}: ${value};`);
    });

    // Shadows
    Object.entries(tokens.shadows.shadows).forEach(([key, value]) => {
      cssVariables.push(`  --shadow-${key}: ${value};`);
    });

    // Border radius
    Object.entries(tokens.borders.radius).forEach(([key, value]) => {
      cssVariables.push(`  --radius-${key}: ${value};`);
    });

    // Border width
    Object.entries(tokens.borders.width).forEach(([key, value]) => {
      cssVariables.push(`  --border-width-${key}: ${value};`);
    });

    // Animation duration
    Object.entries(tokens.animations.duration).forEach(([key, value]) => {
      cssVariables.push(`  --duration-${key}: ${value};`);
    });

    // Animation easing
    Object.entries(tokens.animations.easing).forEach(([key, value]) => {
      cssVariables.push(`  --easing-${key}: ${value};`);
    });
  }

  /**
   * Hot reload functionality for development
   */
  hotReload(): void {
    this.initialize().then(() => {
      this.hotReloadListeners.forEach(listener => listener());
      console.log('🔄 Design system reloaded');
    });
  }

  /**
   * Add hot reload listener
   */
  addHotReloadListener(listener: () => void): void {
    this.hotReloadListeners.push(listener);
  }

  /**
   * Remove hot reload listener
   */
  removeHotReloadListener(listener: () => void): void {
    const index = this.hotReloadListeners.indexOf(listener);
    if (index > -1) {
      this.hotReloadListeners.splice(index, 1);
    }
  }

  /**
   * Get the current design system configuration
   */
  getConfig(): DesignSystem | null {
    return this.configs;
  }

  /**
   * Check if design system is loaded
   */
  isDesignSystemLoaded(): boolean {
    return this.isLoaded;
  }

  /**
   * Utility: Flatten nested object
   */
  private flattenObject(obj: any, prefix = ''): Record<string, any> {
    const flattened: Record<string, any> = {};
    
    Object.keys(obj).forEach(key => {
      const newKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(flattened, this.flattenObject(obj[key], newKey));
      } else {
        flattened[newKey] = obj[key];
      }
    });
    
    return flattened;
  }

  /**
   * Utility: Convert camelCase to kebab-case
   */
  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Generate component class string
   */
  generateComponentClass(componentName: string, variant?: string, size?: string): string {
    const component = this.getComponent(componentName);
    if (!component) return '';

    let classes = '';

    // Add base classes
    if (component.base) {
      classes += component.base + ' ';
    }

    // Add variant classes
    if (variant && component.variants && component.variants[variant]) {
      const variantConfig = component.variants[variant];
      if (typeof variantConfig === 'object') {
        Object.values(variantConfig).forEach((value: any) => {
          if (typeof value === 'string') {
            classes += value + ' ';
          }
        });
      } else if (typeof variantConfig === 'string') {
        classes += variantConfig + ' ';
      }
    }

    // Add size classes
    if (size && component.sizes && component.sizes[size]) {
      const sizeConfig = component.sizes[size];
      if (typeof sizeConfig === 'object') {
        Object.values(sizeConfig).forEach((value: any) => {
          if (typeof value === 'string') {
            classes += value + ' ';
          }
        });
      } else if (typeof sizeConfig === 'string') {
        classes += sizeConfig + ' ';
      }
    }

    return classes.trim();
  }

  /**
   * Generate responsive classes
   */
  generateResponsiveClasses(baseClasses: string, breakpoint: string): string {
    const breakpointPrefix = this.getToken(`breakpoints.breakpoints.${breakpoint}`);
    if (!breakpointPrefix) return baseClasses;

    return baseClasses.split(' ').map(cls => `${breakpointPrefix}:${cls}`).join(' ');
  }

  /**
   * Get all available tokens
   */
  getAllTokens(): Record<string, any> {
    if (!this.configs) return {};
    return this.configs.tokens as any;
  }

  /**
   * Get all available components
   */
  getAllComponents(): Record<string, any> {
    if (!this.configs) return {};
    return this.configs.components as any;
  }

  /**
   * Get all available utilities
   */
  getAllUtilities(): Record<string, any> {
    if (!this.configs) return {};
    return this.configs.utilities as any;
  }
}

// Create and export the design system instance
const designSystem = new DesignSystemOrchestrator();

// Export the instance and types
export default designSystem;
export { DesignSystemOrchestrator };
export * from './types';

// Global access for browser usage
if (typeof window !== 'undefined') {
  (window as any).DesignSystem = designSystem;
}

// Development hot reload
if (process.env.NODE_ENV === 'development') {
  // Listen for file changes in development
  const eventSource = new EventSource('/design-system/hot-reload');
  eventSource.onmessage = () => {
    designSystem.hotReload();
  };
}
