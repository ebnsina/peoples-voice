import db from '$lib/server/db';
import type { VoteType } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await db.post.findUnique({
		where: { id: params.postId },
		include: {
			author: true,
			votes: { include: { user: true } },
			comments: { include: { author: true, replies: { include: { author: true } } } }
		}
	});

	if (!post) throw redirect(404, '/');

	return { post };
};

export const actions: Actions = {
	vote: async ({ request, params, locals }) => {
		const userId = locals.user?.id;

		if (!userId) return { status: 401 };

		const formData = await request.formData();
		const voteType = formData.get('voteType') as string;

		if (!['AGREE', 'DISAGREE', 'NO_COMMENT', 'ABSTAIN'].includes(voteType)) {
			return fail(400, { error: 'Invalid vote type' });
		}

		await db.vote.upsert({
			where: { userId_postId: { userId, postId: params.postId! } },
			update: { voteType: voteType as VoteType },
			create: { voteType: voteType as VoteType, userId, postId: params.postId! }
		});
		return { success: true };
	},

	createComment: async ({ request, params, locals }) => {
		const userId = locals.user?.id;
		// prevent unauthenticated users from commenting
		if (!userId) return { status: 401 };

		const formData = await request.formData();
		const content = formData.get('content');

		if (typeof content !== 'string' || content.trim().length === 0) {
			return fail(400, { error: 'Comment content is required' });
		}

		await db.comment.create({
			data: {
				content,
				authorId: userId,
				postId: params.postId!
			}
		});
		return { success: true };
	},

	createReply: async ({ request, locals }) => {
		const userId = locals.user?.id;
		// prevent unauthenticated users from replying
		if (!userId) return { status: 401 };

		const formData = await request.formData();
		const content = formData.get('content');
		const commentId = formData.get('commentId');

		if (typeof content !== 'string' || content.trim().length === 0) {
			return fail(400, { error: 'Reply content is required' });
		}
		if (typeof commentId !== 'string') {
			return fail(400, { error: 'Comment ID is required' });
		}

		await db.reply.create({
			data: {
				content,
				authorId: userId,
				commentId
			}
		});
		return { success: true };
	}
};
