import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { SecundaryButton } from "../../../components/SecundaryButton";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/Auth";
import { FormEvent, useState } from "react";

import { AiOutlineLoading, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { signIn, loading } = useAuth();

  async function handle(event: FormEvent) {
    event.preventDefault();

    await signIn({ email, password });

    navigate('/')
    location.reload()
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
      <Button type="submit">
        {
          loading
            ?
            (
              <>
                <AiOutlineLoading />
                Carregando...
              </>
            )
            : (
              <>
                <AiOutlineLogin />
                Entrar
              </>
            )
        }
      </Button>
      <SecundaryButton type="button" onClick={() => navigate("/register")}>
        <AiOutlineUserAdd />
        Cadastre-se
      </SecundaryButton>
    </Form>
  );
}
