import { fastifySwagger } from '@fastify/swagger';
import scalarAPIReference from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createCoursesRoute } from '@/routes/create-course';
import { getCoursesByIdRoute } from '@/routes/get-course-by-id';
import { getCoursesRoute } from '@/routes/get-courses';
import { LoginRoute } from './routes/login';

/**
 * FASTIFY
 */
export const server = fastify({
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	},
}).withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

/**
 *  SWAGGER
 */
if (process.env.NODE_ENV === 'development') {
	server.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Desafio NodeJs',
				version: '1.0.0',
			},
		},
		transform: jsonSchemaTransform,
	});

	server.register(scalarAPIReference, {
		routePrefix: '/docs',
		configuration: {
			theme: 'kepler',
		},
	});
}

/**
 * Rotas
 */
server.register(createCoursesRoute);
server.register(getCoursesByIdRoute);
server.register(getCoursesRoute);
server.register(LoginRoute);
