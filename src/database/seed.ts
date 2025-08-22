import { faker } from '@faker-js/faker/locale/pt_BR';
import { db } from './client';
import { courses, enrollments, users } from './schema';

const seed = async () => {
	const usersInsert = await db
		.insert(users)
		.values([
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
			{ name: faker.person.fullName(), email: faker.internet.email() },
		])
		.returning();

	const coursesInsert = await db
		.insert(courses)
		.values([
			{ title: faker.lorem.words(4) },
			{ title: faker.lorem.words(4) },
		])
		.returning();

	await db.insert(enrollments).values([
		{ courseId: coursesInsert[0].id, userId: usersInsert[0].id },
		{ courseId: coursesInsert[0].id, userId: usersInsert[1].id },
		{ courseId: coursesInsert[1].id, userId: usersInsert[2].id },
	]);
};

seed()
	.then(() => {
		console.log('database seeded 🌱');
	})
	.catch((err) => {
		console.error('error on seed database: ', err);
	});
