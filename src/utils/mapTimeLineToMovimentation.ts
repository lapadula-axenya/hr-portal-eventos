import { dayjsTz } from "@/lib/dayjsTz";
import { BenefitMovimentation, TimeLineEvent } from "@/services/benefitService";

export function mapTimeLineToMovimentation(
  timeLine?: TimeLineEvent[],
): BenefitMovimentation[] {
  if (!timeLine?.length) return [];

  const decorated = timeLine.map((item, idx) => ({
    item,
    idx,
    ts: dayjsTz(item.date).valueOf() || 0,
  }));

  const sortedDecorated =
    typeof decorated.toSorted === "function"
      ? decorated.toSorted((a, b) => {
          const diff = b.ts - a.ts;
          if (diff !== 0) return diff;
          return b.idx - a.idx;
        })
      : decorated.slice().sort((a, b) => {
          const diff = b.ts - a.ts;
          if (diff !== 0) return diff;
          return b.idx - a.idx;
        });

  const sortedTimeLine = sortedDecorated.map((d) => d.item);

  const seen = new Set<string>();
  const unique: TimeLineEvent[] = [];

  for (const t of sortedTimeLine) {
    const day = dayjsTz(t.date).format("YYYY-MM-DD");
    const key = `${t.status}-${day}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(t);
  }

  return unique.map((timeline) => ({
    id: `${timeline.status}-${timeline.date}`,
    status: timeline.status,
    updatedAt: timeline.date ?? "",
  }));
}
