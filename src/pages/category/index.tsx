import { gql, useQuery } from "@apollo/client";
import { Container } from "../../components/Container";
import { Text } from "../../components/Text";

import { CategoryProps, GetCategory } from "./components/GetCategory";
import { NewCategory } from "./components/NewCategory";
import { Search } from "../../components/Search";
import { useState } from "react";

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
  const [value, setValue] = useState<string>('')

  if (loading)
    return (
      <Text>
        <h1>Carregando...</h1>
      </Text>
    );

  return (
    <Container>
      <NewCategory />
      <Search value={value} setValue={setValue} />
      <div className="flex-1 flex flex-wrap gap-4">
        {data?.categories
          .filter(({ description }) => {
            const valueToLowerCase = value.toLowerCase()
            const descriptionToLowerCase = description.toLowerCase()

            return descriptionToLowerCase.includes(valueToLowerCase)
          })
          .map((category) => {
            return <GetCategory key={category.id} {...category} />;
          })}
      </div>
    </Container>
  );
}
