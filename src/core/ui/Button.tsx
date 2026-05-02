import styled, { css } from "styled-components";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variation?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button<{ $variation?: string; $size?: string }>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--color-white);
  font-size: 1.5rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  ${(props) =>
    props.$variation && variations[props.$variation as keyof typeof variations]}
  ${(props) => props.$size && sizes[props.$size as keyof typeof sizes]}
`;

function Button({
  children,
  variation = "primary",
  size = "medium",
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variation={variation} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
