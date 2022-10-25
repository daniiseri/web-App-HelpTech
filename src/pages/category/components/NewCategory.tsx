import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_CATEGORY } from "../index";
import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";

const CREATE_CATEGORY = gql`
  mutation ($newCategoryInput: NewCategoryInput!) {
    createCategory(newCategoryInput: $newCategoryInput)
  }
`;

export function NewCategory() {
  const [create] = useMutation(CREATE_CATEGORY);
  const [description, setDescription] = useState<string>("");

  async function handle(event: FormEvent) {
    event.preventDefault();

    const newCategoryInput = { description };

    await create({
      variables: {
        newCategoryInput,
      },
      onError: ({ message }) => alert(message),
      onCompleted: () => {
        setDescription("");
      },
      refetchQueries: [GET_CATEGORY],
    });
  }

  return (
    <Form onSubmit={handle} title="Nova categoria">
      <Input
        required
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button>Criar</Button>
    </Form>
  );
}
