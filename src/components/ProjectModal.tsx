import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Project } from '@/types/site';

const PROJECT_TYPE_STYLES = {
  'freelancer': 'bg-purple-500/20 border-purple-500/40 text-purple-400',
  'personal-lab': 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400',
  'open-source': 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
  'collective': 'bg-amber-500/20 border-amber-500/40 text-amber-400',
};

const PROJECT_TYPE_LABELS = {
  'freelancer': 'Freelancer',
  'personal-lab': 'Personal Lab',
  'open-source': 'Open Source',
  'collective': 'Collective',
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] overflow-y-auto pt-20">
            <div className="flex min-h-full items-start justify-center p-6 sm:p-8 md:p-12 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl bg-card/95 backdrop-blur-xl rounded-3xl border border-foreground/10 shadow-2xl overflow-hidden mb-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 hover:bg-background transition-colors"
                  data-cursor-hover
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Hero Media */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {project.video ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      poster={project.thumbnail}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Project Type Badge */}
                  {project.type && (
                    <div className="absolute top-6 left-6">
                      <div className={`px-4 py-2 rounded-full border backdrop-blur-md text-sm font-medium ${PROJECT_TYPE_STYLES[project.type]}`}>
                        {PROJECT_TYPE_LABELS[project.type]}
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-8 lg:p-12 -mt-32">
                  <div className="relative z-10 space-y-8">
                    {/* Title & Impact */}
                    <div className="space-y-4">
                      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        {project.title}
                      </h2>
                      {project.impact && (
                        <p className="text-lg text-primary font-medium italic">
                          {project.impact}
                        </p>
                      )}
                    </div>

                    {/* Tech Stack */}
                    {project.stack && project.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Story Content (Markdown) */}
                    {project.story && (
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            h1: ({ children, ...props }) => (
                              <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props}>
                                {children}
                              </h1>
                            ),
                            h2: ({ children, ...props }) => (
                              <h2 className="text-2xl font-bold tracking-tight mt-6 mb-3" {...props}>
                                {children}
                              </h2>
                            ),
                            h3: ({ children, ...props }) => (
                              <h3 className="text-xl font-semibold tracking-tight mt-4 mb-2" {...props}>
                                {children}
                              </h3>
                            ),
                            p: ({ children, ...props }) => (
                              <p className="text-foreground/80 leading-relaxed mb-4" {...props}>
                                {children}
                              </p>
                            ),
                            img: ({ src, alt, ...props }) => (
                              <img
                                src={src}
                                alt={alt}
                                className="rounded-2xl w-full my-6 border border-foreground/10"
                                {...props}
                              />
                            ),
                            video: ({ src, ...props }) => (
                              <video
                                controls
                                className="rounded-2xl w-full my-6 border border-foreground/10"
                                {...props}
                              >
                                <source src={src} type="video/mp4" />
                              </video>
                            ),
                            ul: ({ children, ...props }) => (
                              <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/80" {...props}>
                                {children}
                              </ul>
                            ),
                            ol: ({ children, ...props }) => (
                              <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/80" {...props}>
                                {children}
                              </ol>
                            ),
                            blockquote: ({ children, ...props }) => (
                              <blockquote
                                className="border-l-4 border-primary/50 pl-4 italic text-foreground/70 my-4"
                                {...props}
                              >
                                {children}
                              </blockquote>
                            ),
                            code: ({ children, ...props }) => (
                              <code
                                className="px-2 py-1 rounded bg-foreground/10 text-sm font-mono"
                                {...props}
                              >
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {project.story}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* Links */}
                    {(project.links?.demo || project.links?.code) && (
                      <div className="flex gap-4 pt-4 border-t border-foreground/10">
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                            data-cursor-hover
                          >
                            View Demo
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        )}
                        {project.links.code && (
                          <a
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-foreground/20 font-medium hover:border-foreground/40 transition-colors"
                            data-cursor-hover
                          >
                            View Code
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
