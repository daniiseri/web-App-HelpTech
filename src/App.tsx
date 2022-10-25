import "./styles/global.css";

import { AuthProvider } from "./context/Auth";

import { Routes } from "./routes/index";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export { App };
