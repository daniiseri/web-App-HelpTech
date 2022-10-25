import { gql, useQuery } from "@apollo/client";
import { Container } from "../../components/Container";

import { QuestProps, GetQuest } from "./components/GetQuest";
import { NewQuest } from "./components/NewQuest";

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
  return (
    <Container>
      <NewQuest />
      {data?.quests.map((quest) => {
        return <GetQuest key={quest.id} {...quest} />;
      })}
    </Container>
  );
}
