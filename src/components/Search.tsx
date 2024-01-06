import { Dispatch, SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./Input";

interface SearchProps {
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

export function Search({ value, setValue }: SearchProps) {
    return (
        <div className="flex-1 flex items-center relative w-full">
            <FiSearch className="absolute left-2" color="white" size={16} />
            <Input
                type="text"
                placeholder="Pesquisa para localizar e filtrar os dados desejados."
                value={value}
                onChange={e => setValue(e.target.value)}
                className="pl-8 placeholder-bronw-500"
            />
        </div>
    )
} 