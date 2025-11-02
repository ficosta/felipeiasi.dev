import { motion } from 'framer-motion';
import type { Career } from '@/types/site';

export default function Career({ data }: { data: Career[] }) {
  return (
    <section id="career" className="container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Professional Journey
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {/* Timeline items */}
          <div className="space-y-12">
            {data.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -60 : 60,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10" />
                    <div className="absolute w-8 h-8 rounded-full bg-primary/20 animate-ping" />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pl-20 lg:pl-0 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="rounded-3xl border border-foreground/10 bg-card/50 backdrop-blur-sm p-6 lg:p-8 hover:border-primary/30 transition-all duration-500 group">
                      {/* Period badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {item.period}
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-2">
                        {item.role}
                      </h3>
                      <div className={`flex items-center gap-2 text-foreground/60 mb-4 ${isLeft ? 'lg:justify-start' : 'lg:justify-start'}`}>
                        <span className="font-medium">{item.company}</span>
                        {item.location && (
                          <>
                            <span>•</span>
                            <span className="text-sm">{item.location}</span>
                          </>
                        )}
                      </div>

                      {/* Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {item.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                              <svg className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech stack */}
                      {item.tech && item.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-medium hover:border-primary/30 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Glow effect */}
                      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
