import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { Text } from "../../../components/Text";

import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useAuth } from "../../../context/Auth";

import { AiOutlineUserAdd } from "react-icons/ai";

const CREATE_USER = gql`
  mutation ($newUserInput: NewUserInput!) {
    createUser(newUserInput: $newUserInput)
  }
`;

export function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [create_user] = useMutation(CREATE_USER);

  const { signIn } = useAuth();

  async function handle(event: FormEvent) {
    event.preventDefault();

    const newUserInput = { name, email, password };

    await create_user({
      variables: {
        newUserInput,
      },
      onError: ({ message }) => alert(message),
      onCompleted: () => {
        signIn({ email, password });
      },
    });
  }

  return (
    <Form onSubmit={handle}>
      <Input
        required
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <Button>
        <AiOutlineUserAdd />
        <Text>Cadastre-se</Text>
      </Button>
    </Form>
  );
}
