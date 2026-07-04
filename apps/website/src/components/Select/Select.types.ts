export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Marks the trigger as invalid: sets `aria-invalid` and switches to the danger border/focus ring. */
  invalid?: boolean;
  name?: string;
  className?: string;
  /** Set to pair with an external `Label`'s `htmlFor`. */
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
