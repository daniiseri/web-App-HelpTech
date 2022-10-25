import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className=" w-[100%] bg-gray-900 flex-1 px-4 py-3 text-bronw-100 focus:right-2 focus:ring-bronw-500 placeholder-gray-800 rounded"
      {...props}
    />
  );
}
