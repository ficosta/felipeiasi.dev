import { motion } from 'framer-motion';
import type { Project } from '@/types/site';

const PROJECT_TYPE_STYLES = {
  freelancer: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
  'personal-lab': 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400',
  'open-source': 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
  collective: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
};

const PROJECT_TYPE_LABELS = {
  freelancer: 'Freelancer',
  'personal-lab': 'Personal Lab',
  'open-source': 'Open Source',
  collective: 'Collective',
};

export function ProjectCard({ p, onClick }: { p: Project; onClick?: () => void }) {
  const handleClick = () => {
    if (p.hasDetailedContent && onClick) {
      onClick();
    }
  };

  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-card/50 backdrop-blur-sm cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      data-cursor-hover
      onClick={handleClick}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Project Type Badge */}
        {p.type && (
          <div className="absolute top-4 right-4 z-10">
            <div
              className={`px-3 py-1.5 rounded-full border backdrop-blur-md text-xs font-medium ${
                PROJECT_TYPE_STYLES[p.type]
              }`}
            >
              {PROJECT_TYPE_LABELS[p.type]}
            </div>
          </div>
        )}

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">{p.summary}</p>
          {p.impact && <p className="text-sm text-primary/80 italic font-medium">{p.impact}</p>}
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
                onClick={(e) => e.stopPropagation()}
              >
                View Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
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
                onClick={(e) => e.stopPropagation()}
              >
                Code
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
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
