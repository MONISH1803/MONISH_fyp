/**
 * Run: npx tsx src/auditSelfTest.ts
 * Validates governing limit-state picker (tolerance-safe mode labels).
 */
import assert from 'assert';
import { nearEqual, pickGoverningLimitState } from './governingCapacity';

assert.strictEqual(pickGoverningLimitState(100, 50, 80).final, 50);
assert.strictEqual(pickGoverningLimitState(100, 50, 80).mode, 'Rupture');

assert.strictEqual(pickGoverningLimitState(100, 200, 90).final, 90);
assert.strictEqual(pickGoverningLimitState(100, 200, 90).mode, 'Block Shear');

assert.strictEqual(pickGoverningLimitState(100, 100, 0).final, 100);
assert.strictEqual(pickGoverningLimitState(100, 100, 0).mode, 'Yielding');

assert.ok(nearEqual(1.000000001, 1.0));

console.log('auditSelfTest: OK');
