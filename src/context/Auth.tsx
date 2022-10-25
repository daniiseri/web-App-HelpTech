import { createContext, PropsWithChildren, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { usePersistedState } from "../hooks/usePersistedState";

const LOGIN = gql`
  mutation ($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      roles
      token
      user {
        id
        name
        email
        password
      }
    }
  }
`;

interface ILogin {
  email: string;
  password: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface IAuth {
  user: IUser;
  token: string;
  roles: string;
  signIn({}: ILogin): void;
  signOut(): void;
}

const AuthContext = createContext({} as IAuth);

function AuthProvider({ children }: PropsWithChildren) {
  const [login] = useMutation(LOGIN);
  const [user, setUser] = usePersistedState<IUser>("user", {} as IUser);
  const [roles, setRole] = usePersistedState<string>("roles", "");
  const [token, setToken] = usePersistedState<string>("token", "");

  async function signIn({ email, password }: ILogin) {
    await login({
      variables: {
        email,
        password,
      },
      onError: ({ message }) => alert(message),
      onCompleted: (data) => {
        const { login } = data;

        const { token, user, roles } = login;

        setUser(user);
        setRole(roles);
        setToken(token);
      },
    });
  }

  async function signOut() {
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
