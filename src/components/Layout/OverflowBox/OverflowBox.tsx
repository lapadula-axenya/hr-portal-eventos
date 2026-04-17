import { forwardRef, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import {
  OverflowBoxProps,
  overflowBoxContainerStyles,
  overflowBoxItemStyles,
} from "@/components";

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref != null) {
    (ref as React.RefObject<T | null>).current = value;
  }
}

export const OverflowBox = forwardRef<HTMLDivElement, OverflowBoxProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    const maxHeight = props?.maxHeight ?? "100%";

    useEffect(() => {
      const element = innerRef.current;
      if (!element) return;
      setIsOverflow(element.scrollHeight > element.clientHeight);
    }, [props.children]);

    useEffect(() => {
      const element = innerRef.current;
      if (!element) return;

      setIsOverflow(element.scrollHeight > element.clientHeight);
    }, [props.children]);

    return (
      <Box
        ref={(node: HTMLDivElement | null) => {
          innerRef.current = node;
          setRef(ref, node);
        }}
        sx={[
          overflowBoxContainerStyles(maxHeight, isOverflow),
          ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
        ]}
      >
        <Box sx={overflowBoxItemStyles(props?.spacing)}>{props.children}</Box>
      </Box>
    );
  },
);

OverflowBox.displayName = "OverflowBox";
