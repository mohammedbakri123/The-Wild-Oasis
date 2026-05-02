import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 2rem 4.8rem;
`;

export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
