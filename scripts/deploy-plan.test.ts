import { describe, expect, it } from 'vitest';
import { planUploads } from './deploy-plan.ts';

describe('planUploads', () => {
  const local = new Map([
    ['index.html', 'AAA'],
    ['assets/index-1.js', 'BBB'],
    ['assets/projects/demo.mp4', 'CCC'],
  ]);

  it('uploads everything to an empty zone', () => {
    expect(planUploads(local, new Map())).toEqual(['assets/index-1.js', 'assets/projects/demo.mp4', 'index.html']);
  });

  it('skips files whose checksum already matches', () => {
    const remote = new Map([
      ['index.html', 'OLD'],
      ['assets/index-1.js', 'BBB'],
      ['assets/projects/demo.mp4', 'CCC'],
    ]);
    expect(planUploads(local, remote)).toEqual(['index.html']);
  });

  it('compares checksums without regard to case', () => {
    expect(planUploads(new Map([['a.svg', 'abc']]), new Map([['a.svg', 'ABC']]))).toEqual([]);
  });

  it('always sends index.html last, so new assets exist before the page points at them', () => {
    const order = planUploads(local, new Map());
    expect(order[order.length - 1]).toBe('index.html');
  });
});
