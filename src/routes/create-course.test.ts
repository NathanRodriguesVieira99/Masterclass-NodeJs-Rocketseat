import { faker } from '@faker-js/faker/locale/pt_BR';
import request from 'supertest';
import { server } from '@/app';

beforeAll(async () => await server.ready());

it('create a course', async () => {
	const response = await request(server.server)
		.post('/courses')
		.set('Content-Type', 'application/json')
		.send({ title: faker.lorem.words(4) });

	expect(response.status).toBe(201);
	expect(response.body).toEqual({
		courseId: expect.any(String),
	});
});
