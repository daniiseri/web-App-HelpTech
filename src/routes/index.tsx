import { BrowserRouter } from "react-router-dom";

import { Auth } from "./Auth";
import { NoAuth } from "./NoAuth";

import { useAuth } from "../context/Auth";
import { NavHeader } from "../components/NavHeader";
import { Background } from "../components/Background";

export function Routes() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <NavHeader />
      <Background>{token ? <Auth /> : <NoAuth />}</Background>
    </BrowserRouter>
  );
}
