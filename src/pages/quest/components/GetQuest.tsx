import { FormEvent, useState } from "react";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";

import { gql, useMutation } from "@apollo/client";
import { Text } from "../../../components/Text";
import { Field } from "../../../components/Field";
import { Button } from "../../../components/Button";
import { SecundaryButton } from "../../../components/SecundaryButton";
import { CategoryList } from "../../../components/CategoryList";
import { GET_QUEST } from "..";

import { AiFillSave } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";

const DELETE_QUEST = gql`
  mutation ($id: Float!) {
    deleteQuest(id: $id)
  }
`;

const UPDATE_QUEST = gql`
  mutation ($idCategory: Float!, $description: String!, $id: Float!) {
    updateQuest(idCategory: $idCategory, description: $description, id: $id)
  }
`;

export interface QuestProps {
  id: number;
  description: string;
  idcategory: number;
}

export function GetQuest(props: QuestProps) {
  const [del] = useMutation(DELETE_QUEST);
  const [update] = useMutation(UPDATE_QUEST);
  const [idCategory, setIdCategory] = useState<number>(props.idcategory || 0);

  const [description, setDescription] = useState(props.description);

  async function handleDelete(event: FormEvent) {
    event.preventDefault();

    await del({
      variables: {
        id: parseFloat(`${props.id}`),
      },
      onError: ({ message }) => alert(message),
      refetchQueries: [GET_QUEST],
    });
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();

    await update({
      variables: {
        id: parseFloat(`${props.id}`),
        idCategory,
        description,
      },
      onError: ({ message }) => alert(message),
      refetchQueries: [GET_QUEST],
    });
  }

  return (
    <Form>
      <Input
        required
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Field direction="col">
        <label htmlFor={`${props.idcategory}`}>
          <Text>Categoria</Text>
        </label>
        <CategoryList
          id={`${props.idcategory}`}
          value={idCategory}
          onChange={(e) => setIdCategory(parseFloat(e.target.value))}
        />
      </Field>

      <Button onClick={handleUpdate}>
        <AiFillSave />
        <Text>Salvar</Text>
      </Button>
      <SecundaryButton onClick={handleDelete}>
        <RiDeleteBinFill />
        <Text>Remover</Text>
      </SecundaryButton>
    </Form>
  );
}
