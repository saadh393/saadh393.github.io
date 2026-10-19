export interface ZeroShotLabel {
  text: string;
  kind: "find" | "keep";
  similarity: number;
}

export function zeroShotScore(labels: ZeroShotLabel[], logitScale: number) {
  if (labels.length === 0) return { probs: [], junkScore: 0, best: -1 };
  const logits = labels.map((l) => l.similarity * logitScale);
  const max = Math.max(...logits);
  const exps = logits.map((x) => Math.exp(x - max));
  const total = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((e) => e / total);
  const junkScore = probs.reduce((sum, p, i) => (labels[i].kind === "find" ? sum + p : sum), 0);
  const best = probs.indexOf(Math.max(...probs));
  return { probs, junkScore, best };
}
