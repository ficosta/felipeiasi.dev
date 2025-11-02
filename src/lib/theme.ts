export type ThemeMode = 'light' | 'dark' | 'surprise';

const THEME_KEY = 'theme-mode';

// Creative surprise themes inspired by various design styles
const SURPRISE_PALETTES = [
  {
    name: 'doom-64',
    primary: 'oklch(0.6083 0.2090 27.0276)',
    secondary: 'oklch(0.6423 0.1467 133.0145)',
    background: 'oklch(0.2178 0 0)',
    foreground: 'oklch(0.9067 0 0)',
    card: 'oklch(0.25 0 0)',
    accent: 'oklch(0.7482 0.1235 244.7492)',
    style: 'retro-gaming'
  },
  {
    name: 'mono',
    primary: 'oklch(0.5555 0 0)',
    secondary: 'oklch(0.2686 0 0)',
    background: 'oklch(0.1 0 0)',
    foreground: 'oklch(0.95 0 0)',
    card: 'oklch(0.15 0 0)',
    accent: 'oklch(0.7022 0.1892 22.2279)',
    style: 'monochrome'
  },
  {
    name: 'neo-brutalism',
    primary: 'oklch(0.7044 0.1872 23.1858)',
    secondary: 'oklch(0.9691 0.2005 109.6228)',
    background: 'oklch(0 0 0)',
    foreground: 'oklch(1 0 0)',
    card: 'oklch(0.3211 0 0)',
    accent: 'oklch(0.6755 0.1765 252.2592)',
    style: 'brutalist'
  },
  {
    name: 'notebook',
    primary: 'oklch(0.4891 0 0)',
    secondary: 'oklch(0.7572 0 0)',
    background: 'oklch(0.9821 0 0)',
    foreground: 'oklch(0.3485 0 0)',
    card: 'oklch(0.98 0 0)',
    accent: 'oklch(0.9354 0.0456 94.8549)',
    style: 'paper'
  },
  {
    name: 'bubblegum',
    primary: 'oklch(0.9195 0.0801 87.6670)',
    secondary: 'oklch(0.7794 0.0803 4.1330)',
    background: 'oklch(0.2497 0.0305 234.1628)',
    foreground: 'oklch(0.9306 0.0197 349.0785)',
    card: 'oklch(0.2902 0.0299 233.5352)',
    accent: 'oklch(0.6699 0.0988 356.9762)',
    style: 'playful'
  },
  {
    name: 'sunset-vaporwave',
    primary: 'oklch(0.75 0.20 330)',
    secondary: 'oklch(0.80 0.18 280)',
    background: 'oklch(0.15 0.05 260)',
    foreground: 'oklch(0.95 0.05 320)',
    card: 'oklch(0.20 0.08 270)',
    accent: 'oklch(0.85 0.25 300)',
    style: 'vaporwave'
  },
  {
    name: 'forest-depths',
    primary: 'oklch(0.55 0.15 150)',
    secondary: 'oklch(0.65 0.12 130)',
    background: 'oklch(0.12 0.03 140)',
    foreground: 'oklch(0.88 0.05 160)',
    card: 'oklch(0.18 0.05 145)',
    accent: 'oklch(0.70 0.20 110)',
    style: 'nature'
  },
  {
    name: 'cyber-tokyo',
    primary: 'oklch(0.70 0.28 350)',
    secondary: 'oklch(0.75 0.25 200)',
    background: 'oklch(0.08 0.02 280)',
    foreground: 'oklch(0.95 0.03 320)',
    card: 'oklch(0.12 0.05 290)',
    accent: 'oklch(0.80 0.30 30)',
    style: 'cyberpunk'
  },
];

export function initTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
  const mode = stored || 'dark';
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
    root.style.setProperty('--color-card', palette.card);
    root.style.setProperty('--color-accent', palette.accent);

    // Calculate muted based on background lightness
    const bgLightness = parseFloat(palette.background.match(/oklch\(([0-9.]+)/)?.[1] || '0.5');
    const mutedLightness = bgLightness > 0.5 ? bgLightness - 0.1 : bgLightness + 0.1;
    root.style.setProperty('--color-muted', `oklch(${mutedLightness} 0.01 0)`);

    root.setAttribute('data-theme', mode);
    root.setAttribute('data-palette', palette.name);
    root.setAttribute('data-style', palette.style);
  } else {
    // Clear custom properties when not in surprise mode
    root.style.removeProperty('--color-primary');
    root.style.removeProperty('--color-secondary');
    root.style.removeProperty('--color-background');
    root.style.removeProperty('--color-foreground');
    root.style.removeProperty('--color-card');
    root.style.removeProperty('--color-muted');
    root.style.removeProperty('--color-accent');
    root.setAttribute('data-theme', mode);
    root.removeAttribute('data-palette');
    root.removeAttribute('data-style');

    if (mode === 'dark') {
      root.classList.add('dark');
    }
  }
}
