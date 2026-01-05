/**
 * Get computed CSS variable color value
 * This allows components to read theme colors from CSS variables
 */
function getCSSVariableColor(variableName: string, fallback: string): string {
  try {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    return value || fallback;
  } catch {
    return fallback;
  }
}

/**
 * Convert HSL values to CSS string format
 */
function hslToString(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Get theme-aware background color for tooltips and modals
 * Falls back to dark mode by default
 */
export function getThemeBackgroundColor(): string {
  // Try to read from CSS variable, fall back to dark mode
  try {
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
    if (bgColor) {
      return `hsl(${bgColor})`;
    }
  } catch {
    // Fallback to hardcoded dark mode
  }
  return 'hsl(222, 47%, 8%)'; // Dark mode fallback
}

/**
 * Get theme-aware border color for tooltips and modals
 */
export function getThemeBorderColor(): string {
  try {
    const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border').trim();
    if (borderColor) {
      return `hsl(${borderColor})`;
    }
  } catch {
    // Fallback to hardcoded dark mode
  }
  return 'hsl(217, 33%, 17%)'; // Dark mode fallback
}

/**
 * Get all theme colors used in charts and components
 */
export function getThemeColors() {
  return {
    background: getThemeBackgroundColor(),
    border: getThemeBorderColor(),
    card: 'hsl(222, 47%, 8%)',
    mutedForeground: 'hsl(215, 20%, 55%)',
  };
}

/**
 * Tooltip style object for Recharts components
 * Use this for consistent theme-aware tooltips
 */
export function getTooltipStyle() {
  const colors = getThemeColors();
  return {
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
  };
}

/**
 * Modal/Dialog style for theme-aware backgrounds
 */
export function getModalBackgroundStyle() {
  return {
    backgroundColor: getThemeBackgroundColor(),
  };
}
