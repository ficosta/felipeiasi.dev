import { motion } from 'framer-motion';
import type { Profile } from '@/types/site';

export default function Languages({ data }: { data: Profile }) {
  if (!data.languages) return null;

  const languages = Object.entries(data.languages);

  const flagMap: Record<string, string> = {
    'Portuguese': '🇧🇷',
    'English': '🇺🇸',
    'German': '🇩🇪',
    'Spanish': '🇪🇸',
  };

  return (
    <section id="languages" className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Languages</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {languages.map(([language, proficiency], index) => (
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative"
          >
            <div className="h-full rounded-2xl border border-foreground/10 bg-card/50 backdrop-blur-sm p-6 text-center hover:border-primary/30 transition-colors duration-300">
              {/* Flag emoji */}
              <div className="text-5xl mb-4">
                {flagMap[language] || '🌐'}
              </div>

              {/* Language name */}
              <h3 className="font-bold text-lg mb-1">{language}</h3>

              {/* Proficiency badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                {proficiency}
              </span>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-lg" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
