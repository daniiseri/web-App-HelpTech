import { OptionHTMLAttributes, ReactNode } from "react";

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children?: ReactNode;
}

export function Option({ children, ...props }: OptionProps) {
  return (
    <option className="" {...props}>
      {children}
    </option>
  );
}
