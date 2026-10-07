import { motion, useReducedMotion } from 'framer-motion';

interface LowerThirdProps {
  title: string;
  sub?: string;
}

/**
 * Broadcast lower third. Both cells stretch to the same height and centre
 * their text, so title and sub line always share one optical axis.
 */
export default function LowerThird({ title, sub }: LowerThirdProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="grid w-full max-w-[1000px] grid-cols-[6px_1fr] items-stretch sm:grid-cols-[6px_auto_1fr]"
      initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      transition={{ duration: 0.22, ease: [0.7, 0, 0.3, 1], delay: 0.25 }}
    >
      <span aria-hidden className="bg-tally" />
      <p className="flex items-center bg-fg px-5 py-4 text-bg sm:px-7">
        <strong className="text-[22px] font-bold leading-tight [font-stretch:85%] sm:text-[30px]">
          {title}
        </strong>
      </p>
      {sub && (
        <p className="col-span-2 col-start-1 flex items-center bg-panel px-5 py-4 text-[15px] leading-snug text-fg/85 sm:col-span-1 sm:col-start-auto sm:px-6 sm:text-[17px]">
          {sub}
        </p>
      )}
    </motion.div>
  );
}
