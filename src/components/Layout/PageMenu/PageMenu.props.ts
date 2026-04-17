import { Dispatch, SetStateAction } from "react";

export type PageMenuProps = {
  isDashboardOnly: boolean;
  isExpandedPinned: boolean;
  isHover: boolean;
  onChangeIsExpandedPinned: Dispatch<SetStateAction<boolean>>;
  onChangeIsHover: Dispatch<SetStateAction<boolean>>;
};
