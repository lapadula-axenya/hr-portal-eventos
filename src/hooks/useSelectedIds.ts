import { useState } from "react";

export function useSelectedIds(allIdsCount: number) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isAllSelectedIds = selectedIds.length === allIdsCount;
  const selectedIdsCount = selectedIds.length;
  const hasSelectedIds = selectedIdsCount > 0;

  const checkSelectedId = (id?: string) => !!id && selectedIds.includes(id);

  const toggleSelectedId = (id?: string) => {
    if (!id) return;

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id],
    );
  };

  const toggleAllSelectedIds = <T extends { id: string }>(items: T[]) => {
    const newValue = isAllSelectedIds ? [] : items.map((item) => item.id);
    setSelectedIds(newValue);
  };

  const clearSelectedIds = () => {
    setSelectedIds([]);
  };

  return {
    checkSelectedId,
    clearSelectedIds,
    hasSelectedIds,
    isAllSelectedIds,
    selectedIds,
    selectedIdsCount,
    toggleAllSelectedIds,
    toggleSelectedId,
  };
}
