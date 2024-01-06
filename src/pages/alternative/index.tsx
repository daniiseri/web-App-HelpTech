import { gql, useQuery } from "@apollo/client";
import { Container } from "../../components/Container";
import { Text } from "../../components/Text";
import { AlternativeProps, GetAlternative } from "./components/GetAlternative";
import { NewAlternative } from "./components/NewAlternative";
import { Search } from "../../components/Search";
import { useState } from "react";

export const GET_ALTERNATIVE = gql`
  query {
    alternatives {
      id
      description
      level
      idcategory
      idquest
    }
  }
`;

export function Alternative() {
  const { data, loading } = useQuery<{ alternatives: [AlternativeProps] }>(
    GET_ALTERNATIVE
  );
  const [value, setValue] = useState<string>('')

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Container>
      <NewAlternative />
      <Search value={value} setValue={setValue} />
      <div className="flex flex-wrap gap-4">
        {data?.alternatives
          .filter(({ description }) => {
            const valueToLowerCase = value.toLowerCase()
            const descriptionToLowerCase = description.toLowerCase()

            return descriptionToLowerCase.includes(valueToLowerCase)
          })
          .map((alternative) => {
            return <GetAlternative key={alternative.id} {...alternative} />;
          })}
      </div>
    </Container>
  );
}
