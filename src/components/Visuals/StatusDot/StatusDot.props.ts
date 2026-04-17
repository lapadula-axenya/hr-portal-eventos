export enum StatusDotColor {
  SUCCESS = "success.main",
  WARNING = "warning.main",
  ERROR = "error.main",
  GREY = "grey.100",
}

export type StatusDotProps = {
  color: StatusDotColor;
  size?: number;
};
