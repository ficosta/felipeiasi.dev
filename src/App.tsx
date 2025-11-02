import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import AnimatedGradient from '@/components/AnimatedGradient';
import ThemeSwitch from '@/components/ThemeSwitch';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Languages from '@/sections/Languages';
import Projects from '@/sections/Projects';
import Career from '@/sections/Career';
import Education from '@/sections/Education';
import Certs from '@/sections/Certs';
import Contact from '@/sections/Contact';
import { loadSiteData, type SiteData } from '@/lib/content';

export default function App() {
  const [data, setData] = useState<SiteData | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    loadSiteData().then(setData);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!data) return null;

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Animated Background Gradient */}
      <AnimatedGradient />

      {/* Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 h-[2px] origin-left bg-primary z-50"
      />

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-40 px-6 py-4 backdrop-blur-md bg-background/50 border-b border-foreground/5 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            data-cursor-hover
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: scrolled ? 1 : 0,
              x: scrolled ? 0 : -20,
              pointerEvents: scrolled ? 'auto' : 'none'
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Avatar */}
            <img
              src={data.profile.avatar}
              alt={data.profile.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.profile.name)}&size=32&background=8B5CF6&color=fff&bold=true`;
              }}
            />

            {/* Name */}
            <span className="text-sm font-medium">
              {data.profile.name}
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThemeSwitch />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero data={data.profile} />

        <div className="space-y-32 py-20">
          {/* About Section */}
          <About data={data.profile} />

          {/* Skills Section */}
          {data.profile.skills && <Skills data={data.profile} />}

          {/* Languages Section */}
          {data.profile.languages && <Languages data={data.profile} />}

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && <Projects data={data.projects} />}

          {/* Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <Career data={data.experience} />
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <Education data={data.education} />
          )}

          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <Certs data={data.certifications} />
          )}

          {/* Contact Section */}
          <Contact data={data.profile.contacts} />
        </div>
      </main>

    </>
  );
}
