import { faker } from '@faker-js/faker/locale/pt_BR';
import { db } from '@/database/client';
import { courses } from '@/database/schema';

export const MakeCourse = async (title?: string) => {
	const result = await db
		.insert(courses)
		.values({
			title: title ?? faker.lorem.words(4),
		})
		.returning();

	return result[0];
};
