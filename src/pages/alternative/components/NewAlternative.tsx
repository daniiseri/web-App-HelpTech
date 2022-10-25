import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_ALTERNATIVE } from "..";
import { Button } from "../../../components/Button";
import { CategoryList } from "../../../components/CategoryList";
import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { QuestList } from "../../../components/QuestList";

const CREATE_ALTERNATIVE = gql`
  mutation (
    $idQuest: Float!
    $idCategory: Float!
    $newAlternativeData: NewAlternativeInput!
  ) {
    createAlternative(
      idQuest: $idQuest
      idCategory: $idCategory
      newAlternativeData: $newAlternativeData
    )
  }
`;

export function NewAlternative() {
  const [create] = useMutation(CREATE_ALTERNATIVE);
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);
  const [quest, setQuest] = useState<number>(0);

  async function handle(event: FormEvent) {
    event.preventDefault();

    const idQuest = quest;
    const idCategory = category;
    const newAlternativeData = { description, level };

    await create({
      variables: {
        idQuest,
        idCategory,
        newAlternativeData,
      },
      onError: ({ message }) => alert(message),
      onCompleted: () => {
        setDescription("");
        setLevel(0);
        setCategory(0);
        setQuest(0);
      },
      refetchQueries: [GET_ALTERNATIVE],
    });
  }

  return (
    <Form onSubmit={handle} title="Nova alternativa">
      <QuestList
        required
        value={quest}
        onChange={(e) => setQuest(parseFloat(e.target.value))}
      />

      <Input
        required
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        required
        type="number"
        placeholder="Level"
        value={level}
        onChange={(e) => setLevel(parseFloat(e.target.value))}
      />

      <CategoryList
        required
        value={category}
        onChange={(e) => setCategory(parseFloat(e.target.value))}
      />

      <Button type="submit">Criar</Button>
    </Form>
  );
}
