import { AboutUs } from "./components/AboutUs";
import { Motivation } from "./components/Motivation";

import { useNavigate } from "react-router-dom";

import { Text } from "../../components/Text";

import { useAuth } from "../../context/Auth";

export function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <AboutUs />
      <Motivation />

      {token && (
        <div
          className="bg-gray-900 text-center flex-1 hover:cursor-pointer hover:bg-gray-800 rounded p-3"
          onClick={() => navigate("/profile-check")}
        >
          <Text>Clique aqui para identificar seu perfil !</Text>
        </div>
      )}
    </div>
  );
}
