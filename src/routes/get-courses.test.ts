import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { server } from '@/app';

import { MakeCourse } from '@/test/factories/make-course';

beforeAll(async () => await server.ready());

it('get all courses', async () => {
	const titleId = randomUUID();

	await MakeCourse(titleId);

	const response = await request(server.server).get(
		`/courses?search=${titleId}`,
	);

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
