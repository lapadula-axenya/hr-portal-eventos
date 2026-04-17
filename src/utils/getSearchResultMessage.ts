import { plural } from "@umatch/pluralize-ptbr";

type Gender = "male" | "female";

export function getSearchResultMessage(
  items: number = 0,
  entity: string,
  gender: Gender = "male",
): string {
  const participle = gender === "male" ? "encontrado" : "encontrada";
  return `${items} ${plural(entity, items)} ${plural(participle, items)}`;
}
