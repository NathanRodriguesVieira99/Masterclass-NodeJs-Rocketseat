import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { sign } from 'jsonwebtoken';
import { db } from '@/database/client';
import { users } from '@/database/schema';
import { hashPassword } from '@/utils/hash';

export const MakeUser = async (role?: 'manager' | 'student') => {
	const passwordWithoutHash = randomUUID();

	const result = await db
		.insert(users)
		.values({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: await hashPassword(passwordWithoutHash),
			role,
		})
		.returning();

	return {
		user: result[0],
		passwordWithoutHash,
	};
};

export const MakeAuthenticatedUser = async (role: 'manager' | 'student') => {
	const { user } = await MakeUser(role);

	if (!process.env.JWT_SECRET) {
		throw new Error('JWT_SECRET is required.');
	}

	const token = sign(
		{ sub: user.id, role: user.role },
		process.env.JWT_SECRET,
	);

	return { user, token };
};
