const LINKS = [
  { href: '#systems', label: 'Systems' },
  { href: '#rundown', label: 'Rundown' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export default function TopBar({ base }: { base: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wrap flex h-14 items-center justify-between">
        <a href="#top" className="label flex items-center gap-2 text-fg">
          <span className="tally-dot" aria-hidden />
          On air — {base}
        </a>
        <nav aria-label="Sections">
          <ul className="flex gap-5 sm:gap-8">
            {LINKS.map((l, i) => (
              <li key={l.href} className={i === 2 ? 'hidden sm:block' : undefined}>
                <a href={l.href} className="label transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
