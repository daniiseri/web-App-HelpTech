import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { CategoryList } from "../../../components/CategoryList";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { Text } from "../../../components/Text";

import { GET_QUEST } from "../index";

const CREATE_QUEST = gql`
  mutation ($idCategory: Float!, $description: String!) {
    createQuest(idCategory: $idCategory, description: $description)
  }
`;

export function NewQuest() {
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(0);

  const [create] = useMutation(CREATE_QUEST);

  async function handle(event: FormEvent) {
    event.preventDefault();

    await create({
      variables: {
        description,
        idCategory: category,
      },
      onError: ({ message }) => alert(message),
      onCompleted: () => {
        setDescription("");
        setCategory(0);
      },
      refetchQueries: [GET_QUEST],
    });
  }

  return (
    <Form onSubmit={handle} title="Nova quest">
      <Input
        required
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <CategoryList
        required
        value={category}
        onChange={(e) => setCategory(parseFloat(e.target.value))}
      />
      <Button type="submit">
        <Text>Criar</Text>
      </Button>
    </Form>
  );
}
