import { BrowserRouter } from "react-router-dom";

import { Auth } from "./Auth";
import { NoAuth } from "./NoAuth";

import { useAuth } from "../context/Auth";
import { NavHeader } from "../components/NavHeader";
import { Background } from "../components/Background";
import { useState } from "react";
import { UserData } from "../components/UserData";
import { Footer } from "../components/Footer";
import { Help } from "../pages/help";
import { Text } from "../components/Text";

import { AiFillGithub, AiOutlineWhatsApp } from "react-icons/ai";

export function Routes() {
  const { token } = useAuth();
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <NavHeader setHidden={setHidden} />
      <Background>
        {token ? (
          <>
            <Auth /> {!hidden && <UserData setHidden={setHidden} />}
          </>
        ) : (
          <NoAuth />
        )}
      </Background>
      <Footer>
        <div className="flex flex-col flex-wrap items-center gap-3 p-4">
          <Text>CONTATO</Text>
          <Help />
          <a
            className="flex gap-3 items-center hover:cursor-pointer"
            target={"_blank"}
            href="https://github.com/daniiseri"
          >
            <AiFillGithub className="text-bronw-100" />
            <Text>https://github.com/daniiseri</Text>
          </a>
          <a
            className="flex gap-3 items-center"
            href="https://api.whatsapp.com/send?1=pt_BR&phone=5517992352155"
            target={"_blank"}
          >
            <AiOutlineWhatsApp className="text-bronw-100" />
            <Text>(17) 99235-2155</Text>
          </a>
        </div>
      </Footer>
    </BrowserRouter>
  );
}
