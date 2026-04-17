import { PageTableSkeletonProps } from "@/components";
import { useUniqueIds } from "@/hooks/useUniqueIds";

export function usePageTableSkeleton(props: PageTableSkeletonProps) {
  const { generateIds } = useUniqueIds();

  const skeletonRows = generateIds(4);
  const skeletonCells = generateIds(props.skeletonCells);

  return { skeletonRows, skeletonCells };
}
