import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedGradient() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gradientRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Convert mouse position to percentage
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;

      mouseX.set(xPercent);
      mouseY.set(yPercent);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={gradientRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-30"
      style={{
        background: `radial-gradient(circle 800px at ${springX}% ${springY}%,
          oklch(var(--color-primary) / 0.15),
          transparent 70%),
        radial-gradient(circle 600px at ${springX}% ${springY}%,
          oklch(var(--color-secondary) / 0.1),
          transparent 60%)`,
      }}
    />
  );
}
