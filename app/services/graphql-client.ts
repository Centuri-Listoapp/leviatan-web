import { GraphQLClient } from "graphql-request";
import { CONFIG } from "../constants/globals";
import authService from "./authService";

// graphql-request builds `new URL(endpoint)` internally, which throws
// synchronously for a relative path like "/api/graphql" (no base). In the
// browser, resolve it against the current origin so it stays a same-origin
// call (avoiding CORS) while still being a valid absolute URL. On the
// server (Server Components / SSR) there is no origin to resolve against
// and no CORS restriction, so call the backend directly instead of
// round-tripping through the Next.js proxy route.
const SERVER_GRAPHQL_API =
  process.env.GRAPHQL_API_BACKEND_URL ||
  "https://iuc1oq7yai.execute-api.us-east-1.amazonaws.com/graphql";

const endpoint =
  typeof window !== "undefined"
    ? new URL(CONFIG.GRAPHQL_API, window.location.origin).toString()
    : SERVER_GRAPHQL_API;

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: () => ({ authorization: `Bearer ${authService.token}` }),
});
