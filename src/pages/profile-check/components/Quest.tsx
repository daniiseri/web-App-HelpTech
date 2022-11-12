import { gql, useQuery } from "@apollo/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CategoryID } from "..";

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

interface Props {
  id?: number;
  setCategory: Dispatch<SetStateAction<CategoryID>>;
}

export function Quest({ id, setCategory }: Props) {
  const { data, loading } = useQuery<{ questsByCategory: [QuestProps] }>(
    GET_QUEST_BY_CATEGORY(parseFloat(`${id}`))
  );

  if (loading) return <Text>Carregando...</Text>;

  function handleInputChange(
    key: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.target.setCustomValidity("");

    const [alternative, category, level] = event.target.value.split(",");

    setCategory({
      key,
      id: Number(category),
      level: Number(level),
      alternative: Number(alternative),
    });
  }

  return (
    <Field>
      {data?.questsByCategory.map((quest) => {
        return (
          <div
            key={quest.id}
            className="py-4 md:w-[400px] w-[100%] flex flex-col text-center gap-4 px-3 bg-gray-800 rounded"
          >
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
