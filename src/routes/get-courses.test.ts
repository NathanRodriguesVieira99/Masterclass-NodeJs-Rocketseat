import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { server } from '@/app';

import { MakeCourse } from '@/test/factories/make-course';
import { MakeAuthenticatedUser } from '@/test/factories/make-user';

beforeAll(async () => await server.ready());

it('get all courses', async () => {
	const titleId = randomUUID();

	const { token } = await MakeAuthenticatedUser('manager');
	await MakeCourse(titleId);

	const response = await request(server.server)
		.get(`/courses?search=${titleId}`)
		.set('Authorization', token);

	expect(response.status).toBe(200);
	expect(response.body).toEqual({
		total: 1,
		courses: [
			{
				id: expect.any(String),
				title: titleId,
				enrollments: 0,
			},
		],
	});
});
