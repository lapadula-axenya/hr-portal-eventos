export function useUniqueIds() {
  const generateIds = (length: number) => {
    return Array.from({ length }, () => ({ id: crypto.randomUUID() }));
  };

  return { generateIds };
}
