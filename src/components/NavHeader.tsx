import { Header } from "./Header";
import { NavLink } from "react-router-dom";
import { Text } from "./Text";

import { AiOutlineUser, AiFillHome } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

import { useAuth } from "../context/Auth";

function NoAuth() {
  return (
    <Header>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <AiFillHome className="text-bronw-100" />
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <Text>Login</Text>
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <Text>Register</Text>
      </NavLink>
    </Header>
  );
}

interface AuthProps {
  setHidden: Dispatch<SetStateAction<boolean>>;
}

function Auth({ setHidden }: AuthProps) {
  const { roles } = useAuth();

  return (
    <Header>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <AiFillHome className="text-bronw-100" />
      </NavLink>
      {roles?.find(({description}) => description === "Admin") && (
        <>
          <NavLink
            to="/category"
            className={({ isActive }) => (isActive ? "activeStyle" : "")}
            onClick={() => setHidden(true)}
          >
            <Text>Category</Text>
          </NavLink>
          <NavLink
            to="/quest"
            className={({ isActive }) => (isActive ? "activeStyle" : "")}
            onClick={() => setHidden(true)}
          >
            <Text>Quest</Text>
          </NavLink>
          <NavLink
            to="/alternative"
            className={({ isActive }) => (isActive ? "activeStyle" : "")}
            onClick={() => setHidden(true)}
          >
            <Text>Alternative</Text>
          </NavLink>
        </>
      )}
      <div
        className="bg-bronw-100 p-1 rounded-[50%]"
        onClick={() => setHidden((prevState) => (prevState ? false : true))}
      >
        <AiOutlineUser className="text-gray-900" />
      </div>
    </Header>
  );
}

export function NavHeader({ setHidden }: AuthProps) {
  const { token } = useAuth();

  return <>{token ? <Auth setHidden={setHidden} /> : <NoAuth />}</>;
}
