import SectionHead from '@/components/SectionHead';
import SourceTile from '@/components/SourceTile';
import type { Project } from '@/types/site';

const LG_COLS = 4;
const BESIDE_PGM = 4; // PGM fills a 2×2 block; four sources sit beside it.

/**
 * Keep every row of the multiviewer full. When the sources after the PGM block
 * do not fill whole rows, the first row below the block is widened (so the
 * larger monitors sit near the top, not at the end), and on two-column
 * screens an odd last tile takes the whole row.
 */
function spanClasses(i: number, total: number): string {
  const classes: string[] = [];
  if (total % 2 === 1 && i === total - 1) classes.push('sm:col-span-2');

  const afterBlock = total - BESIDE_PGM;
  const leftover = afterBlock > 0 ? afterBlock % LG_COLS : 0;
  const pos = i - BESIDE_PGM;
  if (leftover > 0 && pos >= 0 && pos < leftover) {
    const spans = leftover === 1 ? [4] : leftover === 2 ? [2, 2] : [2, 1, 1];
    classes.push({ 1: 'lg:col-span-1', 2: 'lg:col-span-2', 4: 'lg:col-span-4' }[spans[pos]]!);
  }
  return classes.join(' ');
}

interface SystemsProps {
  projects: Project[];
  onOpen: (project: Project, opener: HTMLElement) => void;
}

export default function Systems({ projects, onOpen }: SystemsProps) {
  const pgm = projects.find((p) => p.featured) ?? projects[0];
  const sources = projects.filter((p) => p !== pgm);

  return (
    <section aria-labelledby="systems-title" id="systems" className="wrap py-20 lg:py-28">
      <SectionHead
        id="systems-title"
        index="01"
        label="Systems"
        title="Multiviewer"
        meta={`${projects.length} sources`}
      />
      <div className="grid grid-cols-1 gap-1 border-4 border-line bg-line sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
        <SourceTile
          project={pgm}
          index={1}
          pgm
          onOpen={onOpen}
          className="aspect-[4/3] sm:col-span-2 sm:aspect-[16/9] lg:row-span-2 lg:aspect-auto"
        />
        {sources.map((p, i) => (
          <SourceTile
            key={p.id}
            project={p}
            index={i + 2}
            pgm={false}
            onOpen={onOpen}
            className={`aspect-[16/10] lg:aspect-auto ${spanClasses(i, sources.length)}`}
          />
        ))}
      </div>
    </section>
  );
}
