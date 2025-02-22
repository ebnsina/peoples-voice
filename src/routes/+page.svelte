<script lang="ts">
	import { enhance } from '$app/forms';
	import Post from '$lib/components/post.svelte';
	import type { PageProps } from './$types';

	const { data, form }: PageProps = $props();
</script>

<div class="space-y-10">
	{#if data.user}
		<div>
			<h1 class="text-2xl font-bold">Welcome to the community</h1>
			<p class="text-sm text-blue-950">Sign in to post a question or answer someone's question.</p>
		</div>

		{#if form?.success}
			<div class="rounded-xl bg-green-100 p-4 text-green-800">
				<p class="text-sm">Post created successfully</p>
			</div>
		{/if}

		{#if form?.error}
			<div class="rounded-xl bg-red-100 p-4 text-red-800">
				<p class="text-sm">{form.error.message}</p>
			</div>
		{/if}

		<form method="POST" use:enhance class="space-y-4">
			<div>
				<label class="mb-2 block text-sm text-slate-600" for="title">Title</label>
				<input
					class="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-offset-2"
					type="text"
					name="title"
					placeholder="eg, Improve birth registration system"
				/>
			</div>
			<div>
				<label class="mb-2 block text-sm text-slate-600" for="title">Content</label>
				<textarea
					class="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-offset-2"
					name="content"
					id="content"
					placeholder="Write some description..."
				></textarea>
			</div>

			<div class="mt-6 flex items-center justify-end">
				<button
					class="cursor-pointer rounded-xl bg-blue-500 px-6 py-2.5 text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200"
					type="submit">Create Post</button
				>
			</div>
		</form>
	{:else}
		<div>
			<a href="/signin">Login</a> or <a href="/signup">Create a new account</a> to post a question.
		</div>
	{/if}

	{#if data.posts.length > 0}
		<div class="space-y-4">
			{#each data.posts as post}
				<Post {post} />
			{/each}
		</div>
	{:else}
		<p class="text-sm text-blue-950">No posts found</p>
	{/if}
</div>
