import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { SecundaryButton } from "../../../components/SecundaryButton";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/Auth";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { signIn } = useAuth();

  function handle(event: FormEvent) {
    event.preventDefault();

    signIn({ email, password });
  }

  return (
    <Form onSubmit={handle}>
      <Input
        required
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Entrar</Button>
      <SecundaryButton type="button" onClick={() => navigate("/register")}>
        Cadastre-se
      </SecundaryButton>
    </Form>
  );
}
