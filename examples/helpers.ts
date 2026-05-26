/** Build a section header with an underline separator. */
export function header(title: string): string {
  const line = "\u2500".repeat(Math.min(title.length, 50));
  return `\n${title}\n${line}`;
}

/** Build a labeled field line with optional formatting of the value. */
export function field(label: string, value: unknown): string {
  return `  ${label}: ${value ?? "N/A"}`;
}

/** Build an indented sub-header line. */
export function sub(title: string): string {
  return `\n  [${title}]`;
}

/** Build an enumerated list of items using a render callback. */
export function list<T>(items: T[], render: (item: T, i: number) => string, max?: number): string {
  const sliced = max ? items.slice(0, max) : items;
  if (sliced.length === 0) return "  (none)";
  return sliced.map((item, i) => `  ${i + 1}. ${render(item, i)}`).join("\n");
}

/** Build a count summary line. */
export function count(label: string, n: number): string {
  return `  ${label}: ${n}`;
}
