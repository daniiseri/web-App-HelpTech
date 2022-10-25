import { gql, useQuery } from "@apollo/client";
import { Container } from "../../components/Container";
import { Text } from "../../components/Text";

import { CategoryProps, GetCategory } from "./components/GetCategory";
import { NewCategory } from "./components/NewCategory";

export const GET_CATEGORY = gql`
  query {
    categories {
      id
      description
    }
  }
`;

export function Category() {
  const { data, loading } = useQuery<{ categories: [CategoryProps] }>(
    GET_CATEGORY
  );

  if (loading)
    return (
      <Text>
        <h1>Carregando...</h1>
      </Text>
    );

  return (
    <Container>
      <NewCategory />
      {data?.categories.map((category) => {
        return <GetCategory key={category.id} {...category} />;
      })}
    </Container>
  );
}
