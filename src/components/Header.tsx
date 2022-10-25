import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <div className=" flex-1 bg-gray-900 flex justify-center gap-4 items-center px-3 py-4">
      {children}
    </div>
  );
}
