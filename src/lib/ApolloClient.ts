import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem("token");
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token.replace(/"/g, '')}` : "",
      },
    };
  });

  return forward(operation)
})


const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export { client };
