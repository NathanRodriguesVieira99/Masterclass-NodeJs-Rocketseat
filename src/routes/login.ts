import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { sign } from 'jsonwebtoken';
import z from 'zod';
import { db } from '@/database/client';
import { users } from '@/database/schema';
import { comparePassword } from '@/utils/hash';

export const LoginRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/sessions',
		{
			schema: {
				tags: ['Auth'],
				summary: 'login',
				body: z.object({
					email: z.email(),
					password: z.string(),
				}),
				response: {
					200: z.object({
						token: z.string(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { email, password } = request.body;

			const result = await db
				.select()
				.from(users)
				.where(eq(users.email, email));

			if (result.length === 0) {
				return reply
					.status(400)
					.send({ message: 'Invalid credentials' });
			}

			const user = result[0];

			const doesPasswordsMatch = await comparePassword(
				user.password,
				password,
			);

			if (!doesPasswordsMatch) {
				return reply
					.status(400)
					.send({ message: 'Invalid credentials' });
			}

			if (!process.env.JWT_SECRET) {
				throw new Error('JWT_SECRET must be set.');
			}

			const token = sign(
				{ sub: user.id, role: user.role },
				process.env.JWT_SECRET,
			);

			return reply.status(200).send({ token });
		},
	);
};
