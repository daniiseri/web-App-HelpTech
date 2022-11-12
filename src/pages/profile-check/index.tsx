import { gql, useQuery } from "@apollo/client";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { SecundaryButton } from "../../components/SecundaryButton";
import { Quest } from "./components/Quest";
import { Result } from "./components/Result";
import { useCheck } from "../../context/Check";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  alternative?: number;
}

export function ProfileCheck() {
  const { data, loading } = useQuery<{ categoryByDescription: CategoryID }>(
    GET_INIT
  );

  const [category, setCategory] = useState<CategoryID | any>();
  const [categories, setCategories] = useState<CategoryID[]>([]);

  const { endPoint } = useCheck();

  const navigate = useNavigate();

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

  if (loading) return <p>Carregando...</p>;

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
    <div className="md:w-[400px] w-[100%] flex flex-col gap-4">
      {category && (
        <Quest key={category.id} id={category.id} setCategory={setCategory} />
      )}
      {category?.id === 14 && (
        <div className="py-4 md:w-[400px] w-[100%] flex flex-col text-center gap-4 px-3 bg-gray-800 rounded">
          {categories.map((category, index) => {
            {
              if (index > 0)
                return (
                  <Result
                    key={category.id}
                    id={category.key}
                    alternative={category.alternative}
                  />
                );
            }
          })}
        </div>
      )}
      <Field>
        {categories.length > 1 && <Button onClick={handlePrev}>Voltar</Button>}
        {category?.id === 14 && (
          <SecundaryButton
            onClick={() => {
              endPoint(categories);
              navigate("/desktop");
            }}
          >
            Confirmar
          </SecundaryButton>
        )}
      </Field>
    </div>
  );
}
