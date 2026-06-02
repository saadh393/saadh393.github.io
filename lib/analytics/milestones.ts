export const READ_MILESTONES = [25, 50, 75, 100] as const;

export function crossedMilestones(
  prevPercent: number,
  currentPercent: number,
  milestones: readonly number[] = READ_MILESTONES
): number[] {
  return milestones.filter((m) => prevPercent < m && currentPercent >= m);
}

export function scrollPercent(scrollTop: number, scrollHeight: number, viewport: number): number {
  const scrollable = scrollHeight - viewport;
  if (scrollable <= 0) return 100;
  return Math.min(100, Math.round((scrollTop / scrollable) * 100));
}
