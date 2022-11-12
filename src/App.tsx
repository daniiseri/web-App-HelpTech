import "./styles/global.css";

import { AuthProvider } from "./context/Auth";
import { CheckProvider } from "./context/Check";

import { Routes } from "./routes/index";

function App() {
  return (
    <AuthProvider>
      <CheckProvider>
        <Routes />
      </CheckProvider>
    </AuthProvider>
  );
}

export { App };
