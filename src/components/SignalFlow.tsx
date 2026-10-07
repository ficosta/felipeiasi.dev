import { useMemo } from 'react';
import { layoutFlow, NODE_H, NODE_W } from '@/lib/flow';
import type { FlowKind, ProjectFlow } from '@/types/site';

const KIND_TAG: Record<FlowKind, string> = { source: 'SRC', process: 'PROC', output: 'OUT' };
const PAD = 12;
const MIN_SCALE = 0.8;

function FlowList({ flow, className }: { flow: ProjectFlow; className: string }) {
  const labelOf = (id: string) => flow.nodes.find((n) => n.id === id)?.label ?? id;
  return (
    <ol className={className}>
      {flow.nodes.map((n) => {
        const out = flow.edges.filter((e) => e.from === n.id);
        return (
          <li key={n.id} className="border-l border-line py-2 pl-4">
            <span className="label mr-2">{KIND_TAG[n.kind]}</span>
            <span className="font-semibold">{n.label}</span>
            {n.tech && <span className="text-dim"> — {n.tech}</span>}
            {out.length > 0 && (
              <span className="label mt-1 block">
                → {out.map((e) => `${labelOf(e.to)}${e.label ? ` (${e.label})` : ''}`).join(', ')}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function SignalFlow({ flow, title }: { flow: ProjectFlow; title: string }) {
  const layout = useMemo(() => layoutFlow(flow), [flow]);
  const w = layout.width + PAD * 2;
  const h = layout.height + PAD * 2 + 14;

  return (
    <figure aria-label={`Signal flow: ${title}`}>
      <div className="hidden overflow-x-auto sm:block">
        <svg
          viewBox={`${-PAD} ${-PAD - 14} ${w} ${h}`}
          className="block h-auto w-full"
          style={{ minWidth: w * MIN_SCALE }}
          aria-hidden
        >
          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--color-dim)" />
            </marker>
          </defs>

          {layout.edges.map((e) => (
            <g key={`${e.from}-${e.to}`}>
              <path d={e.d} fill="none" stroke="var(--color-dim)" strokeWidth={1.25} markerEnd="url(#arrow)" />
              {e.label && (
                <text
                  x={e.lx}
                  y={e.ly}
                  textAnchor="middle"
                  className="fill-fg font-mono text-[9.5px] tracking-[0.04em]"
                >
                  {e.label}
                </text>
              )}
            </g>
          ))}

          {layout.nodes.map((n) => (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
              <rect
                width={NODE_W}
                height={NODE_H}
                fill="var(--color-panel)"
                stroke={n.kind === 'output' ? 'var(--color-fg)' : 'var(--color-line)'}
              />
              {n.kind === 'output' && <rect width={3} height={NODE_H} fill="var(--color-fg)" />}
              <text x={12} y={-6} className="fill-dim font-mono text-[9px] tracking-[0.1em]">
                {KIND_TAG[n.kind]}
              </text>
              <text x={12} y={n.tech ? 27 : 37} className="fill-fg text-[15px] font-semibold">
                {n.label}
              </text>
              {n.tech && (
                <text x={12} y={46} className="fill-dim font-mono text-[9.5px]">
                  {n.tech}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <FlowList flow={flow} className="sm:sr-only" />
    </figure>
  );
}
