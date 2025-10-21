// TypeScript type definitions for the design system

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  breakpoints: BreakpointTokens;
  shadows: ShadowTokens;
  borders: BorderTokens;
  animations: AnimationTokens;
}

export interface ColorTokens {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  semantic: {
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    disabled: string;
  };
  border: {
    primary: string;
    secondary: string;
    tertiary: string;
    focus: string;
    error: string;
  };
  legacy: {
    gold: string;
    brown: string;
    dark: string;
    light: string;
  };
}

export interface ColorScale {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '950'?: string;
}

export interface TypographyTokens {
  fontFamilies: {
    primary: string[];
    heading: string[];
    mono: string[];
  };
  fontSizes: FontSizeScale;
  fontWeights: FontWeightScale;
  lineHeights: LineHeightScale;
  letterSpacing: LetterSpacingScale;
  textStyles: TextStyleDefinitions;
}

export interface FontSizeScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  '9xl': string;
}

export interface FontWeightScale {
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
}

export interface LineHeightScale {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

export interface LetterSpacingScale {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

export interface TextStyleDefinitions {
  display: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  body: TextStyle;
  bodyLarge: TextStyle;
  bodySmall: TextStyle;
  caption: TextStyle;
  button: TextStyle;
  buttonLarge: TextStyle;
}

export interface TextStyle {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface SpacingTokens {
  spacing: SpacingScale;
  sizes: SpacingScale;
}

export interface SpacingScale {
  '0': string;
  px: string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '96': string;
  auto?: string;
  full?: string;
  screen?: string;
  min?: string;
  max?: string;
  fit?: string;
}

export interface BreakpointTokens {
  breakpoints: BreakpointScale;
  container: ContainerScale;
  queries: MediaQueries;
}

export interface BreakpointScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ContainerScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface MediaQueries {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  xsOnly: string;
  smOnly: string;
  mdOnly: string;
  lgOnly: string;
  xlOnly: string;
}

export interface ShadowTokens {
  shadows: ShadowScale;
  elevation: ElevationScale;
}

export interface ShadowScale {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  focus: string;
  focusError: string;
  focusSuccess: string;
}

export interface ElevationScale {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
}

export interface BorderTokens {
  radius: RadiusScale;
  width: WidthScale;
  styles: StyleScale;
}

export interface RadiusScale {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface WidthScale {
  '0': string;
  '1': string;
  '2': string;
  '4': string;
  '8': string;
}

export interface StyleScale {
  solid: string;
  dashed: string;
  dotted: string;
  double: string;
  none: string;
}

export interface AnimationTokens {
  duration: DurationScale;
  easing: EasingScale;
  transitions: TransitionDefinitions;
  keyframes: KeyframeDefinitions;
}

export interface DurationScale {
  '75': string;
  '100': string;
  '150': string;
  '200': string;
  '300': string;
  '500': string;
  '700': string;
  '1000': string;
}

export interface EasingScale {
  linear: string;
  in: string;
  out: string;
  inOut: string;
  bounce: string;
  elastic: string;
}

export interface TransitionDefinitions {
  fast: Transition;
  normal: Transition;
  slow: Transition;
}

export interface Transition {
  duration: string;
  easing: string;
}

export interface KeyframeDefinitions {
  fadeIn: Keyframe;
  fadeOut: Keyframe;
  slideInUp: Keyframe;
  slideInDown: Keyframe;
  slideInLeft: Keyframe;
  slideInRight: Keyframe;
  scaleIn: Keyframe;
  scaleOut: Keyframe;
  bounce: Keyframe;
  pulse: Keyframe;
  spin: Keyframe;
}

export interface Keyframe {
  [key: string]: string;
}

// Component Configuration Types
export interface ComponentConfigs {
  buttons: ButtonConfig;
  forms: FormConfig;
  cards: CardConfig;
  modals: ModalConfig;
  navigation: NavigationConfig;
  products: ProductConfig;
}

export interface ButtonConfig {
  variants: ButtonVariants;
  sizes: ButtonSizes;
  fullWidth: { base: string };
  iconOnly: IconOnlySizes;
  loading: LoadingConfig;
}

export interface ButtonVariants {
  primary: ButtonVariant;
  secondary: ButtonVariant;
  outline: ButtonVariant;
  ghost: ButtonVariant;
  danger: ButtonVariant;
}

export interface ButtonVariant {
  base: string;
  hover: string;
  active: string;
  focus: string;
  disabled: string;
}

export interface ButtonSizes {
  xs: ButtonSize;
  sm: ButtonSize;
  md: ButtonSize;
  lg: ButtonSize;
  xl: ButtonSize;
}

export interface ButtonSize {
  padding: string;
  fontSize: string;
  height: string;
}

export interface IconOnlySizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface LoadingConfig {
  base: string;
  spinner: string;
  text: string;
}

export interface FormConfig {
  input: InputConfig;
  textarea: TextareaConfig;
  select: SelectConfig;
  checkbox: CheckboxConfig;
  radio: RadioConfig;
  label: LabelConfig;
  helpText: HelpTextConfig;
  errorMessage: ErrorMessageConfig;
  fieldset: FieldsetConfig;
  formGroup: FormGroupConfig;
}

export interface InputConfig {
  base: string;
  sizes: SizeConfig;
  states: StateConfig;
}

export interface TextareaConfig {
  base: string;
  sizes: TextareaSizeConfig;
}

export interface SelectConfig {
  base: string;
  sizes: SizeConfig;
}

export interface CheckboxConfig {
  base: string;
  label: string;
  disabled: string;
}

export interface RadioConfig {
  base: string;
  label: string;
  disabled: string;
}

export interface LabelConfig {
  base: string;
  required: string;
  optional: string;
}

export interface HelpTextConfig {
  base: string;
  neutral: string;
  error: string;
  success: string;
}

export interface ErrorMessageConfig {
  base: string;
  icon: string;
}

export interface FieldsetConfig {
  base: string;
  legend: string;
}

export interface FormGroupConfig {
  base: string;
  inline: string;
  stacked: string;
}

export interface SizeConfig {
  sm: string;
  md: string;
  lg: string;
}

export interface TextareaSizeConfig {
  sm: string;
  md: string;
  lg: string;
}

export interface StateConfig {
  error: string;
  success: string;
  disabled: string;
}

export interface CardConfig {
  base: CardBase;
  variants: CardVariants;
  sizes: CardSizes;
  header: CardHeader;
  body: CardBody;
  footer: CardFooter;
  product: ProductCardConfig;
  category: CategoryCardConfig;
}

export interface CardBase {
  card: string;
  hover: string;
  focus: string;
}

export interface CardVariants {
  default: string;
  elevated: string;
  outlined: string;
  filled: string;
  bordered: string;
}

export interface CardSizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface CardHeader {
  base: string;
  title: string;
  subtitle: string;
}

export interface CardBody {
  base: string;
  title: string;
  content: string;
}

export interface CardFooter {
  base: string;
  actions: string;
}

export interface ProductCardConfig {
  base: string;
  hover: string;
  image: ImageConfig;
  badge: BadgeConfig;
  actions: ActionsConfig;
  content: ProductContentConfig;
}

export interface CategoryCardConfig {
  base: string;
  hover: string;
  image: ImageConfig;
  overlay: string;
  content: CategoryContentConfig;
}

export interface ImageConfig {
  container: string;
  img: string;
}

export interface BadgeConfig {
  base: string;
  sale: string;
  new: string;
  featured: string;
}

export interface ActionsConfig {
  container: string;
  button: string;
}

export interface ProductContentConfig {
  container: string;
  title: string;
  price: PriceConfig;
  rating: RatingConfig;
}

export interface CategoryContentConfig {
  container: string;
  title: string;
}

export interface PriceConfig {
  container: string;
  current: string;
  original: string;
}

export interface RatingConfig {
  container: string;
  stars: string;
  count: string;
}

export interface ModalConfig {
  overlay: OverlayConfig;
  modal: ModalSizes;
  header: HeaderConfig;
  body: BodyConfig;
  footer: FooterConfig;
  closeButton: CloseButtonConfig;
  backdrop: BackdropConfig;
  animations: AnimationConfig;
  newsletter: NewsletterModalConfig;
}

export interface OverlayConfig {
  base: string;
  backdrop: string;
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
}

export interface ModalSizes {
  base: string;
  sizes: SizeScale;
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
}

export interface SizeScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  full: string;
}

export interface HeaderConfig {
  base: string;
  title: string;
  subtitle: string;
  closeButton: string;
}

export interface BodyConfig {
  base: string;
  scrollable: string;
}

export interface FooterConfig {
  base: string;
  left: string;
  center: string;
  right: string;
}

export interface CloseButtonConfig {
  base: string;
  icon: string;
}

export interface BackdropConfig {
  clickable: string;
  nonClickable: string;
}

export interface AnimationConfig {
  fade: FadeAnimation;
  slide: SlideAnimation;
}

export interface FadeAnimation {
  enter: string;
  enterFrom: string;
  enterTo: string;
  exit: string;
  exitFrom: string;
  exitTo: string;
}

export interface SlideAnimation {
  enter: string;
  enterFrom: string;
  enterTo: string;
  exit: string;
  exitFrom: string;
  exitTo: string;
}

export interface NewsletterModalConfig {
  modal: string;
  header: NewsletterHeaderConfig;
  body: NewsletterBodyConfig;
  form: NewsletterFormConfig;
  attribution: AttributionConfig;
}

export interface NewsletterHeaderConfig {
  base: string;
  title: string;
  subtitle: string;
}

export interface NewsletterBodyConfig {
  base: string;
  description: string;
}

export interface NewsletterFormConfig {
  base: string;
  input: string;
  button: string;
  decline: string;
}

export interface AttributionConfig {
  base: string;
  text: string;
  link: string;
}

export interface NavigationConfig {
  header: HeaderNavigationConfig;
  logo: LogoConfig;
  nav: NavigationNavConfig;
  actions: ActionsConfig;
  breadcrumb: BreadcrumbConfig;
  pagination: PaginationConfig;
  tabs: TabsConfig;
  sidebar: SidebarConfig;
}

export interface HeaderNavigationConfig {
  base: string;
  container: string;
  content: string;
}

export interface LogoConfig {
  container: string;
  icon: string;
  text: string;
  tagline: string;
}

export interface NavigationNavConfig {
  desktop: DesktopNavConfig;
  mobile: MobileNavConfig;
}

export interface DesktopNavConfig {
  base: string;
  link: string;
  active: string;
  activeIndicator: string;
}

export interface MobileNavConfig {
  base: string;
  button: string;
  menu: string;
  menuOpen: string;
  menuClosed: string;
  link: string;
  active: string;
}

export interface BreadcrumbConfig {
  base: string;
  item: string;
  link: string;
  active: string;
  separator: string;
  home: string;
}

export interface PaginationConfig {
  base: string;
  item: string;
  active: string;
  disabled: string;
  prev: string;
  next: string;
}

export interface TabsConfig {
  base: string;
  list: string;
  item: string;
  active: string;
  disabled: string;
}

export interface SidebarConfig {
  base: string;
  open: string;
  closed: string;
  overlay: string;
  header: string;
  title: string;
  closeButton: string;
  nav: string;
  link: string;
  active: string;
}

export interface ProductConfig {
  grid: GridConfig;
  filters: FilterConfig;
  toolbar: ToolbarConfig;
  list: ListConfig;
  pagination: PaginationConfig;
  empty: EmptyConfig;
  loading: LoadingStateConfig;
}

export interface GridConfig {
  base: string;
  cols: ColsConfig;
  gap: GapConfig;
}

export interface ColsConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  auto: string;
  autoSm: string;
  autoMd: string;
  autoLg: string;
}

export interface GapConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface FilterConfig {
  container: string;
  group: string;
  label: string;
  select: string;
  button: string;
}

export interface ToolbarConfig {
  container: string;
  count: string;
  viewToggle: ViewToggleConfig;
  sort: SortConfig;
}

export interface ViewToggleConfig {
  container: string;
  button: string;
  active: string;
}

export interface SortConfig {
  container: string;
  label: string;
  select: string;
}

export interface ListConfig {
  container: string;
  item: string;
  image: ListImageConfig;
  content: ListContentConfig;
  actions: ListActionsConfig;
}

export interface ListImageConfig {
  container: string;
  img: string;
}

export interface ListContentConfig {
  container: string;
  title: string;
  description: string;
  price: string;
}

export interface ListActionsConfig {
  container: string;
  button: string;
}

export interface EmptyConfig {
  container: string;
  icon: string;
  title: string;
  description: string;
  button: string;
}

export interface LoadingStateConfig {
  container: string;
  skeleton: string;
  image: string;
  content: string;
  title: string;
  price: string;
  button: string;
}

// Layout Configuration Types
export interface LayoutConfigs {
  grid: GridLayoutConfig;
  containers: ContainerLayoutConfig;
}

export interface GridLayoutConfig {
  container: ContainerConfig;
  grid: GridSystemConfig;
  flex: FlexConfig;
  spacing: SpacingConfig;
  breakpoints: BreakpointConfig;
}

export interface ContainerConfig {
  base: string;
  sizes: ContainerSizes;
  padding: ContainerPadding;
}

export interface ContainerSizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  full: string;
  screen: string;
  screenSm: string;
  screenMd: string;
  screenLg: string;
  screenXl: string;
  screen2xl: string;
}

export interface ContainerPadding {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface GridSystemConfig {
  base: string;
  cols: GridColsConfig;
  responsive: ResponsiveGridConfig;
  gap: GridGapConfig;
  gapX: GridGapXConfig;
  gapY: GridGapYConfig;
}

export interface GridColsConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '12': string;
  auto: string;
  autoSm: string;
  autoMd: string;
  autoLg: string;
}

export interface ResponsiveGridConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
}

export interface GridGapConfig {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
  '10': string;
  '12': string;
}

export interface GridGapXConfig {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
}

export interface GridGapYConfig {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
}

export interface FlexConfig {
  base: string;
  direction: FlexDirectionConfig;
  wrap: FlexWrapConfig;
  justify: FlexJustifyConfig;
  align: FlexAlignConfig;
  grow: FlexGrowConfig;
  shrink: FlexShrinkConfig;
}

export interface FlexDirectionConfig {
  row: string;
  col: string;
  rowReverse: string;
  colReverse: string;
}

export interface FlexWrapConfig {
  nowrap: string;
  wrap: string;
  wrapReverse: string;
}

export interface FlexJustifyConfig {
  start: string;
  end: string;
  center: string;
  between: string;
  around: string;
  evenly: string;
}

export interface FlexAlignConfig {
  start: string;
  end: string;
  center: string;
  baseline: string;
  stretch: string;
}

export interface FlexGrowConfig {
  '0': string;
  '1': string;
}

export interface FlexShrinkConfig {
  '0': string;
  '1': string;
}

export interface SpacingConfig {
  margin: MarginConfig;
  padding: PaddingConfig;
}

export interface MarginConfig {
  auto: string;
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
}

export interface PaddingConfig {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
}

export interface BreakpointConfig {
  mobile: MobileBreakpoint;
  tablet: TabletBreakpoint;
  desktop: DesktopBreakpoint;
  wide: WideBreakpoint;
}

export interface MobileBreakpoint {
  max: string;
  container: string;
}

export interface TabletBreakpoint {
  min: string;
  max: string;
  container: string;
}

export interface DesktopBreakpoint {
  min: string;
  max: string;
  container: string;
}

export interface WideBreakpoint {
  min: string;
  max: string;
  container: string;
}

export interface ContainerLayoutConfig {
  container: ContainerLayout;
  section: SectionConfig;
  hero: HeroConfig;
  content: ContentConfig;
  sidebar: SidebarLayoutConfig;
  card: CardLayoutConfig;
  stack: StackConfig;
  cluster: ClusterConfig;
  center: CenterConfig;
  cover: CoverConfig;
}

export interface ContainerLayout {
  base: string;
  sizes: ContainerSizeConfig;
  padding: ContainerPaddingConfig;
  responsive: ResponsiveContainerConfig;
}

export interface ContainerSizeConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  full: string;
  screen: string;
  screenSm: string;
  screenMd: string;
  screenLg: string;
  screenXl: string;
  screen2xl: string;
}

export interface ContainerPaddingConfig {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ResponsiveContainerConfig {
  base: string;
  tight: string;
  loose: string;
}

export interface SectionConfig {
  base: string;
  sizes: SectionSizes;
  responsive: ResponsiveSectionConfig;
}

export interface SectionSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ResponsiveSectionConfig {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface HeroConfig {
  base: string;
  sizes: HeroSizes;
  content: HeroContentConfig;
}

export interface HeroSizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface HeroContentConfig {
  base: string;
  title: string;
  subtitle: string;
  actions: string;
}

export interface ContentConfig {
  base: string;
  sizes: ContentSizes;
  narrow: string;
  wide: string;
}

export interface ContentSizes {
  sm: string;
  base: string;
  lg: string;
  xl: string;
}

export interface SidebarLayoutConfig {
  base: string;
  main: string;
  aside: string;
  sticky: string;
}

export interface CardLayoutConfig {
  base: string;
  sizes: CardLayoutSizes;
  elevated: string;
  bordered: string;
}

export interface CardLayoutSizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface StackConfig {
  base: string;
  sizes: StackSizes;
  horizontal: string;
  responsive: string;
}

export interface StackSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ClusterConfig {
  base: string;
  sizes: ClusterSizes;
  center: string;
  between: string;
  around: string;
}

export interface ClusterSizes {
  sm: string;
  md: string;
  lg: string;
}

export interface CenterConfig {
  base: string;
  inline: string;
  text: string;
}

export interface CoverConfig {
  base: string;
  header: string;
  main: string;
  footer: string;
}

// Utility Configuration Types
export interface UtilityConfigs {
  utilityClasses: UtilityClassesConfig;
  responsiveHelpers: ResponsiveHelpersConfig;
}

export interface UtilityClassesConfig {
  display: DisplayConfig;
  position: PositionConfig;
  overflow: OverflowConfig;
  text: TextConfig;
  spacing: SpacingUtilityConfig;
  sizing: SizingConfig;
  flexbox: FlexboxConfig;
  grid: GridUtilityConfig;
  border: BorderUtilityConfig;
  shadow: ShadowUtilityConfig;
  opacity: OpacityConfig;
  cursor: CursorConfig;
  pointerEvents: PointerEventsConfig;
  userSelect: UserSelectConfig;
  zIndex: ZIndexConfig;
}

export interface DisplayConfig {
  block: string;
  inline: string;
  inlineBlock: string;
  flex: string;
  inlineFlex: string;
  grid: string;
  inlineGrid: string;
  hidden: string;
  table: string;
  tableCell: string;
  tableRow: string;
}

export interface PositionConfig {
  static: string;
  relative: string;
  absolute: string;
  fixed: string;
  sticky: string;
}

export interface OverflowConfig {
  auto: string;
  hidden: string;
  visible: string;
  scroll: string;
  xAuto: string;
  yAuto: string;
  xHidden: string;
  yHidden: string;
}

export interface TextConfig {
  align: TextAlignConfig;
  transform: TextTransformConfig;
  decoration: TextDecorationConfig;
  overflow: TextOverflowConfig;
}

export interface TextAlignConfig {
  left: string;
  center: string;
  right: string;
  justify: string;
}

export interface TextTransformConfig {
  uppercase: string;
  lowercase: string;
  capitalize: string;
  normalCase: string;
}

export interface TextDecorationConfig {
  underline: string;
  noUnderline: string;
  lineThrough: string;
}

export interface TextOverflowConfig {
  truncate: string;
  ellipsis: string;
  clip: string;
}

export interface SpacingUtilityConfig {
  margin: SpacingScale;
  padding: SpacingScale;
}

export interface SizingConfig {
  width: SizingScale;
  height: SizingScale;
}

export interface SizingScale {
  auto: string;
  full: string;
  screen: string;
  min: string;
  max: string;
  fit: string;
  '0': string;
  px: string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '96': string;
}

export interface FlexboxConfig {
  direction: FlexDirectionConfig;
  wrap: FlexWrapConfig;
  justify: FlexJustifyConfig;
  align: FlexAlignConfig;
  grow: FlexGrowConfig;
  shrink: FlexShrinkConfig;
  order: OrderConfig;
}

export interface OrderConfig {
  first: string;
  last: string;
  none: string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
}

export interface GridUtilityConfig {
  cols: GridColsUtilityConfig;
  rows: GridRowsConfig;
  gap: GridGapUtilityConfig;
  colSpan: ColSpanConfig;
  rowSpan: RowSpanConfig;
}

export interface GridColsUtilityConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  none: string;
}

export interface GridRowsConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  none: string;
}

export interface GridGapUtilityConfig {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
}

export interface ColSpanConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  full: string;
}

export interface RowSpanConfig {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  full: string;
}

export interface BorderUtilityConfig {
  width: BorderWidthConfig;
  style: BorderStyleConfig;
  radius: BorderRadiusConfig;
}

export interface BorderWidthConfig {
  '0': string;
  '1': string;
  '2': string;
  '4': string;
  '8': string;
}

export interface BorderStyleConfig {
  solid: string;
  dashed: string;
  dotted: string;
  double: string;
  none: string;
}

export interface BorderRadiusConfig {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface ShadowUtilityConfig {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface OpacityConfig {
  '0': string;
  '5': string;
  '10': string;
  '20': string;
  '25': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '75': string;
  '80': string;
  '90': string;
  '95': string;
  '100': string;
}

export interface CursorConfig {
  auto: string;
  default: string;
  pointer: string;
  wait: string;
  text: string;
  move: string;
  help: string;
  notAllowed: string;
}

export interface PointerEventsConfig {
  none: string;
  auto: string;
}

export interface UserSelectConfig {
  none: string;
  text: string;
  all: string;
  auto: string;
}

export interface ZIndexConfig {
  '0': string;
  '10': string;
  '20': string;
  '30': string;
  '40': string;
  '50': string;
  auto: string;
}

export interface ResponsiveHelpersConfig {
  breakpoints: BreakpointHelpers;
  visibility: VisibilityHelpers;
  text: TextHelpers;
  spacing: SpacingHelpers;
  grid: GridHelpers;
  flex: FlexHelpers;
  container: ContainerHelpers;
  aspectRatio: AspectRatioConfig;
  objectFit: ObjectFitConfig;
  objectPosition: ObjectPositionConfig;
  mediaQueries: MediaQueryConfig;
}

export interface BreakpointHelpers {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface VisibilityHelpers {
  hide: BreakpointHelpers;
  show: BreakpointHelpers;
  only: BreakpointHelpers;
}

export interface TextHelpers {
  sizes: TextSizeHelpers;
}

export interface TextSizeHelpers {
  xs: TextSizeBreakpoints;
  sm: TextSizeBreakpoints;
  md: TextSizeBreakpoints;
  lg: TextSizeBreakpoints;
}

export interface TextSizeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface SpacingHelpers {
  margin: SpacingBreakpointHelpers;
  padding: SpacingBreakpointHelpers;
}

export interface SpacingBreakpointHelpers {
  responsive: ResponsiveSpacingConfig;
}

export interface ResponsiveSpacingConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface GridHelpers {
  responsive: ResponsiveGridConfig;
  auto: AutoGridConfig;
}

export interface AutoGridConfig {
  sm: string;
  md: string;
  lg: string;
}

export interface FlexHelpers {
  responsive: ResponsiveFlexConfig;
}

export interface ResponsiveFlexConfig {
  col: string;
  row: string;
  wrap: string;
  nowrap: string;
}

export interface ContainerHelpers {
  responsive: ResponsiveContainerHelpers;
}

export interface ResponsiveContainerHelpers {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface AspectRatioConfig {
  square: string;
  video: string;
  portrait: string;
  landscape: string;
  wide: string;
  ultrawide: string;
}

export interface ObjectFitConfig {
  contain: string;
  cover: string;
  fill: string;
  none: string;
  scaleDown: string;
}

export interface ObjectPositionConfig {
  bottom: string;
  center: string;
  left: string;
  leftBottom: string;
  leftTop: string;
  right: string;
  rightBottom: string;
  rightTop: string;
  top: string;
}

export interface MediaQueryConfig {
  mobile: string;
  tablet: string;
  desktop: string;
  touch: string;
  hover: string;
  reducedMotion: string;
  dark: string;
}

// Main Design System Interface
export interface DesignSystem {
  tokens: DesignTokens;
  components: ComponentConfigs;
  layouts: LayoutConfigs;
  utilities: UtilityConfigs;
}

// API Response Types
export interface DesignSystemAPI {
  getToken: (path: string) => any;
  getComponent: (name: string) => any;
  applyTheme: (element: HTMLElement, tokens: object) => void;
  getResponsiveValue: (breakpoint: string, token: string) => any;
  generateUtilityClass: (utility: string, value: string) => string;
  loadConfig: (configName: string) => Promise<any>;
  validateToken: (path: string, value: any) => boolean;
  generateCSS: () => string;
  hotReload: () => void;
}
