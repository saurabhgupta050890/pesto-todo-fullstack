import { remultFastify } from "remult/remult-fastify";
import { Task } from "../shared/task";

export const api = remultFastify({
  entities: [Task],
  logApiEndPoints: true
});
