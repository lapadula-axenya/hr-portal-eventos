import { Collapse, IconButton, Stack, Typography } from "@mui/material";
import { ChevronRightIcon, PinIcon } from "lucide-react";
import Link from "next/link";
import {
  BrandLogo,
  BrandLogoCompact,
  usePageMenu,
  PageMenuProps,
  pageMenuButtonCollapseContainerStyles,
  pageMenuButtonCollapseIconPinStyles,
  pageMenuButtonCollapseIconStyles,
  pageMenuButtonCollapseStyles,
  pageMenuContainerStyles,
  pageMenuLogoStyles,
  pageMenuNavItemLabelStyles,
  pageMenuNavItemStyles,
  pageMenuNavStyles,
} from "@/components";
import { AppRoutes } from "@/config/appRoutes";

export function PageMenu(props: PageMenuProps) {
  const {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    isExpanded,
    isExpandedPinned,
    isHover,
    isMenuItemActive,
    menuItems,
  } = usePageMenu(props);

  return (
    <Stack
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...pageMenuContainerStyles(isExpanded)}
    >
      <Stack component={Link} href={AppRoutes.MAIN.HOME}>
        <Stack {...pageMenuLogoStyles}>
          <Collapse in={!isExpanded}>
            <BrandLogoCompact />
          </Collapse>
        </Stack>

        <Stack {...pageMenuLogoStyles}>
          <Collapse in={isExpanded} orientation="horizontal">
            <BrandLogo height={44} />
          </Collapse>
        </Stack>
      </Stack>

      <Stack {...pageMenuNavStyles}>
        {menuItems.map((item) => (
          <Stack
            key={item.label}
            component={Link}
            href={item.path}
            sx={pageMenuNavItemStyles(isMenuItemActive(item.path))}
          >
            <Stack>
              <item.icon />
            </Stack>
            <Collapse in={isExpanded} orientation="horizontal">
              <Typography {...pageMenuNavItemLabelStyles}>
                {item.label}
              </Typography>
            </Collapse>
          </Stack>
        ))}
      </Stack>

      <Stack {...pageMenuButtonCollapseContainerStyles}>
        <IconButton onClick={handleClick} {...pageMenuButtonCollapseStyles}>
          {(isHover || isExpandedPinned) && (
            <PinIcon
              {...pageMenuButtonCollapseIconPinStyles(isExpandedPinned)}
            />
          )}
          {!isHover && !isExpandedPinned && (
            <ChevronRightIcon
              {...pageMenuButtonCollapseIconStyles(isExpanded)}
            />
          )}
        </IconButton>
      </Stack>
    </Stack>
  );
}
