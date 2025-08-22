import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { server } from '@/app';
import { MakeCourse } from '@/test/factories/make-course';

beforeAll(async () => await server.ready());

it('get a course by id', async () => {
	const course = await MakeCourse();

	const response = await request(server.server).get(`/courses/${course.id}`);

	expect(response.status).toBe(200);
	expect(response.body).toEqual({
		course: {
			id: expect.any(String),
			title: expect.any(String),
			description: null,
		},
	});
});
it('return 404 for a non existing courses', async () => {
	const uuid = randomUUID();

	const response = await request(server.server).get(`/courses/${uuid}`);

	expect(response.status).toBe(404);
});
