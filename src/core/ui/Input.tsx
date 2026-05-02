import { InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

function Input({ children, ...props }: InputProps) {
  return (
    <input {...props}>
      {children}
    </input>
  );
}

export default Input;