<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const post = data.post;

	let openReplyForm: string | null = $state(null);

	const formatDate = (date: Date) =>
		new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<header class="mb-8">
		<h1 class="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
			{post.title}
		</h1>
		<div class="flex items-center gap-4 text-sm text-gray-600">
			<span>By {post.author.username}</span>
			<span class="hidden sm:inline">•</span>
			<time datetime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
		</div>
	</header>

	<section class="prose prose-lg mb-8 max-w-none text-gray-700">
		<p>{post.content}</p>
	</section>

	<section class="mb-8 rounded-lg bg-gray-50 p-6 shadow-sm">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 10l7-7m0 0l7 7m-7-7v18"
				/>
			</svg>
			Votes ({post.votes.length})
		</h2>
		{#if post.votes.length > 0}
			<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each post.votes as vote}
					<li
						class="flex items-center gap-2 rounded-md p-3
              {vote.voteType === 'AGREE'
							? 'bg-green-100 text-green-800'
							: vote.voteType === 'DISAGREE'
								? 'bg-red-100 text-red-800'
								: vote.voteType === 'NO_COMMENT'
									? 'bg-gray-200 text-gray-800'
									: 'bg-blue-100 text-blue-800'}"
					>
						<span class="font-medium">{vote.user.username}</span>
						<span class="text-sm">
							{vote.voteType.split('_').join(' ').toLowerCase()}
						</span>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-gray-500 italic">No votes yet.</p>
		{/if}
	</section>

	<!-- Comments Section -->
	<section class="rounded-lg bg-white p-6 shadow-sm">
		<h2 class="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-800">
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-2a2 2 0 012-2h10a2 2 0 012 2v2h-4m-6 0h6"
				/>
			</svg>
			Comments ({post.comments.length})
		</h2>

		{#if post.comments.length > 0}
			<div class="mb-8 space-y-6">
				{#each post.comments as comment}
					<div class="border-l-4 border-gray-200 pl-4">
						<!-- Comment -->
						<div class="mb-2 rounded-r-lg bg-gray-50 p-4">
							<div class="mb-2 flex items-center gap-3">
								<span class="font-medium text-gray-800">{comment.author.username}</span>
								<span class="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
							</div>
							<p class="text-gray-700">{comment.content}</p>
						</div>

						<!-- Reply Button -->
						<button
							class="mb-2 text-sm text-blue-600 hover:underline"
							onclick={() => (openReplyForm = openReplyForm === comment.id ? null : comment.id)}
						>
							{openReplyForm === comment.id ? 'Cancel' : 'Reply'}
						</button>

						<!-- Reply Form (Toggles Visibility) -->
						{#if openReplyForm === comment.id}
							<form method="POST" action="?/createReply" use:enhance class="mb-4 ml-6 space-y-3">
								<input type="hidden" name="commentId" value={comment.id} />
								<textarea
									name="content"
									rows="3"
									class="w-full resize-y rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
									placeholder="Write your reply..."
									required
								></textarea>
								<button
									type="submit"
									class="rounded-lg bg-blue-600 px-3 py-1 text-white transition-colors duration-200 hover:bg-blue-700"
								>
									Post Reply
								</button>
							</form>
						{/if}

						<!-- Replies -->
						{#if comment.replies.length > 0}
							<div class="ml-6 space-y-4">
								{#each comment.replies as reply}
									<div class="rounded-lg bg-gray-100 p-3">
										<div class="mb-1 flex items-center gap-3">
											<span class="font-medium text-gray-800">{reply.author.username}</span>
											<span class="text-sm text-gray-500">{formatDate(reply.createdAt)}</span>
										</div>
										<p class="text-sm text-gray-700">{reply.content}</p>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="mb-8 text-gray-500 italic">No comments yet.</p>
		{/if}

		<!-- Comment Form -->
		<form method="POST" action="?/createComment" use:enhance class="space-y-4">
			<div>
				<label for="comment" class="mb-1 block text-sm font-medium text-gray-700">
					Add a Comment
				</label>
				<textarea
					id="comment"
					name="content"
					rows="4"
					class="w-full resize-y rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
					placeholder="Write your comment here..."
					required
				></textarea>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
			>
				Post Comment
			</button>
		</form>
	</section>
</div>
