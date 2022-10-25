import { gql, useQuery } from "@apollo/client";
import { ChangeEvent } from "react";

import { CategoryInputProps } from "..";
import { Field } from "../../../components/Field";
import { Text } from "../../../components/Text";
import { QuestProps } from "../../quest/components/GetQuest";
import { Alternatives } from "./Alternatives";

export const GET_QUEST_BY_CATEGORY = (id?: number) => {
  return gql`
    query{
      questsByCategory(categoryId: ${id}) {
        description
        id
      }
    }
  `;
};

export function Quest({ id, setCategory }: CategoryInputProps) {
  const { data, loading } = useQuery<{ questsByCategory: [QuestProps] }>(
    GET_QUEST_BY_CATEGORY(parseFloat(`${id}`))
  );

  if (loading) return <Text>Carregando...</Text>;

  function handleInputChange(
    key: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.target.setCustomValidity("");

    const [category, level] = event.target.value.split(",");

    setCategory({
      key,
      id: Number(category),
      level: Number(level),
    });
  }

  return (
    <Field>
      {data?.questsByCategory.map((quest) => {
        return (
          <div key={quest.id} className="py-4 px-3 bg-gray-800 rounded">
            <Text>{quest.description}</Text>
            <Alternatives
              questId={quest.id}
              onChange={(e) => handleInputChange(quest.id, e)}
            />
          </div>
        );
      })}
    </Field>
  );
}
