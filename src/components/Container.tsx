import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className=" w-screen max-w-7xl flex-1 flex flex-col flex-wrap gap-4 bg-tranparent items-center">
      {children}
    </div>
  );
}
