import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title?: string;
}

export function Section({ children, title }: SectionProps) {
  return (
    <div className="bg-gray-900 rounded px-4 py-3 max-w-3xl flex flex-col gap-4">
      <span className="bg-tranparent text-bronw-100 text-4xl">{title}</span>
      {children}
    </div>
  );
}
