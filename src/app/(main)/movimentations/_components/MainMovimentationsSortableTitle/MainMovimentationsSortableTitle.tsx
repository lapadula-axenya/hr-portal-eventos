import { Box, IconButton, Stack } from "@mui/material";
import { ChevronsDownUpIcon } from "lucide-react";
import { useTicketParamsContext } from "@/contexts/TicketParamsContext";
import { TicketFilterSortBy } from "@/services/ticketService";

export function MainMovimentationsSortableTitle(props: {
  title: string;
  sortBy: [TicketFilterSortBy, TicketFilterSortBy];
}) {
  const { setSortBy } = useTicketParamsContext();

  const handleClick = () => {
    setSortBy((prevValue) => {
      return prevValue === props.sortBy[0] ? props.sortBy[1] : props.sortBy[0];
    });
  };

  return (
    <Stack direction="row" spacing="4px" color="grey.100">
      <span>{props.title}</span>
      <Box>
        <IconButton onClick={handleClick}>
          <ChevronsDownUpIcon size={12} />
        </IconButton>
      </Box>
    </Stack>
  );
}
