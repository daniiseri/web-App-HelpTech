import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  asChild?: boolean;
}

export function Text({ children, asChild }: TextProps) {
  const Component = asChild ? Slot : "span";

  return (
    <Component className="bg-tranparent text-bronw-100 focus:text-bronw-500">
      {children}
    </Component>
  );
}
