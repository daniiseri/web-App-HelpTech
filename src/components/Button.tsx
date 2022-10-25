import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="flex-1 text-bronw-100 bg-acqua-marine-800 hover:bg-acqua-marine-700 px-4 py-3 rounded"
      {...props}
    >
      {children}
    </button>
  );
}
