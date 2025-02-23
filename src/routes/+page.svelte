<script lang="ts">
	import { enhance } from '$app/forms';
	import Post from '$lib/components/post.svelte';
	import type { PageProps } from './$types';

	const { data, form }: PageProps = $props();
</script>

<div class="space-y-10">
	{#if data.user}
		{#if form?.success}
			<div class="rounded-xl bg-green-100 p-4 text-green-800">
				<p class="text-sm">পোস্ট সফলভাবে তৈরি হয়েছে</p>
			</div>
		{/if}

		{#if form?.error}
			{#if form.error.formErrors?.length}
				<div class="rounded-xl bg-red-100 p-4 text-red-800">
					{#each form.error.formErrors as err}
						<p class="text-sm">{err}</p>
					{/each}
				</div>
			{/if}

			<form method="POST" use:enhance class="space-y-4">
				<div>
					<label class="mb-2 block text-sm text-slate-600" for="title">শিরোনাম</label>
					<input
						class="input"
						type="text"
						name="title"
						id="title"
						value={form.error.fields?.title ?? ''}
						placeholder="যেমন, জন্ম নিবন্ধন ব্যবস্থা উন্নত করা"
					/>
					{#if form.error.fieldErrors?.title}
						<p class="mt-1 text-xs text-red-600">{form.error.fieldErrors.title[0]}</p>
					{/if}
				</div>

				<div>
					<label class="mb-2 block text-sm text-slate-600" for="content">বিষয়বস্তু</label>
					<textarea class="input" name="content" id="content" placeholder="কিছু বিবরণ লিখুন..."
						>{form.error.fields?.content ?? ''}</textarea
					>
					{#if form.error.fieldErrors?.content}
						<p class="mt-1 text-xs text-red-600">{form.error.fieldErrors.content[0]}</p>
					{/if}
				</div>

				<div class="mt-6 flex items-center justify-end">
					<button class="btn" type="submit">পোস্ট তৈরি করুন</button>
				</div>
			</form>
		{:else}
			<form method="POST" use:enhance class="space-y-4">
				<div>
					<label class="mb-2 block text-sm text-slate-600" for="title">শিরোনাম</label>
					<input
						class="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-offset-2"
						type="text"
						name="title"
						id="title"
						placeholder="যেমন, জন্ম নিবন্ধন ব্যবস্থা উন্নত করা"
					/>
				</div>

				<div>
					<label class="mb-2 block text-sm text-slate-600" for="content">বিষয়বস্তু</label>
					<textarea
						class="w-full rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-offset-2"
						name="content"
						id="content"
						placeholder="কিছু বিবরণ লিখুন..."
					></textarea>
				</div>

				<div class="mt-6 flex items-center justify-end">
					<button class="btn" type="submit">পোস্ট তৈরি করুন</button>
				</div>
			</form>
		{/if}
	{:else}
		<div class="text-sm text-slate-600">
			<a class="hover:underline hover:underline-offset-2" href="/signin">লগইন</a> অথবা
			<a class="hover:underline hover:underline-offset-2" href="/signup">নতুন একাউন্ট তৈরি করুন</a>
		</div>
	{/if}

	{#if data.posts.length > 0}
		<div class="space-y-4">
			{#each data.posts as post}
				<Post {post} />
			{/each}
		</div>
	{:else}
		<p class="text-sm text-blue-950">কোনো পোস্ট পাওয়া যায়নি</p>
	{/if}
</div>
