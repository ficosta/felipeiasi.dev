import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Certification } from '@/types/site';

export default function Certs({ data }: { data: Certification[] }) {
  return (
    <section id="certifications" className="container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Certifications</h2>
      </motion.div>

      {/* Certifications Grid */}
      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-3xl border border-foreground/10 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300"
              data-cursor-hover
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl font-bold text-primary">
                  {cert.year}
                </div>
                <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-bold text-lg mb-3 leading-tight group-hover:text-primary transition-colors">
                {cert.name}
              </h3>

              {/* Issuer */}
              <div className="text-sm text-foreground/60 font-medium">
                {cert.issuer}
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Glow effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
