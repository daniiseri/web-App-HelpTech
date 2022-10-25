import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <div className=" bg-tecnology max-w-[100vw] min-h-[100vh] h-auto flex-1 bg-fixed bg-cover bg-no-repeat bg-blend-multiply flex justify-center items-center py-3 px-4">
      {children}
    </div>
  );
}
