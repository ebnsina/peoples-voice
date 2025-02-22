import {
	createSession,
	generateSessionToken,
	setSessionTokenCookie,
	verifyPassword
} from '$lib/server/auth';
import db from '$lib/server/db';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

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
		const password = formData.get('password') as string;

		const result = schema.safeParse(body);
		if (!result.success) {
			return fail(400, { error: result.error.flatten(), username: '' });
		}

		const user = await db.user.findFirst({ where: { username } });
		if (!user) {
			return fail(400, {
				error: 'Incorrect username or password',
				username: ''
			});
		}

		const validPassword = await verifyPassword(user.password, password);
		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		try {
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
