import { type ReactNode } from "react";

interface FormRowVerticalProps {
  label: string;
  children: ReactNode;
}

function FormRowVertical({ label, children }: FormRowVerticalProps) {
  return (
    <div className="form-row form-row-vertical">
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

export default FormRowVertical;