import { Header } from "./Header";
import { NavLink } from "react-router-dom";
import { Text } from "./Text";

import { useAuth } from "../context/Auth";

function NoAuth() {
  return (
    <Header>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <Text>Home</Text>
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
      <NavLink
        to="/help"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <Text>Help</Text>
      </NavLink>
    </Header>
  );
}

function Auth() {
  return (
    <Header>
      <NavLink
        to="/category"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <Text>Category</Text>
      </NavLink>
      <NavLink
        to="/quest"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <Text>Quest</Text>
      </NavLink>
      <NavLink
        to="/alternative"
        className={({ isActive }) => (isActive ? "activeStyle" : "")}
      >
        <Text>Alternative</Text>
      </NavLink>
    </Header>
  );
}

export function NavHeader() {
  const { token } = useAuth();

  return <>{token ? <Auth /> : <NoAuth />}</>;
}
