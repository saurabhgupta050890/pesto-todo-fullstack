import Fastify from "fastify";
import { api } from "./api";
const fastify = Fastify({
  logger: true,
});

fastify.get("/api/healthcheck", async () => {
  return { status: "server is running" };
});

const start = async () => {
  try {
    await fastify.register(api);
    await fastify.listen({ port: 3002 });
    console.log("server started");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
