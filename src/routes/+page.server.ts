import db from '$lib/server/db';
import { error, fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const schema = z.object({
	title: z
		.string()
		.min(3, { message: 'শিরোনাম কমপক্ষে ৩ অক্ষরের হতে হবে' })
		.max(100, { message: 'শিরোনাম ১০০ অক্ষরের বেশি হতে পারবে না' }),
	content: z
		.string()
		.min(6, { message: 'বিষয়বস্তু কমপক্ষে ৬ অক্ষরের হতে হবে' })
		.max(1000, { message: 'বিষয়বস্তু ১০০০ অক্ষরের বেশি হতে পারবে না' })
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
			throw error(401, 'অননুমোদিত অ্যাক্সেস!');
		}

		const formData = await event.request.formData();
		const title = formData.get('title');
		const content = formData.get('content');

		const result = schema.safeParse({ title, content });

		if (!result.success) {
			const errors = result.error.flatten();
			return fail(400, {
				error: {
					fieldErrors: errors.fieldErrors,
					formErrors: errors.formErrors,
					fields: { title, content }
				}
			});
		}

		try {
			await db.post.create({
				data: {
					title: result.data.title,
					content: result.data.content,
					authorId: userId
				}
			});

			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, {
				error: {
					formErrors: ['সার্ভারে একটি ত্রুটি ঘটেছে, অনুগ্রহ করে আবার চেষ্টা করুন']
				}
			});
		}
	}
};
