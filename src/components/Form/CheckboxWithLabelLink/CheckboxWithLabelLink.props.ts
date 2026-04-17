export type CheckboxWithLabelLinkProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  labelLink: string;
  linkHref: string;
  helperText?: string;
  disabled?: boolean;
};
