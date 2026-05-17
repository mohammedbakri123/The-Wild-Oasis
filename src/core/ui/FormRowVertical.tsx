import styled from "styled-components";
import { type ReactNode } from "react";

interface FormRowVerticalProps {
  label: string;
  children: ReactNode;
}

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

function FormRowVertical({ label, children }: FormRowVerticalProps) {
  return (
    <StyledFormRowVertical>
      <Label>{label}</Label>
      {children}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
