import { useRef } from 'react';
import type { Project } from '@/types/site';

interface SourceTileProps {
  project: Project;
  index: number;
  pgm: boolean;
  className?: string;
  onOpen: (project: Project, opener: HTMLElement) => void;
}

const isLogo = (src: string) => src.endsWith('.svg');

export default function SourceTile({ project, index, pgm, className = '', onOpen }: SourceTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.play().catch(() => {
      /* autoplay can be refused; the still image stays visible */
    });
  };
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => onOpen(project, e.currentTarget)}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      aria-label={`Open case file: ${project.title}`}
      className={`group relative flex flex-col overflow-hidden bg-panel text-left ${className} ${
        pgm ? 'outline outline-[3px] -outline-offset-[3px] outline-tally' : ''
      }`}
    >
      {/* The label bar sits under the picture, never over it, so posters keep their bottom edge. */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {isLogo(project.thumbnail) ? (
          <img
            src={project.thumbnail}
            alt=""
            className={`absolute left-1/2 -translate-x-1/2 ${pgm ? 'top-[60%] w-[26%] -translate-y-1/2' : 'top-1/2 w-1/3 -translate-y-1/2'}`}
          />
        ) : (
          <img
            src={project.thumbnail}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
          />
        )}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}

        {pgm && (
          <div className="absolute left-5 top-5 max-w-[75%] sm:left-6 sm:top-6">
            <h3 className="display text-4xl [text-shadow:0_2px_20px_#000] sm:text-5xl">{project.title}</h3>
            {project.impact && (
              <p className="mt-3 hidden max-w-md text-[15px] leading-snug text-fg/90 sm:block [text-shadow:0_1px_10px_#000]">
                {project.impact}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 bg-black px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.06em]">
        <span className="truncate text-fg">
          {pgm ? 'PGM' : `Src ${index}`} · {pgm ? project.client : project.title}
        </span>
        {pgm ? (
          <span className="flex shrink-0 items-center gap-1.5 text-tally">
            <span className="tally-dot !h-1.5 !w-1.5 !shadow-none" aria-hidden /> Live
          </span>
        ) : (
          <span className="shrink-0 text-dim">{project.client}</span>
        )}
      </div>
    </button>
  );
}
