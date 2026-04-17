import { PropsWithChildren } from "react";

export type FormContainerProps = PropsWithChildren<{
  onSubmit: () => void;
}>;

export type FormErrors<T> = {
  [K in keyof T]?: string;
};
