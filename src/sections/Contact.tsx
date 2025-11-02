import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Contact({
  data,
}: {
  data: { email?: string; linkedin?: string; github?: string };
}) {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${data.email}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: data.linkedin,
    },
    {
      icon: Github,
      label: 'GitHub',
      href: data.github,
    },
  ].filter((method) => method.href);

  return (
    <section id="contact" className="container py-20 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Let's Connect
        </h2>
      </motion.div>

      {/* Contact Icons */}
      <div className="flex items-center justify-center gap-6 mb-16">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href?.startsWith('http') ? '_blank' : undefined}
              rel={method.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
              data-cursor-hover
              aria-label={method.label}
            >
              <div className="p-5 rounded-2xl border-2 border-foreground/10 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300">
                <Icon className="w-8 h-8 text-foreground/70 group-hover:text-primary transition-colors duration-300" />
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg" />
            </motion.a>
          );
        })}
      </div>

      {/* Footer text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <p className="text-sm text-foreground/40">
          © {new Date().getFullYear()} Felipe Iasi
        </p>
      </motion.div>
    </section>
  );
}
