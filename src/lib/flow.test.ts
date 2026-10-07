import { describe, expect, it } from 'vitest';
import { layoutFlow, NODE_W, NODE_H, COL_GAP, ROW_GAP } from './flow';
import type { ProjectFlow } from '@/types/site';

const linear: ProjectFlow = {
  nodes: [
    { id: 'a', label: 'A', kind: 'source' },
    { id: 'b', label: 'B', kind: 'process' },
    { id: 'c', label: 'C', kind: 'process' },
    { id: 'd', label: 'D', kind: 'output' },
  ],
  edges: [
    { from: 'a', to: 'b' },
    { from: 'b', to: 'c', label: 'TCP' },
    { from: 'c', to: 'd' },
  ],
};

const fanOut: ProjectFlow = {
  nodes: [
    { id: 's', label: 'S', kind: 'source' },
    { id: 'p', label: 'P', kind: 'process' },
    { id: 'o1', label: 'O1', kind: 'output' },
    { id: 'o2', label: 'O2', kind: 'output' },
    { id: 'o3', label: 'O3', kind: 'output' },
  ],
  edges: [
    { from: 's', to: 'p' },
    { from: 'p', to: 'o1' },
    { from: 'p', to: 'o2' },
    { from: 'p', to: 'o3' },
  ],
};

describe('layoutFlow', () => {
  it('gives every process node its own column, between sources and outputs', () => {
    const { nodes } = layoutFlow(linear);
    const col = Object.fromEntries(nodes.map((n) => [n.id, n.col]));
    expect(col).toEqual({ a: 0, b: 1, c: 2, d: 3 });
  });

  it('places columns left to right with a fixed gap', () => {
    const { nodes } = layoutFlow(linear);
    const xs = nodes.map((n) => n.x);
    expect(xs).toEqual([0, 1, 2, 3].map((i) => i * (NODE_W + COL_GAP)));
  });

  it('stacks several outputs in one column and centres shorter columns', () => {
    const { nodes, height } = layoutFlow(fanOut);
    const outs = nodes.filter((n) => n.kind === 'output');
    expect(new Set(outs.map((n) => n.col)).size).toBe(1);
    expect(outs.map((n) => n.y)).toEqual([0, 1, 2].map((i) => i * (NODE_H + ROW_GAP)));
    expect(height).toBe(3 * NODE_H + 2 * ROW_GAP);
    const p = nodes.find((n) => n.id === 'p')!;
    expect(p.y + NODE_H / 2).toBe(height / 2);
  });

  it('draws edges from the right edge of the source to the left edge of the target', () => {
    const { nodes, edges } = layoutFlow(linear);
    const a = nodes.find((n) => n.id === 'a')!;
    const b = nodes.find((n) => n.id === 'b')!;
    expect(edges[0].x1).toBe(a.x + NODE_W);
    expect(edges[0].x2).toBe(b.x);
    expect(edges[0].d.startsWith(`M${a.x + NODE_W},${a.y + NODE_H / 2}`)).toBe(true);
    expect(edges[1].label).toBe('TCP');
  });

  it('routes edges that skip a column through a lane below the nodes', () => {
    const skip: ProjectFlow = {
      nodes: [
        { id: 's', label: 'S', kind: 'source' },
        { id: 'p1', label: 'P1', kind: 'process' },
        { id: 'p2', label: 'P2', kind: 'process' },
        { id: 'o', label: 'O', kind: 'output' },
      ],
      edges: [
        { from: 's', to: 'p1' },
        { from: 'p1', to: 'p2' },
        { from: 'p2', to: 'o' },
        { from: 'p1', to: 'o' },
      ],
    };
    const { edges, height } = layoutFlow(skip);
    const nodesBottom = NODE_H;
    expect(height).toBeGreaterThan(nodesBottom);
    const lane = edges[3].d.match(/V([\d.]+)/g)!.map((v) => Number(v.slice(1)));
    expect(Math.max(...lane)).toBeGreaterThan(nodesBottom);
    expect(Math.max(...lane)).toBeLessThanOrEqual(height);
  });

  it('reports overall width', () => {
    expect(layoutFlow(linear).width).toBe(4 * NODE_W + 3 * COL_GAP);
  });

  it('throws when an edge points to an unknown node', () => {
    expect(() =>
      layoutFlow({ nodes: linear.nodes, edges: [{ from: 'a', to: 'zz' }] }),
    ).toThrow(/zz/);
  });
});
