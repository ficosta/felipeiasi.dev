export type ThemeMode = 'light' | 'dark' | 'surprise';

const THEME_KEY = 'theme-mode';

// Paletas pré-definidas para o modo surprise
const SURPRISE_PALETTES = [
  {
    name: 'purple-dream',
    primary: 'oklch(67% 0.26 296)',
    secondary: 'oklch(77% 0.13 213)',
    background: 'oklch(97% 0.01 296)',
    foreground: 'oklch(20% 0.02 296)'
  },
  {
    name: 'ocean-breeze',
    primary: 'oklch(65% 0.20 220)',
    secondary: 'oklch(75% 0.15 180)',
    background: 'oklch(96% 0.01 220)',
    foreground: 'oklch(18% 0.02 220)'
  },
  {
    name: 'sunset-glow',
    primary: 'oklch(70% 0.22 30)',
    secondary: 'oklch(72% 0.18 50)',
    background: 'oklch(98% 0.01 30)',
    foreground: 'oklch(22% 0.02 30)'
  },
  {
    name: 'forest-mist',
    primary: 'oklch(60% 0.18 150)',
    secondary: 'oklch(68% 0.14 170)',
    background: 'oklch(96% 0.01 150)',
    foreground: 'oklch(20% 0.02 150)'
  },
  {
    name: 'ruby-fire',
    primary: 'oklch(62% 0.24 20)',
    secondary: 'oklch(70% 0.16 340)',
    background: 'oklch(97% 0.01 20)',
    foreground: 'oklch(19% 0.02 20)'
  },
  {
    name: 'cyber-neon',
    primary: 'oklch(68% 0.25 280)',
    secondary: 'oklch(75% 0.20 330)',
    background: 'oklch(15% 0.02 280)',
    foreground: 'oklch(95% 0.01 280)'
  },
  {
    name: 'mint-fresh',
    primary: 'oklch(72% 0.16 160)',
    secondary: 'oklch(78% 0.12 140)',
    background: 'oklch(98% 0.01 160)',
    foreground: 'oklch(21% 0.02 160)'
  },
  {
    name: 'coral-reef',
    primary: 'oklch(68% 0.20 25)',
    secondary: 'oklch(74% 0.16 45)',
    background: 'oklch(97% 0.01 25)',
    foreground: 'oklch(20% 0.02 25)'
  },
];

export function initTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
  const mode = stored || 'light';
  applyTheme(mode);
  return mode;
}

export function generateRandomPalette() {
  const palette = SURPRISE_PALETTES[Math.floor(Math.random() * SURPRISE_PALETTES.length)];
  return palette;
}

export function applyTheme(mode: ThemeMode) {
  localStorage.setItem(THEME_KEY, mode);
  const root = document.documentElement;

  // Remove all theme classes first
  root.classList.remove('dark', 'surprise');

  if (mode === 'surprise') {
    const palette = generateRandomPalette();
    root.classList.add('surprise');
    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-secondary', palette.secondary);
    root.style.setProperty('--color-background', palette.background);
    root.style.setProperty('--color-foreground', palette.foreground);
    root.style.setProperty('--color-card', palette.background);
    root.style.setProperty('--color-muted', `oklch(${palette.background.includes('15%') ? '25%' : '92%'} 0.007 270.71)`);
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-palette', palette.name);
  } else {
    // Clear custom properties when not in surprise mode
    root.style.removeProperty('--color-primary');
    root.style.removeProperty('--color-secondary');
    root.style.removeProperty('--color-background');
    root.style.removeProperty('--color-foreground');
    root.style.removeProperty('--color-card');
    root.style.removeProperty('--color-muted');
    root.setAttribute('data-theme', mode);

    if (mode === 'dark') {
      root.classList.add('dark');
    }
  }
}
