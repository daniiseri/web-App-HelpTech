import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { usePersistedState } from "../hooks/usePersistedState";
import { client } from "../lib/ApolloClient";

const LOGIN = gql`
  mutation ($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
    }
  }
`;

const USER = gql`
  query UserById {
    userById {
      id
      email
      password
      name  
    }
  }
`

const ROLES = gql`
  query RolesByUser {
    rolesByUser {
      description
      id
    }
  }
`

interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IRole {
  id: number;
  description: string
}

interface IAuth {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>
  token: string | null;
  roles: IRole[] | null;
  setRoles: Dispatch<SetStateAction<IRole[] | null>>
  signIn({ }: ILogin): Promise<void>;
  signOut(): void;
  loading: boolean
}

const AuthContext = createContext({} as IAuth);

function AuthProvider({ children }: PropsWithChildren) {
  const [login] = useMutation(LOGIN);
  const { data: userData } = useQuery<{ userById: IUser }>(USER);
  const { data: rolesData } = useQuery<{ rolesByUser: IRole[] }>(ROLES);
  const [user, setUser] = usePersistedState<IUser | null>("user", null);
  const [roles, setRoles] = usePersistedState<IRole[] | null>("roles", null);
  const [token, setToken] = usePersistedState<string | null>("token", null);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (token && userData && rolesData) {
      console.log('USER = ', userData);

      setUser(userData.userById)
      setRoles(rolesData.rolesByUser)
    }
  }, [token, userData, rolesData])

  async function signIn({ email, password }: ILogin) {
    setLoading(true)

    await login({
      variables: {
        email,
        password,
      },
      onError: ({ message }) => alert(message),
      onCompleted: (data) => {
        const { login } = data;

        const { token } = login;

        setToken(token)
      }
    });

    setLoading(false)
  }

  async function signOut() {
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        roles,
        setRoles,
        token,
        signIn,
        signOut,
        loading
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
