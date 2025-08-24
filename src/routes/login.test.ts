import request from 'supertest';
import { server } from '@/app';
import { MakeUser } from '@/test/factories/make-user';

beforeAll(async () => await server.ready());

it('Login', async () => {
	const { user, passwordWithoutHash } = await MakeUser();

	const response = await request(server.server)
		.post('/sessions')
		.set('Content-Type', 'application/json')
		.send({
			email: user.email,
			password: passwordWithoutHash,
		});

	expect(response.status).toBe(200);
	expect(response.body).toEqual({
		token: expect.any(String),
	});
});
