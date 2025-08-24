import type { FastifyReply, FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

type JWTPayload = {
	sub: string;
	role: 'student' | 'manager';
};

export const checkRequestJWT = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const token = request.headers.authorization;

	if (!token) {
		return reply.status(401).send();
	}

	if (!process.env.JWT_SECRET) {
		throw new Error('JWT_SECRET must be set.');
	}

	try {
		const payload = verify(token, process.env.JWT_SECRET) as JWTPayload;

		request.user = payload;
	} catch {
		reply.status(401).send();
	}
};
