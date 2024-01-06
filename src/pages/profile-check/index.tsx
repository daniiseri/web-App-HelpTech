import { gql, useQuery } from "@apollo/client";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { SecundaryButton } from "../../components/SecundaryButton";
import { Quest } from "./components/Quest";
import { ResponseResult } from "./components/ResponseResult";
import { useCheck } from "../../context/Check";

import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { QuestResult } from "./components/QuestResult";

const GET_INIT = gql`
  query {
    categoryByDescription(description: "Categorias") {
      id
    }
  }
`;

export interface CategoryID {
  ids: number[];
  key: number;
  levels: number[];
  alternatives: number[];
}

export function ProfileCheck() {
  const { data, loading } = useQuery<{ categoryByDescription: CategoryID }>(
    GET_INIT
  );

  const [category, setCategory] = useState<CategoryID | any>();
  const [categories, setCategories] = useState<CategoryID[]>([]);

  const { endPoint } = useCheck();

  const navigate = useNavigate();

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

  function handleInputChange(
    key: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.target.setCustomValidity("");

    const [alternative, category, level] = event.target.value.split(",");

    setCategories(prevState => {
      const findQuest = prevState.find(data => data.key === key)

      if (!findQuest) {
        return [...prevState, { key, alternatives: [Number(alternative)], ids: [Number(category)], levels: [Number(level)] }]
      }

      const findAlternative = prevState.find(state => state.alternatives?.includes(Number(alternative)))

      if (findAlternative) {
        return prevState.map((data) => {

          return key === data.key
            ? {
              key: data.key,
              alternatives: filterAlternative(Number(alternative), data.alternatives),
              ids: filterCategory(Number(category), data.ids),
              levels: filterLevel(Number(level), data.levels)
            }
            : data
        })
      }

      return prevState.map(data => {
        const { alternatives, ids, levels } = data;

        return data.key === key
          ? {
            key,
            alternatives: [...alternatives, Number(alternative)],
            ids: [...ids, Number(category)],
            levels: [...levels, Number(level)]
          }
          : data
      })
    })
  }

  function filterAlternative(alternative: number, alternatives: number[]) {
    return alternatives.filter(id => id !== alternative)
  }

  function filterLevel(level: number, levels: number[]) {
    return levels.filter(id => id !== level)
  }

  function filterCategory(category: number, categories: number[]) {
    return categories.filter(id => id !== category)
  }

  return (
    <div className="md:w-[400px] w-[100%] flex flex-col gap-4">
      {category && (
        <Quest key={category.key} id={category.id} handleInputChange={handleInputChange} />
      )}

      {
        categories.length > 1 && (
          <div className="py-4 md:w-[400px] w-[100%] flex flex-col text-center gap-4 px-3 bg-gray-800 rounded">
            {categories?.map((category) => {
              return (
                <Field direction="col">
                  <QuestResult key={category.key} id={category.key} />
                  {category.alternatives?.map(alternative => {
                    return (
                      <ResponseResult
                        key={category.key}
                        alternative={alternative}
                      />
                    )
                  })}
                </Field>
              )
            })}
          </div>
        )
      }

      <Field>
        {categories.length > 1 && (
          <>
            {/* <Button onClick={handlePrev}>Voltar</Button> */}


            <SecundaryButton
              onClick={() => {
                endPoint(categories);
                navigate("/desktop");
              }}
            >
              Confirmar
            </SecundaryButton>
          </>
        )
        }
      </Field>
    </div>
  );
}
