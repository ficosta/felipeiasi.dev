import { useState } from 'react';
import SectionHead from '@/components/SectionHead';
import type { Career } from '@/types/site';

function shortPeriod(period: string) {
  const years = period.match(/\d{4}/g) ?? [];
  const end = /present/i.test(period) ? 'Now' : years[1];
  return end && end !== years[0] ? `${years[0]} – ${end}` : years[0] ?? period;
}

function Row({ item, open, onToggle }: { item: Career; open: boolean; onToggle: () => void }) {
  const expandable = Boolean(item.highlights?.length);
  const panelId = `rd-${item.company}-${item.period}`.replace(/\W+/g, '-');

  return (
    <li className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        disabled={!expandable}
        aria-expanded={expandable ? open : undefined}
        aria-controls={expandable ? panelId : undefined}
        className="grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 text-left enabled:cursor-pointer lg:grid-cols-[200px_1fr_280px_120px]"
      >
        <span className={`label order-2 lg:order-none ${item.current ? '!text-tally' : ''}`}>
          {item.current && <span className="tally-dot mr-2 !h-1.5 !w-1.5 !shadow-none" aria-hidden />}
          {shortPeriod(item.period)}
        </span>
        <span className="col-span-2 text-xl font-semibold leading-tight [font-stretch:88%] lg:col-span-1 lg:text-[26px]">
          {item.role}
          {expandable && (
            <span aria-hidden className="ml-3 font-mono text-sm text-dim">
              {open ? '−' : '+'}
            </span>
          )}
          {item.steps && item.steps.length > 1 && (
            <span className="label mt-1.5 block">{item.steps.length} roles</span>
          )}
        </span>
        <span className="order-3 text-dim lg:order-none lg:text-[17px]">{item.company}</span>
        <span className="label hidden text-right lg:block">{item.location?.split(',')[0]}</span>
      </button>
      {expandable && open && (
        <div id={panelId} className="pb-6 lg:pl-[224px]">
          {item.steps && (
            <ol className="mb-5 max-w-3xl border-l border-line">
              {item.steps.map((step) => (
                <li key={step.role} className="grid gap-x-6 py-1.5 pl-4 sm:grid-cols-[1fr_auto]">
                  <span className="font-semibold">{step.role}</span>
                  <span className="label">{step.period}</span>
                </li>
              ))}
            </ol>
          )}
          <ul className="max-w-3xl space-y-2">
            {item.highlights!.map((h) => (
              <li key={h} className="flex gap-3 text-[16px] leading-snug text-fg/85">
                <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 bg-dim" />
                {h}
              </li>
            ))}
          </ul>
          {item.tech && (
            <p className="label mt-4">{item.tech.join(' · ')}</p>
          )}
        </div>
      )}
    </li>
  );
}

export default function Rundown({ items }: { items: Career[] }) {
  // Open the richest entry (the one with promotions) so the depth is visible on arrival.
  const [open, setOpen] = useState<number | null>(() => Math.max(0, items.findIndex((i) => i.steps)));
  return (
    <section aria-labelledby="rundown-title" id="rundown" className="wrap py-20 lg:py-28">
      <SectionHead id="rundown-title" index="02" label="Rundown" title="Career" meta="2006 → now" />
      <ol className="border-t border-line">
        {items.map((item, i) => (
          <Row key={`${item.company}-${item.period}`} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </ol>
    </section>
  );
}
