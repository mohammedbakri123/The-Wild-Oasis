import { type ReactNode } from "react";

interface HeadingProps {
  children?: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Heading({ children, as: asProp = "h1" }: HeadingProps) {
  const Component = asProp;
  return <Component>{children}</Component>;
}

export default Heading;