<script lang="ts">
	import Comments from '$lib/components/comments.svelte';
	import VoteDisplay from '$lib/components/vote-display.svelte';
	import { formatDate } from '$lib/utils';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const post = data.post;
</script>

<header class="mb-8">
	<h1 class="mb-4 text-2xl leading-tight font-bold text-cyan-950 md:text-3xl">
		{post.title}
	</h1>

	<div class="flex items-center gap-4 text-sm text-gray-600">
		<span>লিখেছেন {post.author.username}</span>
		<span class="hidden sm:inline">•</span>
		<time datetime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
	</div>
</header>

<section class="prose prose-lg mb-8 max-w-none text-gray-700">
	<p>{post.content}</p>
</section>

<section class="b border-slate-10 mb-8 rounded-lg border border-cyan-300 px-4 py-6">
	<h2 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 10l7-7m0 0l7 7m-7-7v18"
			/>
		</svg>
		ভোট ({post.votes.length})
	</h2>

	{#if post.votes.length > 0}
		<VoteDisplay votes={post.votes} />
	{:else}
		<p class="text-gray-500 italic">এখনো কোনো ভোট নেই।</p>
	{/if}
</section>

<Comments {post} />
