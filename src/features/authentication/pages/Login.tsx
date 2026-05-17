import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Logo from "../../../core/ui/Logo";
import Heading from "../../../core/ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />

      <div style={{ textAlign: "center" }}>
        <Heading as="h2">Login to your Account</Heading>
      </div>

      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
