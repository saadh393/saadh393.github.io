export interface TechniqueResult {
  name: string;
  accuracy: number;
  costPerMillion: number;
}

export interface PromptCase {
  label: string;
  unit: string;
  note?: string;
  items?: number;
  rows: TechniqueResult[];
}

export function tradeTotal(row: TechniqueResult, requests: number, mistakeCost: number) {
  const promptBill = (row.costPerMillion * requests) / 1_000_000;
  const wrong = requests * (1 - row.accuracy / 100);
  const mistakeBill = wrong * mistakeCost;
  return { promptBill, wrong, mistakeBill, total: promptBill + mistakeBill };
}

export function formatDollars(value: number) {
  if (value === 0) return "$0";
  if (value < 0.01) return `$${value.toFixed(3)}`;
  if (value < 100) return `$${value.toFixed(2)}`;
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function parseCases(raw: string): PromptCase[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((c) => c && Array.isArray(c.rows) && c.rows.length) : [];
  } catch {
    return [];
  }
}
