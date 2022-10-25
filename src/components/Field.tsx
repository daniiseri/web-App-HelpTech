import { ReactNode } from "react";

interface Field {
  children: ReactNode;
  direction?: string;
}

export function Field({ children, direction }: Field) {
  const flex = direction ? direction : "row";

  return (
    <div className={`flex flex-${flex} gap-3 items-center mb-4`}>
      {children}
    </div>
  );
}
