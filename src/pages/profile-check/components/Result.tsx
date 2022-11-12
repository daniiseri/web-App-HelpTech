import { gql, useQuery } from "@apollo/client";
import { Field } from "../../../components/Field";
import { Text } from "../../../components/Text";

import { AlternativeProps } from "../../alternative/components/GetAlternative";
import { QuestProps } from "../../quest/components/GetQuest";

import { CategoryID } from "../index";

const GET_QUEST_BY_ID = (id: number) => {
  return gql`
    query{
      questById(id: ${id}) {
        description
      }
    }
  `;
};

const GET_ALTERNATIVE_BY_ID = (id: number) => {
  return gql`
    query {
      alternativeById(id: ${id}) {
        description
      }
    }
  `;
};

interface ResultProps {
  id?: number;
  alternative?: number;
}

export function Result({ id, alternative }: ResultProps) {
  const { data, loading } = useQuery<{ questById: QuestProps }>(
    GET_QUEST_BY_ID(parseFloat(`${id}`))
  );

  const { data: response } = useQuery<{ alternativeById: AlternativeProps }>(
    GET_ALTERNATIVE_BY_ID(parseFloat(`${alternative}`))
  );

  if (loading) return <Text>Carregando...</Text>;

  return (
    <Field direction="col">
      <Text>{data?.questById.description}</Text>
      <Text>{response?.alternativeById.description}</Text>
    </Field>
  );
}
