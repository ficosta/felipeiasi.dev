import type { Profile } from '@/types/site';

export default function EndSlate({ data }: { data: Profile }) {
  const { contacts } = data;
  const links = [
    { label: 'LinkedIn', href: contacts.linkedin },
    { label: 'GitHub', href: contacts.github },
    { label: 'YouTube', href: contacts.youtube },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-line">
      <div className="wrap py-20 lg:py-28">
        <p className="label mb-6">05 / End slate</p>
        <h2 id="contact-title" className="display text-[clamp(64px,12vw,176px)]">
          Get in touch
        </h2>
        {contacts.email && (
          <a
            href={`mailto:${contacts.email}`}
            className="mt-8 inline-block border-b-2 border-fg pb-1 text-2xl font-semibold transition-colors hover:border-tally hover:text-tally sm:text-4xl"
          >
            {contacts.email}
          </a>
        )}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t border-line pt-6">
          <ul className="flex flex-wrap gap-8">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="label text-fg hover:text-tally">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
          {data.availability && <p className="label max-w-md text-right">{data.availability.status}</p>}
        </div>
        <p className="label mt-16">© {new Date().getFullYear()} {data.name} · Off air</p>
      </div>
    </footer>
  );
}
