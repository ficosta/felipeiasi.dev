import type { FlowKind, ProjectFlow } from '@/types/site';

export const NODE_W = 192;
export const NODE_H = 64;
export const COL_GAP = 72;
export const ROW_GAP = 16;
const LANE_STEP = 10;

export interface PlacedNode {
  id: string;
  label: string;
  tech?: string;
  kind: FlowKind;
  col: number;
  x: number;
  y: number;
}

export interface PlacedEdge {
  from: string;
  to: string;
  label?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  d: string;
  /** label anchor */
  lx: number;
  ly: number;
}

export interface FlowLayout {
  nodes: PlacedNode[];
  edges: PlacedEdge[];
  width: number;
  height: number;
}

/**
 * Columns: all sources, then one column per process node (in array order,
 * so a pipeline reads left to right), then all outputs.
 */
function assignColumns(flow: ProjectFlow): number[] {
  const processCount = flow.nodes.filter((n) => n.kind === 'process').length;
  let nextProcess = 1;
  return flow.nodes.map((n) => {
    if (n.kind === 'source') return 0;
    if (n.kind === 'output') return processCount + 1;
    return nextProcess++;
  });
}

export function layoutFlow(flow: ProjectFlow): FlowLayout {
  const cols = assignColumns(flow);
  const colCount = Math.max(...cols) + 1;
  const columns: number[][] = Array.from({ length: colCount }, () => []);
  cols.forEach((c, i) => columns[c].push(i));

  const tallest = Math.max(...columns.map((c) => c.length));
  const height = tallest * NODE_H + (tallest - 1) * ROW_GAP;

  const nodes: PlacedNode[] = new Array(flow.nodes.length);
  columns.forEach((members, col) => {
    const colHeight = members.length * NODE_H + (members.length - 1) * ROW_GAP;
    const offset = (height - colHeight) / 2;
    members.forEach((nodeIndex, row) => {
      const n = flow.nodes[nodeIndex];
      nodes[nodeIndex] = {
        ...n,
        col,
        x: col * (NODE_W + COL_GAP),
        y: offset + row * (NODE_H + ROW_GAP),
      };
    });
  });

  const byId = new Map(nodes.map((n) => [n.id, n]));
  let lanes = 0;
  const edges = flow.edges.map((e): PlacedEdge => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) {
      throw new Error(`Flow edge references unknown node: ${!a ? e.from : e.to}`);
    }

    // An edge that skips a column would cut through the node in between, so it
    // leaves from the bottom, runs along a lane under the diagram and rises
    // into the target.
    if (b.col - a.col > 1) {
      const laneY = height + ROW_GAP * 1.5 + lanes * LANE_STEP;
      lanes += 1;
      const x1 = a.x + NODE_W / 2;
      const y1 = a.y + NODE_H;
      const x2 = b.x + NODE_W / 2;
      const y2 = b.y + NODE_H;
      const d = `M${x1},${y1} V${laneY} H${x2} V${y2}`;
      return { ...e, x1, y1, x2, y2, d, lx: x1 + (x2 - x1) / 2, ly: laneY - 6 };
    }

    const x1 = a.x + NODE_W;
    const y1 = a.y + NODE_H / 2;
    const x2 = b.x;
    const y2 = b.y + NODE_H / 2;
    const mid = x1 + (x2 - x1) / 2;
    const d = y1 === y2 ? `M${x1},${y1} H${x2}` : `M${x1},${y1} H${mid} V${y2} H${x2}`;
    return { ...e, x1, y1, x2, y2, d, lx: mid, ly: y2 - 8 };
  });

  return {
    nodes,
    edges,
    width: colCount * NODE_W + (colCount - 1) * COL_GAP,
    height: lanes ? height + ROW_GAP * 2 + (lanes - 1) * LANE_STEP : height,
  };
}
