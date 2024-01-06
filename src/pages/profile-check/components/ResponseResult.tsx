import { gql, useQuery } from "@apollo/client";
import { Field } from "../../../components/Field";
import { Text } from "../../../components/Text";

import { AlternativeProps } from "../../alternative/components/GetAlternative";
import { QuestProps } from "../../quest/components/GetQuest";


const GET_ALTERNATIVE_BY_ID = (id: number) => {
  return gql`
    query {
      alternativeById(idAlternative: ${id}) {
       description
      }
    }
  `;
};

interface ResponseResultProps {
  alternative: number;
}

export function ResponseResult({ alternative }: ResponseResultProps) {


  const { data, loading } = useQuery<{ alternativeById: AlternativeProps }>(
    GET_ALTERNATIVE_BY_ID(parseFloat(`${alternative}`))
  );


  if (loading) return <Text>Carregando...</Text>;

  return (
    <Text>{data?.alternativeById.description}</Text>
  );
}
