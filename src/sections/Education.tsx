import { motion } from 'framer-motion';
import type { Education } from '@/types/site';

export default function Education({ data }: { data: Education[] }) {
  return (
    <section id="education" className="container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Education
        </h2>
      </motion.div>

      {/* Education Grid */}
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-1">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="group relative"
          >
            <div className="rounded-3xl border border-foreground/10 bg-card/50 backdrop-blur-sm p-6 lg:p-8 hover:border-primary/30 transition-all duration-500">
              {/* Years badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {item.years}
              </div>

              {/* Degree */}
              <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-3">
                {item.degree}
              </h3>

              {/* Institution */}
              <p className="text-foreground/60 font-medium">
                {item.institution}
              </p>

              {/* Glow effect */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
