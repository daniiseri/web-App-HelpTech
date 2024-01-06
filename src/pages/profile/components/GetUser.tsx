import { FormEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { Text } from "../../../components/Text";
import { useAuth } from "../../../context/Auth";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Field } from "../../../components/Field";

import { gql, useMutation } from "@apollo/client";

const UPDATE_USER = gql`
  mutation ($password: String!, $email: String!, $name: String!, $id: Float!) {
    updateUser(password: $password, email: $email, name: $name, id: $id)
  }
`;

export function GetUser() {
  const { user, signIn, loading } = useAuth();

  if(loading || !user){
    return <h1>Carregando...</h1>;
  }

  const { id } = user;

  const [name, setName] = useState<string>(() => user.name);
  const [email, setEmail] = useState<string>(() => user.email);
  const [password, setPassword] = useState<string>(() => user.password);

  const [hidden, setHidden] = useState<boolean>(true);

  const [update] = useMutation(UPDATE_USER);

  function handle(event: FormEvent) {
    event.preventDefault();

    update({
      variables: {
        name,
        email,
        password,
        id: parseFloat(`${id}`),
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
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        required
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Field>
        <Input
          required
          type={hidden ? "password" : "text"}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {hidden ? (
          <MdVisibility
            className="text-bronw-100 hover:cursor-pointer hover:opacity-80"
            onClick={() => setHidden(false)}
          />
        ) : (
          <MdVisibilityOff
            className="text-bronw-100 hover:cursor-pointer hover:opacity-80"
            onClick={() => setHidden(true)}
          />
        )}
      </Field>
      <Button>
        <Text>Salvar</Text>
      </Button>
    </Form>
  );
}
