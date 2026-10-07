import LowerThird from '@/components/LowerThird';
import type { Profile } from '@/types/site';

function SafeAreaCorners() {
  const corner = 'absolute h-[18px] w-[18px] border-[#3a3a3d]';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-4 inset-y-6 sm:inset-x-8 lg:inset-x-16 lg:inset-y-10">
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

export default function Hero({ data }: { data: Profile }) {
  const [first, ...rest] = data.name.split(' ');
  const last = rest.length ? rest[0] : '';

  return (
    <section id="top" aria-label="Introduction" className="relative border-b border-line">
      <SafeAreaCorners />
      <div className="wrap relative py-14 lg:py-20">
        <div className="flex flex-wrap justify-between gap-4 px-2 lg:px-6">
          <span className="label">
            TC {data.years.replace('+', '')}:00:00:00 · {data.years} years live
          </span>
          <span className="label text-right">
            {data.current.role}
            <br />
            {data.current.company} · {data.availability?.base ?? ''}
          </span>
        </div>

        <div className="mt-10 grid items-start gap-8 px-2 lg:mt-14 lg:grid-cols-[1fr_300px] lg:px-6">
          <h1 className="display text-[clamp(88px,17vw,236px)] leading-[0.82]">
            {first}
            <br />
            {last}
          </h1>
          <figure className="relative order-first aspect-[300/380] w-40 overflow-hidden sm:w-52 lg:order-none lg:w-full">
            <img
              src={data.avatar}
              alt={`Pixel-art portrait of ${data.name}`}
              className="h-full w-full -scale-x-100 object-cover object-[50%_20%] grayscale contrast-105"
            />
            <figcaption className="label absolute left-2.5 top-2.5 bg-black/70 px-1.5 py-0.5 text-[10px] text-fg">
              Cam 1
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 px-2 lg:mt-14 lg:px-6">
          <LowerThird title={data.headline} sub={data.tagline} />
        </div>
      </div>
    </section>
  );
}
