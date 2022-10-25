import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="w-56 h-72 py-3 px-4 bg-gray-900 flex flex-col gap-2 overflow-hidden rounded">
      {children}
    </div>
  );
}
