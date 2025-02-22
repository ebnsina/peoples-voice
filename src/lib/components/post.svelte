<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/utils';
	import type { Post } from '@prisma/client';

	const {
		post
	}: { post: Post & { author: { username: string }; votes: any[]; _count: { comments: number } } } =
		$props();
</script>

<article
	class="rounded-xl border border-slate-100 bg-white px-6 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500"
>
	<a href="/posts/{post.id}" class="mb-4 block">
		<h2 class="mb-2 line-clamp-2 text-xl text-blue-950 hover:underline">{post.title}</h2>
	</a>

	<p class="mb-4 line-clamp-3 text-sm text-slate-600">{post.content}</p>

	<div class="mb-4 flex items-center gap-4 text-sm text-gray-600">
		<span>লিখেছেন {post.author.username}</span>
		<span class="hidden sm:inline">•</span>
		<time datetime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
	</div>

	<form method="POST" action="/posts/{post.id}?/vote" use:enhance class="mb-4">
		<div class="space-y-2">
			{#each ['AGREE', 'DISAGREE', 'NO_COMMENT', 'ABSTAIN'] as voteType}
				<div class="flex items-center gap-2">
					<button
						name="voteType"
						value={voteType}
						class="w-full rounded-full px-3 py-1 text-left text-xs tracking-wider uppercase transition-colors duration-200
                        {voteType === 'AGREE'
							? 'bg-green-100 text-green-700 hover:bg-green-200'
							: voteType === 'DISAGREE'
								? 'bg-red-100 text-red-700 hover:bg-red-200'
								: voteType === 'NO_COMMENT'
									? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
									: 'bg-blue-100 text-blue-700 hover:bg-blue-300'}"
					>
						{voteType === 'AGREE'
							? 'সম্মত'
							: voteType === 'DISAGREE'
								? 'অসম্মত'
								: voteType === 'NO_COMMENT'
									? 'মন্তব্য নেই'
									: 'ভোটদানে বিরত'}
					</button>
				</div>
			{/each}
		</div>
	</form>

	<div class="flex gap-4 text-sm text-slate-500">
		<span class="flex items-center">
			<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 10l7-7m0 0l7 7m-7-7v18"
				/>
			</svg>
			ভোট: {post.votes.length}
		</span>
		<span class="flex items-center">
			<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-2a2 2 0 012-2h10a2 2 0 012 2v2h-4m-6 0h6"
				/>
			</svg>
			মন্তব্য: {post._count.comments}
		</span>
	</div>
</article>
