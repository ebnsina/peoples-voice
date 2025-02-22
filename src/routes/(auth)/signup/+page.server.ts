import {
	createSession,
	generateSessionToken,
	hashPassword,
	setSessionTokenCookie
} from '$lib/server/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import db from '$lib/server/db';

const schema = z.object({
	username: z.string().min(3, { message: 'Username is required' }),
	password: z.string().min(6, { message: 'Password is required' })
});

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}

	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const body = Object.fromEntries(formData);
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const phone = formData.get('phone') as string;

		const result = schema.safeParse(body);
		if (!result.success) {
			return fail(400, {
				error: result.error.flatten(),
				username: ''
			});
		}

		const passwordHash = await hashPassword(password);

		try {
			const user = await db.user.create({
				data: { username: username, email: email, password: passwordHash, phone: phone }
			});

			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, user.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'An error has occurred' });
		}

		return redirect(302, '/');
	}
};
