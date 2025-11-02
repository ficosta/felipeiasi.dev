import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { applyTheme, initTheme, type ThemeMode } from '@/lib/theme';

export default function ThemeSwitch() {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    setMode(initTheme());
  }, []);

  function switchTheme(newMode: ThemeMode) {
    setMode(newMode);
    applyTheme(newMode);
  }

  const themes: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'light', label: 'Light', icon: '☀️' },
    { mode: 'dark', label: 'Dark', icon: '🌙' },
    { mode: 'surprise', label: 'Surprise', icon: '✨' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-2xl border bg-card/50 p-1 backdrop-blur-sm">
      {themes.map(({ mode: themeMode, label, icon }) => (
        <motion.button
          key={themeMode}
          onClick={() => switchTheme(themeMode)}
          className={`relative rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === themeMode
              ? 'text-foreground'
              : 'text-foreground/50 hover:text-foreground/80'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${label} mode`}
        >
          {mode === themeMode && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <span>{icon}</span>
            <span className="hidden sm:inline">{label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
