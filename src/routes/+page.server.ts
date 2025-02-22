import db from '$lib/server/db';
import { error, fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const schema = z.object({
	title: z.string().min(3, { message: 'Title is required' }),
	content: z.string().min(6, { message: 'Content is required' })
});

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	const posts = await db.post.findMany({
		include: { author: true, votes: true, _count: { select: { comments: true } } },
		orderBy: { createdAt: 'desc' }
	});

	return { posts, user };
};

export const actions: Actions = {
	default: async (event) => {
		const userId = event.locals.user?.id;
		if (!userId) {
			error(401, 'Unauthorized!');
		}

		const formData = await event.request.formData();
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;

		const result = schema.safeParse({ title, content });
		if (!result.success) {
			return fail(400, { error: result.error.flatten() });
		}

		try {
			await db.post.create({
				data: {
					title,
					content,
					authorId: userId
				}
			});

			return { success: true };
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'An error has occurred' });
		}
	}
};
