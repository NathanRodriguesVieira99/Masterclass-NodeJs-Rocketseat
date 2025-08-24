import type { FastifyRequest } from 'fastify/types/request';

export const getAuthenticatedUserFromRequest = (request: FastifyRequest) => {
	const user = request.user;

	if (!user) {
		throw new Error('Invalid authorization');
	}

	return user;
};
