import {
  ChartNoAxesCombinedIcon,
  FilePlusIcon,
  SlidersVerticalIcon,
  SquareMenuIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { PageMenuProps } from "@/components";
import { AppRoutes } from "@/config/appRoutes";

const menuItems = [
  {
    label: "Posição Cadastral",
    path: AppRoutes.MAIN.REGISTRATION_STATUS,
    icon: SquareMenuIcon,
  },
  {
    label: "Analytics",
    path: AppRoutes.MAIN.ANALYTICS,
    icon: ChartNoAxesCombinedIcon,
  },
  {
    label: "Movimentações",
    path: AppRoutes.MAIN.MOVIMENTATIONS,
    icon: SlidersVerticalIcon,
  },
  // TODO: Item ocultado devido a pendências no backend, reativar quando a API estiver pronta.
  // {
  //   label: "Faturas",
  //   path: AppRoutes.MAIN.INVOICES,
  //   icon: ReceiptIcon,
  // },
  {
    label: "Apólices",
    path: AppRoutes.MAIN.POLICIES,
    icon: FilePlusIcon,
  },
];

export function usePageMenu({
  isDashboardOnly,
  isExpandedPinned,
  isHover,
  onChangeIsExpandedPinned,
  onChangeIsHover,
}: PageMenuProps) {
  const pathname = usePathname();

  const isExpanded = isExpandedPinned || isHover;

  const filteredMenuItems = menuItems;

  const handleMouseEnter = () => {
    if (!isExpandedPinned) {
      onChangeIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    onChangeIsHover(false);
  };

  const handleClick = () => {
    onChangeIsExpandedPinned((currentValue) => {
      const newValue = !currentValue;
      localStorage.setItem("isExpandedPinned", String(newValue));
      return newValue;
    });
    if (isExpandedPinned) {
      onChangeIsHover(false);
    }
  };

  const isMenuItemActive = (path: string) =>
    path === "/" ? pathname === path : pathname.startsWith(path);

  return {
    isHover,
    menuItems: filteredMenuItems,
    isExpanded,
    isExpandedPinned,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    isMenuItemActive,
    onChangeIsHover,
  };
}
