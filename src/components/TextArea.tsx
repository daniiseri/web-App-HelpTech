import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea(props: TextAreaProps) {
  return (
    <textarea
      className="bg-gray-900 text-bronw-100 px-4 py-3 placeholder-gray-800 h-[200px] rounded"
      {...props}
    />
  );
}
