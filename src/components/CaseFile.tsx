import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import SignalFlow from '@/components/SignalFlow';
import type { Project } from '@/types/site';

interface CaseFileProps {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button, video[controls], [tabindex]:not([tabindex="-1"])';

function useDialogBehaviour(ref: React.RefObject<HTMLDivElement | null>, onClose: () => void) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    root.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [ref, onClose]);
}

export default function CaseFile({ project, onClose }: CaseFileProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogBehaviour(ref, onClose);
  const titleId = `case-${project.id}`;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 overflow-y-auto bg-bg"
    >
      <div className="sticky top-0 z-10 border-b border-line bg-bg">
        <div className="wrap flex h-14 items-center justify-between">
          <span className="label">Case file · {project.client}</span>
          <button type="button" data-autofocus onClick={onClose} className="label text-fg hover:text-tally">
            Close [Esc]
          </button>
        </div>
      </div>

      <article className="wrap py-12 lg:py-16">
        <h2 id={titleId} className="display max-w-5xl text-5xl sm:text-7xl lg:text-8xl">
          {project.title}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fg/85">{project.summary}</p>

        {project.impact && (
          <div className="mt-8 grid max-w-4xl grid-cols-[6px_1fr] items-stretch">
            <span aria-hidden className="bg-fg" />
            <p className="flex items-center bg-panel px-5 py-4 text-[17px] leading-snug">
              <span className="label mr-4 shrink-0 text-fg">Result</span>
              {project.impact}
            </p>
          </div>
        )}

        {project.flow && (
          <section aria-label="Architecture" className="mt-14 border-t border-line pt-6">
            <h3 className="label mb-8">Signal flow</h3>
            <SignalFlow flow={project.flow} title={project.title} />
          </section>
        )}

        <div className="mt-14 grid gap-12 border-t border-line pt-6 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-8">
            {project.stack && project.stack.length > 0 && (
              <div>
                <h3 className="label mb-3">Stack</h3>
                <ul className="flex flex-wrap gap-1.5 lg:flex-col lg:items-start">
                  {project.stack.map((s) => (
                    <li key={s} className="border border-line px-2 py-1 font-mono text-xs">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(project.links?.code || project.links?.demo) && (
              <div>
                <h3 className="label mb-3">Links</h3>
                <ul className="space-y-2">
                  {project.links?.code && (
                    <li>
                      <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        Source code ↗
                      </a>
                    </li>
                  )}
                  {project.links?.demo && (
                    <li>
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        Demo / download ↗
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </aside>
          {project.story && (
            <div className="story">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {project.story}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
