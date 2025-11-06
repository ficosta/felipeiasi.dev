import { motion, useScroll, useTransform } from 'framer-motion';
import { LinkedinIcon, GithubIcon, Mail, YoutubeIcon } from 'lucide-react';
import type { Profile } from '@/types/site';

export default function Hero({ data }: { data: Profile }) {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 500], [0, -80]);
  const textY = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <section id="hero" className="container relative min-h-screen flex items-center pt-20 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Left: Photo */}
        <motion.div
          style={{ y: photoY }}
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            <div className="gradient-border w-72 h-72 lg:w-96 lg:h-96">
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full object-cover rounded-full relative z-10"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=400&background=8B5CF6&color=fff&bold=true`;
                }}
              />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-30 bg-primary -z-10 rounded-full scale-110" />
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          style={{ y: textY }}
          className="space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-2">
            <motion.h1
              className="text-5xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {data.name}
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-foreground/80 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {data.title}
            </motion.p>

            {data.subtitle && (
              <motion.p
                className="text-base lg:text-lg text-foreground/60 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {data.subtitle}
              </motion.p>
            )}
          </div>

          {/* Description */}
          {data.summary && (
            <motion.p
              className="text-base lg:text-lg text-foreground/70 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {data.summary}
            </motion.p>
          )}

          {/* CTAs */}
          {(data.social || data.contacts) && (
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {(data.social?.linkedin || data.contacts?.linkedin) && (
                <motion.a
                  href={data.social?.linkedin || data.contacts?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-foreground/20 hover:border-[#0A66C2] bg-card/50 backdrop-blur-sm font-medium overflow-hidden transition-colors duration-300"
                  data-cursor-hover
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className="absolute inset-0 bg-[#0A66C2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <LinkedinIcon className="w-5 h-5 relative z-10 text-foreground group-hover:text-[#0A66C2] transition-colors duration-300" />
                  <span className="relative z-10 group-hover:text-[#0A66C2] transition-colors duration-300">LinkedIn</span>
                </motion.a>
              )}
              {(data.social?.github || data.contacts?.github) && (
                <motion.a
                  href={data.social?.github || data.contacts?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-foreground/20 hover:border-foreground/60 bg-card/50 backdrop-blur-sm font-medium overflow-hidden transition-colors duration-300"
                  data-cursor-hover
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <GithubIcon className="w-5 h-5 relative z-10 transition-colors duration-300" />
                  <span className="relative z-10 transition-colors duration-300">GitHub</span>
                </motion.a>
              )}
              {(data.social?.email || data.contacts?.email) && (
                <motion.a
                  href={`mailto:${data.social?.email || data.contacts?.email}`}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-foreground/20 hover:border-primary bg-card/50 backdrop-blur-sm font-medium overflow-hidden transition-colors duration-300"
                  data-cursor-hover
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="w-5 h-5 relative z-10 text-foreground group-hover:text-primary transition-colors duration-300" />
                  <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Email</span>
                </motion.a>
              )}
              <motion.a
                href="https://www.youtube.com/c/FelipeIasi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-foreground/20 hover:border-[#FF0000] bg-card/50 backdrop-blur-sm font-medium overflow-hidden transition-colors duration-300"
                data-cursor-hover
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <div className="absolute inset-0 bg-[#FF0000]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <YoutubeIcon className="w-5 h-5 relative z-10 text-foreground group-hover:text-[#FF0000] transition-colors duration-300" />
                <span className="relative z-10 group-hover:text-[#FF0000] transition-colors duration-300">YouTube</span>
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
