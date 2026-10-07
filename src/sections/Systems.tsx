import SectionHead from '@/components/SectionHead';
import SourceTile from '@/components/SourceTile';
import type { Project } from '@/types/site';

// 3×3 multiviewer: PGM takes the top-left 2×2, five sources wrap around it.
const SLOT_CLASSES = [
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-3 lg:row-start-2',
  'lg:col-start-1 lg:row-start-3',
  'lg:col-start-2 lg:row-start-3',
  'lg:col-start-3 lg:row-start-3',
];

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
      <div className="grid grid-cols-1 gap-1 border-4 border-line bg-line sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(3,240px)]">
        <SourceTile
          project={pgm}
          index={1}
          pgm
          onOpen={onOpen}
          className="aspect-[4/3] sm:col-span-2 sm:aspect-[16/9] lg:col-span-2 lg:row-span-2 lg:aspect-auto"
        />
        {sources.map((p, i) => (
          <SourceTile
            key={p.id}
            project={p}
            index={i + 2}
            pgm={false}
            onOpen={onOpen}
            className={`aspect-[16/10] lg:aspect-auto ${SLOT_CLASSES[i] ?? ''}`}
          />
        ))}
      </div>
    </section>
  );
}
