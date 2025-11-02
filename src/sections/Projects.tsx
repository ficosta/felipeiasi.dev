import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/types/site';

export default function Projects({ data }: { data: Project[] }) {
  const [filter, setFilter] = useState<string>('All');
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    data.forEach((d) => d.tags?.forEach((t: string) => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [data]);

  const list = useMemo(() => {
    if (filter === 'All') return data;
    return data.filter((p) => p.tags?.includes(filter));
  }, [data, filter]);

  return (
    <section id="projects" className="container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Featured Projects</h2>
      </motion.div>

      {/* Filter Tabs */}
      {allTags.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-2xl border border-foreground/10 bg-card/50 backdrop-blur-sm p-2">
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === tag
                    ? 'text-foreground'
                    : 'text-foreground/50 hover:text-foreground/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === tag && (
                  <motion.div
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard p={project} />
          </motion.div>
        ))}
      </motion.div>

      {/* No results */}
      {list.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-foreground/50">No projects found with tag "{filter}"</p>
        </motion.div>
      )}
    </section>
  );
}
