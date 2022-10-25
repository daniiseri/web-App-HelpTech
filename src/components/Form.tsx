import { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export function Form({ children, title, ...props }: FormProps) {
  return (
    <form
      className="md:w-[300px] bg-gray-800 flex flex-col rounded gap-3 py-3 px-4 "
      {...props}
    >
      <h1 className="text-bronw-100 text-2xl text-center">{title}</h1>
      {children}
    </form>
  );
}
