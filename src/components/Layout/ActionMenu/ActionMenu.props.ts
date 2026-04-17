import { MenuProps } from "@mui/material";
import { LucideIcon, LucideProps } from "lucide-react";

export type ActionMenuItem = {
  id: string;
  label: string;
  action: () => void | Promise<void>;
  icon?: LucideIcon;
  iconStyle?: LucideProps;
  disabled?: boolean;
  divider?: boolean;
};

export type ActionMenuProps = MenuProps & {
  menuItems: ActionMenuItem[];
};
