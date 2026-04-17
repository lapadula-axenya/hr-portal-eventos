import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import {
  ActionMenuProps,
  actionMenuContainerStyles,
  actionMenuItemStyles,
} from "@/components";

export function ActionMenu(props: ActionMenuProps) {
  return (
    <Menu
      open={props.open}
      anchorEl={props.anchorEl}
      {...actionMenuContainerStyles}
      onClose={props.onClose}
    >
      {props.menuItems.map((item) => [
        item.divider && props.menuItems.length > 1 && (
          <Box key={`divider-${item.id}`} sx={{ height: "1rem" }} />
        ),
        <MenuItem
          key={`menu-item-${item.id}`}
          onClick={() => {
            if (item?.disabled) return;
            item.action();
          }}
          disabled={item?.disabled}
          sx={{ minWidth: "120px" }}
        >
          <Stack {...actionMenuItemStyles}>
            {item?.icon && (
              <item.icon size={14} {...(item?.iconStyle && item?.iconStyle)} />
            )}
            <Typography>{item.label}</Typography>
          </Stack>
        </MenuItem>,
      ])}
    </Menu>
  );
}
