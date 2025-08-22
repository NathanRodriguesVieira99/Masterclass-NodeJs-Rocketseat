import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { createCoursesRoute } from "./src/routes/create-course";
import { getCoursesByIdRoute } from "./src/routes/get-course-by-id";
import { getCoursesRoute } from "./src/routes/get-courses";
import scalarAPIReference from "@scalar/fastify-api-reference";

/**
 * FASTIFY
 */
export const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

/**
 *  SWAGGER
 */
if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Desafio NodeJs",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    },
  });
}

/**
 * Rotas
 */
server.register(createCoursesRoute);
server.register(getCoursesByIdRoute);
server.register(getCoursesRoute);
