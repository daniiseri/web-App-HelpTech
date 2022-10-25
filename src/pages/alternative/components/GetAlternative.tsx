import { FormEvent, useState } from "react";

import { CategoryList } from "../../../components/CategoryList";
import { Field } from "../../../components/Field";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { QuestList } from "../../../components/QuestList";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { SecundaryButton } from "../../../components/SecundaryButton";

import { GET_ALTERNATIVE } from "../index";

import { gql, useMutation } from "@apollo/client";

const DELETE_ALTERNATIVE = gql`
  mutation ($id: Float!) {
    deleteAlternative(id: $id)
  }
`;

const UPDAT_ALTERNATIVE = gql`
  mutation (
    $idQuests: Float!
    $idCategory: Float!
    $level: Float!
    $description: String!
    $id: Float!
  ) {
    updateAlternative(
      idQuests: $idQuests
      idCategory: $idCategory
      level: $level
      description: $description
      id: $id
    )
  }
`;

export interface AlternativeProps {
  id: number;
  description: string;
  level: number;
  idcategory: number;
  idquest: number;
}

export function GetAlternative({
  idcategory,
  idquest,
  ...props
}: AlternativeProps) {
  const [del] = useMutation(DELETE_ALTERNATIVE);
  const [update] = useMutation(UPDAT_ALTERNATIVE);

  const [category, setCategory] = useState<number>(idcategory || 0);
  const [quest, setQuest] = useState<number>(idquest || 0);
  const [description, setDescription] = useState<string>(props.description);
  const [level, setLevel] = useState<number>(props.level);

  async function handleDelete(event: FormEvent) {
    event.preventDefault();

    await del({
      variables: {
        id: parseFloat(`${props.id}`),
      },
      onError: ({ message }) => alert(message),
      refetchQueries: [GET_ALTERNATIVE],
    });
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();

    await update({
      variables: {
        id: parseFloat(`${props.id}`),
        description,
        level,
        idCategory: category,
        idQuests: quest,
      },
      onError: ({ message }) => alert(message),
      refetchQueries: [GET_ALTERNATIVE],
    });
  }

  return (
    <Form>
      <QuestList
        required
        value={quest}
        onChange={(e) => setQuest(parseFloat(e.target.value))}
      />

      <Input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Field>
        <label>
          <Text>Level</Text>
        </label>
        <Input
          min="1"
          max="4"
          type="number"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(parseFloat(e.target.value))}
        />
      </Field>

      <CategoryList
        required
        value={category}
        onChange={(e) => setCategory(parseFloat(e.target.value))}
      />

      <Button onClick={handleUpdate}>Salvar</Button>
      <SecundaryButton onClick={handleDelete}>Remover</SecundaryButton>
    </Form>
  );
}
