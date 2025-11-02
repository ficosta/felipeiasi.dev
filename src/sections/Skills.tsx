import { motion } from 'framer-motion';
import { Code2, Wrench, Palette } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import type { Profile } from '@/types/site';

interface SkillBarProps {
  name: string;
  level: number;
  delay: number;
}

function SkillBar({ name, level, delay }: SkillBarProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground/90">{name}</span>
        <span className="text-xs font-medium text-primary">{level}%</span>
      </div>
      <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills({ data }: { data: Profile }) {
  if (!data.skills) return null;

  const skillCategories = [
    { title: 'Languages & Frameworks', skills: data.skills.languages, icon: Code2 },
    { title: 'Platforms & Tools', skills: data.skills.platforms, icon: Wrench },
    { title: 'Design & Creative', skills: data.skills.design, icon: Palette },
  ];

  return (
    <section id="skills" className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Skills & Expertise
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => {
          if (!category.skills || category.skills.length === 0) return null;

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="relative"
            >
              {/* Card */}
              <div className="h-full rounded-3xl border border-foreground/10 bg-card/50 backdrop-blur-sm p-8 hover:border-primary/30 transition-colors duration-500">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{category.title}</h3>
                </div>

                {/* Skills */}
                <div className="space-y-6">
                  {category.skills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={categoryIndex * 0.1 + index * 0.05}
                    />
                  ))}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
