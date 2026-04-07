/**
 * Governing limit-state selection for tension member (yield / rupture / block shear).
 * Uses tolerance so mode labels match min() when values tie within floating-point noise.
 */

export const CAPACITY_EPS = 1e-6;

export function nearEqual(a: number, b: number, eps = CAPACITY_EPS): boolean {
  return Math.abs(a - b) < eps;
}

export type GoverningMode = 'Yielding' | 'Rupture' | 'Block Shear';

/**
 * final = min(yield, rupture, blockShear if > 0); mode = which limit state achieves final (first in tie order).
 */
export function pickGoverningLimitState(
  yieldStrength: number,
  ruptureStrength: number,
  blockShearStrength: number
): { final: number; mode: GoverningMode } {
  const modes: Array<{ mode: GoverningMode; v: number }> = [
    { mode: 'Yielding', v: yieldStrength },
    { mode: 'Rupture', v: ruptureStrength },
  ];
  if (blockShearStrength > 0) {
    modes.push({ mode: 'Block Shear', v: blockShearStrength });
  }
  const final = Math.min(...modes.map((m) => m.v));
  const winner = modes.find((m) => nearEqual(m.v, final)) ?? modes[0];
  return { final, mode: winner.mode };
}
