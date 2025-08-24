import { hash, verify } from 'argon2';

export const hashPassword = async (password: string) => await hash(password);

export const comparePassword = async (hashPassword: string, password: string) =>
	await verify(hashPassword, password);
