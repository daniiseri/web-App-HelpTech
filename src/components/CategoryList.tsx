import { useQuery } from "@apollo/client";

import { GET_CATEGORY } from "../pages/category/index";
import { CategoryProps } from "../pages/category/components/GetCategory";
import { Text } from "./Text";
import { SelectHTMLAttributes } from "react";
import { Option } from "./Option";

interface CategoryListProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function CategoryList(props: CategoryListProps) {
  const { data, loading } = useQuery<{ categories: [CategoryProps] }>(
    GET_CATEGORY
  );

  if (loading) {
    return (
      <Text>
        <h1>Carregando...</h1>
      </Text>
    );
  }

  return (
    <select
      className="bg-gray-900 w-[100%] flex-1 px-4 py-3 text-bronw-100 focus:right-2 focus:ring-bronw-500 placeholder-gray-800 rounded"
      {...props}
    >
      <Option className="text-center">--- Selecione uma categoria ----</Option>;
      {data?.categories.map((category) => {
        return (
          <Option key={category.id} value={category.id}>
            {category.description}
          </Option>
        );
      })}
    </select>
  );
}
