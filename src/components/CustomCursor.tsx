import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 200, damping: 20, mass: 0.2 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 20, mass: 0.2 });

  useEffect(() => {
    // Check if device has hover capability (not touch)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-cursor-hover');

      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Main cursor dot */}
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="h-10 w-10 rounded-full border-2 border-primary/30 bg-primary/10 backdrop-blur-sm" />
        </motion.div>
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 rounded-full bg-primary/5 blur-xl" />
        </div>
      </motion.div>
    </>
  );
}
