import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '@/database/client';
import { courses } from '@/database/schema';

export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		'/courses/:id',
		{
			schema: {
				tags: ['Courses'],
				summary: 'Get course by id',
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						course: z.object({
							id: z.uuid(),
							title: z.string(),
							description: z.string().nullable(),
						}),
					}),
					404: z.null().describe('Course not found'),
				},
			},
		},
		async (request, reply) => {
			const courseId = request.params.id;

			const result = await db
				.select()
				.from(courses)
				.where(eq(courses.id, courseId));

			if (result.length > 0) {
				return reply.send({ course: result[0] });
			}

			return reply.status(404).send();
		},
	);
};
