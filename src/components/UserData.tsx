import { useAuth } from "../context/Auth";
import { Text } from "./Text";

import { AiOutlineMail, AiTwotoneSetting, AiOutlineUser } from "react-icons/ai";
import { ImExit } from "react-icons/im";

import { Field } from "./Field";

import { NavLink, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface UserDataProps {
  setHidden: Dispatch<SetStateAction<boolean>>;
}

export function UserData({ setHidden }: UserDataProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className=" bg-gray-800 p-4 rounded flex flex-col justify-around absolute gap-4 m-auto top-1 md:w-96 w-[100%]">
      <Field>
        <AiOutlineUser className="text-bronw-100" />
        <Text>
          <p>{user.name}</p>
        </Text>
      </Field>

      <Field>
        <AiOutlineMail className="text-bronw-100" />
        <Text>
          <p>{user.email}</p>
        </Text>
      </Field>

      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "isActive" : "")}
        onClick={() => setHidden(true)}
      >
        <Field>
          <AiTwotoneSetting className="text-bronw-100" />
          <Text>
            <h2>Gerenciar conta</h2>
          </Text>
        </Field>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "isActive" : "")}
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("roles");
          localStorage.removeItem("response");
        }}
        reloadDocument
      >
        <Field>
          <ImExit className="text-bronw-100" />
          <Text>Sair</Text>
        </Field>
      </NavLink>
    </div>
  );
}
