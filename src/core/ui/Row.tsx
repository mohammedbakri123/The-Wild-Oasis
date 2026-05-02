import { type ReactNode } from "react";
import styled, { css } from "styled-components";

interface RowProps {
  children?: ReactNode;
  type?: "horizontal" | "vertical";
}

const types = {
  horizontal: css`
    justify-content: space-between;
    align-items: center;
  `,
  vertical: css`
    flex-direction: column;
    gap: 1.6rem;
  `,
};

const StyledRow = styled.div<{ $type: string }>`
  display: flex;
  ${(props) => props.$type && types[props.$type as keyof typeof types]}
`;

function Row({ children, type = "horizontal" }: RowProps) {
  return <StyledRow $type={type}>{children}</StyledRow>;
}

export default Row;
