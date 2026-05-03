import styled from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";

const Aside = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  padding: 4rem 2rem;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function Sidebar() {
  return (
    <Aside>
      <Logo />
      <MainNav />
    </Aside>
  );
}
