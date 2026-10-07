import { useState } from 'react';
import SectionHead from '@/components/SectionHead';
import type { SiteData } from '@/types/site';

type CredentialsProps = Pick<SiteData, 'education' | 'certifications' | 'presentations'> & {
  languages?: Record<string, string>;
};

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-5">
      <h3 className="label mb-5">{title}</h3>
      {children}
    </div>
  );
}

export default function Credentials({ education, certifications, presentations, languages }: CredentialsProps) {
  const [showAll, setShowAll] = useState(false);
  const featured = certifications.filter((c) => c.featured);
  const rest = certifications.filter((c) => !c.featured);

  return (
    <section aria-labelledby="cred-title" id="credentials" className="wrap py-20 lg:py-28">
      <SectionHead id="cred-title" index="04" label="Credentials" title="On record" />
      <div className="grid gap-10 lg:grid-cols-3">
        <Column title="Talks">
          <ul className="space-y-4">
            {presentations.map((p) => (
              <li key={p.title}>
                <p className="text-lg font-semibold leading-tight">{p.title}</p>
                <p className="label mt-1">
                  {p.event} · {p.year}
                </p>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Certifications">
          <ul className="space-y-4">
            {featured.map((c) => (
              <li key={c.name}>
                <p className="text-lg font-semibold leading-tight">{c.name}</p>
                <p className="label mt-1">
                  {c.issuer} · {c.year}
                </p>
              </li>
            ))}
          </ul>
          {rest.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="label mt-5 text-fg hover:text-tally"
              >
                {showAll ? '− Hide' : `+ ${rest.length} more`}
              </button>
              {showAll && (
                <ul className="mt-4 space-y-2">
                  {rest.map((c) => (
                    <li key={c.name} className="text-[15px] leading-snug text-fg/80">
                      {c.name} <span className="text-dim">— {c.issuer}, {c.year}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Column>

        <Column title="Education & languages">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="text-lg font-semibold leading-tight">{e.degree}</p>
                <p className="label mt-1">
                  {e.institution} · {e.years}
                </p>
              </li>
            ))}
          </ul>
          {languages && (
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              {Object.entries(languages).map(([lang, level]) => (
                <div key={lang} className="contents">
                  <dt className="font-semibold">{lang}</dt>
                  <dd className="text-dim">{level}</dd>
                </div>
              ))}
            </dl>
          )}
        </Column>
      </div>
    </section>
  );
}
