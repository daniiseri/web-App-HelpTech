import { useQuery } from "@apollo/client";
import { SelectHTMLAttributes } from "react";

import { QuestProps } from "../pages/quest/components/GetQuest";
import { GET_QUEST } from "../pages/quest/index";
import { Option } from "./Option";
import { Text } from "./Text";

interface QuestListProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function QuestList(props: QuestListProps) {
  const { data } = useQuery<{ quests: [QuestProps] }>(GET_QUEST);

  return (
    <select
      className="bg-gray-900 w-[100%] px-4 py-3 text-bronw-100 focus:right-2 focus:ring-bronw-500 placeholder-gray-800 rounded"
      {...props}
    >
      <Option className="text-center">--- Selecione uma quest ---</Option>;
      {data?.quests.map((quest) => {
        return (
          <Option key={quest.id} value={quest.id}>
            {quest.description}
          </Option>
        );
      })}
    </select>
  );
}
