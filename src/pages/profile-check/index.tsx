import { gql, useQuery } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { Quest } from "./components/Quest";

const GET_INIT = gql`
  query {
    categoryByDescription(description: "Init") {
      id
    }
  }
`;

export interface CategoryID {
  id?: number;
  key?: number;
  level?: number;
}

export interface ResponseID {
  id?: number;
}

export interface CategoryInputProps {
  id?: number;
  setCategory: Dispatch<SetStateAction<CategoryID | any>>;
}

export function ProfileCheck() {
  const { data, loading } = useQuery<{ categoryByDescription: CategoryID }>(
    GET_INIT
  );
  const [categories, setCategories] = useState<CategoryID[]>([]);
  const [category, setCategory] = useState<CategoryID>();

  useEffect(() => {
    category &&
      setCategories((prevState) => {
        if (!prevState.find((item) => item.key === category?.key)) {
          return [...prevState, category] as CategoryID[];
        }

        const newState = prevState.map((item) => {
          return item.key === category?.key
            ? { key: item.key, id: category?.id, level: category?.level }
            : item;
        });

        return newState;
      });
  }, [category]);

  if (loading) return <Text>Carregando...</Text>;

  if (data && !category) {
    setCategory(data.categoryByDescription);
    setCategories([data.categoryByDescription]);
  }

  function handlePrev() {
    setCategory(categories[categories.length - 2]);
    setCategories((prevState) => {
      return prevState.filter((item, index) => index !== categories.length - 1);
    });
  }

  return (
    <div>
      {category && (
        <Quest key={category.id} id={category.id} setCategory={setCategory} />
      )}
      {categories.length > 1 && <Button onClick={handlePrev}>Voltar</Button>}
      <strong>{categories.length}</strong>
      <strong>{JSON.stringify(categories)}</strong>
    </div>
  );
}
