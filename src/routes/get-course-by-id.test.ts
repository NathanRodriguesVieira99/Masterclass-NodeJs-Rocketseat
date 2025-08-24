import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { server } from '@/app';
import { MakeCourse } from '@/test/factories/make-course';
import { MakeAuthenticatedUser } from '@/test/factories/make-user';

beforeAll(async () => await server.ready());

it('get a course by id', async () => {
	const { token } = await MakeAuthenticatedUser('student');
	const course = await MakeCourse();

	const response = await request(server.server)
		.get(`/courses/${course.id}`)
		.set('Authorization', token);

	expect(response.status).toBe(200);
	expect(response.body).toEqual({
		course: {
			id: expect.any(String),
			title: expect.any(String),
			description: null,
		},
	});
});
it('return 404 for a non existing course', async () => {
	const { token } = await MakeAuthenticatedUser('student');
	const uuid = randomUUID();

	const response = await request(server.server)
		.get(`/courses/${uuid}`)
		.set('Authorization', token);

	expect(response.status).toBe(404);
});
