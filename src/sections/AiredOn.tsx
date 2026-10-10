interface Mark {
  name: string;
  src?: string;
  height: number;
  /** Raster marks that cannot be flattened keep their shading in grey. */
  shaded?: boolean;
}

// Single-colour marks prepared for the dark theme (public/logos).
// Record's 2023 mark is a shaded sphere, so it stays a greyscale raster.
const MARKS: Mark[] = [
  { name: 'CNN Brasil', src: '/logos/cnn-brasil.svg', height: 30 },
  { name: 'Bild', src: '/logos/bild.svg', height: 28 },
  { name: 'Band', src: '/logos/band.svg', height: 26 },
  { name: 'Record', src: '/logos/record.png', height: 44, shaded: true },
  { name: 'MTV Brasil', src: '/logos/mtv.svg', height: 30 },
  { name: 'RedeTV!', src: '/logos/redetv.svg', height: 34 },
  { name: 'Riot Games', src: '/logos/riot-games.svg', height: 30 },
  { name: 'Garena', src: '/logos/garena.svg', height: 32 },
];

export default function AiredOn() {
  return (
    <section aria-label="Broadcasters" className="border-b border-line">
      <div className="wrap flex flex-wrap items-center gap-x-10 gap-y-6 py-7 lg:gap-x-14">
        <span className="label w-full sm:w-auto">Aired on</span>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 lg:gap-x-14">
          {MARKS.map((m) => (
            <li key={m.name} className="opacity-55 transition-opacity hover:opacity-100">
              {m.src ? (
                <img
                  src={m.src}
                  alt={m.name}
                  style={{ height: m.height }}
                  className={`w-auto ${m.shaded ? 'brightness-90 contrast-125 grayscale' : ''}`}
                />
              ) : (
                <span
                  className="block font-extrabold uppercase leading-none tracking-[0.04em] [font-stretch:90%]"
                  style={{ fontSize: m.height }}
                >
                  {m.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
