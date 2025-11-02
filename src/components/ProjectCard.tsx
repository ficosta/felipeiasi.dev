import { motion } from 'framer-motion';
import type { Project } from '@/types/site';

export function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card/50 backdrop-blur-sm"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      data-cursor-hover
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={p.thumbnail}
          alt={p.title}
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/800x500/8B5CF6/FFFFFF?text=${encodeURIComponent(p.title)}`;
          }}
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">{p.summary}</p>
        </div>

        {/* Stack */}
        {p.stack && p.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {p.stack.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {p.tags && p.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {p.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {(p.links?.code || p.links?.demo) && (
          <div className="flex gap-3 pt-2">
            {p.links.demo && (
              <a
                href={p.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                data-cursor-hover
              >
                View Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
            {p.links.code && (
              <a
                href={p.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-foreground/20 text-sm font-medium hover:border-foreground/40 transition-colors"
                data-cursor-hover
              >
                Code
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </div>
    </motion.article>
  );
}
