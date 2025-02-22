<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { formatDate } from '$lib/utils';
	import type { Post } from '@prisma/client';

	let openReplyForm: string | null = $state(null);
	const { post }: { post: Post } = $props();
</script>

<section class="rounded-lg border border-cyan-300 bg-white px-4 py-6">
	<h2 class="mb-6 flex items-center gap-2 text-xl font-semibold text-slate-800">
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-2a2 2 0 012-2h10a2 2 0 012 2v2h-4m-6 0h6"
			/>
		</svg>
		মন্তব্য ({post.comments.length})
	</h2>

	{#if post.comments.length > 0}
		<div class="mb-8 space-y-6 text-sm">
			{#each post.comments as comment}
				<div class="border-l-2 border-slate-300 pl-4">
					<!-- Comment -->
					<div class="mb-2 rounded-lg bg-slate-50 p-4">
						<div class="mb-2 flex items-center gap-3">
							<span class="font-medium text-slate-800">{comment.author.username}</span>
							<span class="text-sm text-slate-500">{formatDate(comment.createdAt)}</span>
						</div>
						<p class="text-slate-700">{comment.content}</p>
					</div>

					<!-- Reply Button -->
					{#if page.data.user}
						<button
							class="mb-2 text-sm text-cyan-600 hover:underline"
							onclick={() => (openReplyForm = openReplyForm === comment.id ? null : comment.id)}
						>
							{openReplyForm === comment.id ? 'বাতিল' : 'উত্তর দিন'}
						</button>
					{:else}
						<p class="my-2 text-sm text-slate-600">
							উত্তর দিতে <a class="underline" href="/signin">লগইন</a> করুন
						</p>
					{/if}

					<!-- Reply Form (Toggles Visibility) -->
					{#if openReplyForm === comment.id}
						<form method="POST" action="?/createReply" use:enhance class="mb-4 ml-6 space-y-3">
							<input type="hidden" name="commentId" value={comment.id} />
							<textarea
								name="content"
								rows="3"
								class="input resize-y"
								placeholder="আপনার উত্তর লিখুন..."
								required
							></textarea>
							<button type="submit" class="btn"> উত্তর পোস্ট করুন </button>
						</form>
					{/if}

					<!-- Replies -->
					{#if comment.replies.length > 0}
						<div class="ml-6 space-y-4">
							{#each comment.replies as reply}
								<div class="rounded-lg bg-slate-100 p-3">
									<div class="mb-1 flex items-center gap-3">
										<span class="font-medium text-slate-800">{reply.author.username}</span>
										<span class="text-sm text-slate-500">{formatDate(reply.createdAt)}</span>
									</div>
									<p class="text-sm text-slate-700">{reply.content}</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p class="mb-8 text-slate-500 italic">এখনো কোনো মন্তব্য নেই।</p>
	{/if}

	{#if page.data.user}
		<form method="POST" action="?/createComment" use:enhance class="space-y-4">
			<div>
				<label for="comment" class="label"> একটি মন্তব্য যোগ করুন </label>
				<textarea
					id="comment"
					name="content"
					rows="4"
					class="input resize-y"
					placeholder="এখানে আপনার মন্তব্য লিখুন..."
					required
				></textarea>
			</div>
			<button type="submit" class="btn"> মন্তব্য পোস্ট করুন </button>
		</form>
	{:else}
		<p class="text-sm text-slate-600">
			মন্তব্য করতে <a class="underline" href="/signin">লগইন</a> করুন
		</p>
	{/if}
</section>
