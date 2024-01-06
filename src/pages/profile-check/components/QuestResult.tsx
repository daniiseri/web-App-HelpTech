import { gql, useQuery } from "@apollo/client";
import { Text } from "../../../components/Text";
import { QuestProps } from "../../quest/components/GetQuest";

const GET_QUEST_BY_ID = (id: number) => {
    return gql`
      query{
        questById(idQuest: ${id}) {
          description
        }
      }
    `;
};

interface QuestResultProps {
    id: number
}

export function QuestResult({ id }: QuestResultProps) {
    const { data, loading } = useQuery<{ questById: QuestProps }>(
        GET_QUEST_BY_ID(parseFloat(`${id}`))
    );

    if (loading) return <Text>Carregando...</Text>;

    return (
        <Text>{data?.questById.description}</Text>
    )
}