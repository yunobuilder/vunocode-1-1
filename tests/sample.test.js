import { describe, it, expect } from 'vitest';
import { audit } from '../src/utils/audit';
describe('Audit util', () => {
  it('should export a function', () => {
    expect(typeof audit).toBe('function');
  });
});
