import { describe, expect, it } from 'vitest';
import { caseIdFromSearch, searchForCase } from './caseUrl';

describe('caseIdFromSearch', () => {
  it('reads the case id from the query string', () => {
    expect(caseIdFromSearch('?case=apuracao-2026')).toBe('apuracao-2026');
  });

  it('keeps other parameters out of the way', () => {
    expect(caseIdFromSearch('?utm_source=whatsapp&case=magicwall')).toBe('magicwall');
  });

  it('returns null when no case is open', () => {
    expect(caseIdFromSearch('')).toBeNull();
    expect(caseIdFromSearch('?case=')).toBeNull();
  });
});

describe('searchForCase', () => {
  it('builds the query string for a case', () => {
    expect(searchForCase('?', 'magicwall')).toBe('?case=magicwall');
  });

  it('removes the case and keeps the other parameters', () => {
    expect(searchForCase('?utm_source=whatsapp&case=magicwall', null)).toBe('?utm_source=whatsapp');
    expect(searchForCase('?case=magicwall', null)).toBe('');
  });

  it('round-trips through caseIdFromSearch', () => {
    expect(caseIdFromSearch(searchForCase('', 'cnn-brasil-elections-2026'))).toBe('cnn-brasil-elections-2026');
  });
});
