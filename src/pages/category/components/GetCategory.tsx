import { FormEvent, useState } from "react";

import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { SecundaryButton } from "../../../components/SecundaryButton";

import { gql, useMutation } from "@apollo/client";
import { GET_CATEGORY } from "..";

import { AiFillSave } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";

const DELETE_CATEGORY = gql`
  mutation ($id: Float!) {
    deleteCategory(id: $id)
  }
`;

const UPDATE_CATEGORY = gql`
  mutation ($description: String!, $id: Float!) {
    updateCategory(description: $description, id: $id)
  }
`;

export interface CategoryProps {
  id: number;
  description: string;
}

export function GetCategory(props: CategoryProps) {
  const [del] = useMutation(DELETE_CATEGORY);
  const [update] = useMutation(UPDATE_CATEGORY);
  const [description, setDescription] = useState<string>(props.description);

  async function handleDelete(event: FormEvent) {
    event.preventDefault();

    await del({
      variables: {
        id: parseFloat(`${props.id}`),
      },
      onError: ({ message }) => alert(message),
      refetchQueries: [GET_CATEGORY],
    });
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();

    await update({
      variables: {
        id: parseFloat(`${props.id}`),
        description,
      },
      onError: ({ message }) => alert(message),
      refetchQueries: [GET_CATEGORY],
    });
  }

  return (
    <Form>
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleUpdate}>
        <AiFillSave />
        Salvar
      </Button>
      <SecundaryButton onClick={handleDelete}>
        <RiDeleteBinFill />
        Remover
      </SecundaryButton>
    </Form>
  );
}
