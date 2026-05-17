import { useState } from "react";
import Button from "../../../core/ui/Button";
import Form from "../../../core/ui/Form";
import Input from "../../../core/ui/Input";
import FormRowVertical from "../../../core/ui/FormRowVertical";
import Row from "../../../core/ui/Row";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit}>
      <Row type="vertical">
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label={""}>
          <Button size="large">Login</Button>
        </FormRowVertical>
      </Row>
    </Form>
  );
}

export default LoginForm;
