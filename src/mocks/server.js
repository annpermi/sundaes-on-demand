import { setupServer } from "msw/node";
import { handlers, handlersTopping } from "./handlers";

export const server = setupServer(...handlers, ...handlersTopping);
