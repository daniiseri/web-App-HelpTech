import { AlternativeProps } from "../../alternative/components/GetAlternative";

import { gql, useQuery } from "@apollo/client";
import { Field } from "../../../components/Field";
import { Input } from "../../../components/Input";
import { InputHTMLAttributes } from "react";
import { Text } from "../../../components/Text";

const GET_ALTERNATIVE_BY_QUEST = (id?: number) => gql`
  query{
    alternativesByQuest(questId: ${id}) {
      id
      description
      level
      idcategory
      idquest
    }
  }
`;

interface AlternativeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  questId: number;
}

export function Alternatives({ questId, ...props }: AlternativeInputProps) {
  const { data, loading } = useQuery<{
    alternativesByQuest: [AlternativeProps];
  }>(GET_ALTERNATIVE_BY_QUEST(questId));

  if (loading) return <Text>Carregando...</Text>;

  return (
    <Field direction="col">
      {data?.alternativesByQuest.map((alternative) => {
        return (
          <Field key={alternative.id}>
            <Input
              id={`${alternative.id}`}
              type="checkbox"
              name={`${questId}`}
              value={`${alternative.id},${alternative.idcategory},${alternative.level}`}
              {...props}
            />
            <label htmlFor={`${alternative.id}`}>
              <Text>{alternative.description}</Text>
            </label>
          </Field>
        );
      })}
    </Field>
  );
}
