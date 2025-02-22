import db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const userId = event.locals.user?.id;
	if (event.locals.user === null) {
		return redirect(302, '/signin');
	}

	if (!event.locals.user || !event.locals.user.isAdmin) {
		throw redirect(302, '/');
	}

	const user = await db.user.findUnique({ where: { id: userId } });
	if (!user?.isAdmin) throw redirect(403, '/');

	return {
		users: await db.user.findMany(),
		posts: await db.post.findMany({ include: { votes: true } }),
		votes: await db.vote.findMany({ include: { user: true, post: true } })
	};
};
