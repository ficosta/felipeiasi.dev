import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Profile } from '@/types/site';

export default function About({ data }: { data: Profile }) {
  return (
    <section id="about" className="container relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
          About Me
        </h2>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          {/* Decorative corner accents - hidden on mobile to prevent overflow */}
          <div className="hidden md:block absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="hidden md:block absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-secondary/20 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Main card */}
          <div className="relative rounded-3xl border border-foreground/10 bg-gradient-to-br from-card/80 via-card/50 to-card/30 backdrop-blur-xl p-8 lg:p-16 overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />


            {/* Content */}
            <div className="relative z-10">
              {/* Long Summary */}
              {data.long_summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-xl lg:text-2xl leading-relaxed text-foreground/80 font-light mb-12">
                    {data.long_summary}
                  </p>
                </motion.div>
              )}

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                  <div className="text-4xl font-bold text-primary mb-2">14+</div>
                  <div className="text-sm text-foreground/60">Years Experience</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/10">
                  <div className="text-4xl font-bold text-secondary mb-2">50+</div>
                  <div className="text-sm text-foreground/60">Projects Delivered</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-foreground/10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">∞</div>
                  <div className="text-sm text-foreground/60">Creative Solutions</div>
                </div>
              </motion.div>

              {/* Availability Info */}
              {data.availability && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="pt-8 border-t border-foreground/10"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Based in</div>
                        <div className="font-semibold">{data.availability.base}</div>
                      </div>
                    </div>

                    {/* Work Regions */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-foreground/50 uppercase tracking-wide mb-1">Available in</div>
                        <div className="flex gap-2">
                          {data.availability.work_regions.map((region, index) => (
                            <span key={region}>
                              {index > 0 && <span className="text-foreground/30 mr-2">•</span>}
                              <span className="text-sm font-medium text-foreground/80">
                                {region}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-foreground/60 px-4 py-2 rounded-xl bg-foreground/5 inline-block">
                      {data.availability.status}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
