import { faker } from '@faker-js/faker/locale/pt_BR';
import request from 'supertest';
import { server } from '@/app';
import { MakeAuthenticatedUser } from '@/test/factories/make-user';

beforeAll(async () => await server.ready());

it('create a course', async () => {
	const { token } = await MakeAuthenticatedUser('manager');

	const response = await request(server.server)
		.post('/courses')
		.set('Content-Type', 'application/json')
		.set('Authorization', token)
		.send({ title: faker.lorem.words(4) });

	expect(response.status).toBe(201);
	expect(response.body).toEqual({
		courseId: expect.any(String),
	});
});
