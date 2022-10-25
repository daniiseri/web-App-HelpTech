import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className=" max-w-7xl flex-1 flex justify-around flex-wrap gap-4 bg-tranparent">
      {children}
    </div>
  );
}
