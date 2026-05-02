import { type SelectHTMLAttributes } from "react";

interface SortByProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string }[];
}

function SortBy({ options = [], ...props }: SortByProps) {
  return (
    <select {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;