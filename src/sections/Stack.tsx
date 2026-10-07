import SectionHead from '@/components/SectionHead';
import type { StackLayer } from '@/types/site';

export default function Stack({ layers }: { layers: StackLayer[] }) {
  return (
    <section aria-labelledby="stack-title" id="stack" className="wrap py-20 lg:py-28">
      <SectionHead id="stack-title" index="03" label="Stack" title="By layer" meta="Ingest → air" />
      <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
        {layers.map((l, i) => (
          <div key={l.layer} className="bg-bg p-5 lg:min-h-[260px]">
            <dt className="label mb-5">
              L{i + 1} · {l.layer}
            </dt>
            {l.items.map((item) => (
              <dd key={item} className="mb-2 text-[17px] leading-snug">
                {item}
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </section>
  );
}
