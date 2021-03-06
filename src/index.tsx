import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { config } from "./config/config";

/**
 * Create a new Apollo Client instance
 *
 * Configure CORS options and use the InMemoryCache
 */
const client = new ApolloClient({
  uri: config.server_url + "/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

/**
 * Render the application to the DOM
 */
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

serviceWorkerRegistration.register();
