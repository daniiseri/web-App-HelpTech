import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function SecundaryButton({ children, ...props }: ButtonProps) {
  return (
    <button
      className=" flex-1 text-bronw-100 bg-bronw-500 hover:bg-bronw-300 px-4 py-3 rounded"
      {...props}
    >
      {children}
    </button>
  );
}
