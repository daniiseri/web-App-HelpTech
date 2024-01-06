import { gql, useQuery } from "@apollo/client";
import { Container } from "../../components/Container";

import { QuestProps, GetQuest } from "./components/GetQuest";
import { NewQuest } from "./components/NewQuest";
import { useState } from "react";
import { Search } from "../../components/Search";

export const GET_QUEST = gql`
  query {
    quests {
      id
      description
      idcategory
    }
  }
`;

export function Quest() {
  const { data } = useQuery<{ quests: [QuestProps] }>(GET_QUEST);
  const [value, setValue] = useState<string>('')


  return (
    <Container>
      <NewQuest />
      <Search value={value} setValue={setValue} />
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.quests
          .filter(({ description }) => {
            const valueToLowerCase = value.toLowerCase()
            const descriptionToLowerCase = description.toLowerCase()

            return descriptionToLowerCase.includes(valueToLowerCase)
          })
          .map((quest) => {
            return <GetQuest key={quest.id} {...quest} />;
          })}
      </div>
    </Container>
  );
}
