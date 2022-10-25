import { gql, useQuery } from "@apollo/client";
import { Container } from "../../components/Container";
import { Text } from "../../components/Text";
import { AlternativeProps, GetAlternative } from "./components/GetAlternative";
import { NewAlternative } from "./components/NewAlternative";

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

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Container>
      <NewAlternative />
      {data?.alternatives.map((alternative) => {
        return <GetAlternative key={alternative.id} {...alternative} />;
      })}
    </Container>
  );
}
