import { GraphQLClient } from "graphql-request";
import { CONFIG } from "../constants/globals";
import authService from "./authService";

// graphql-request builds `new URL(endpoint)` internally, which throws
// synchronously for a relative path like "/api/graphql" (no base). Resolve
// it against the current origin in the browser so it stays a same-origin
// call (avoiding CORS) while still being a valid absolute URL.
const endpoint =
  typeof window !== "undefined"
    ? new URL(CONFIG.GRAPHQL_API, window.location.origin).toString()
    : CONFIG.GRAPHQL_API;

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: () => ({ authorization: `Bearer ${authService.token}` }),
});
