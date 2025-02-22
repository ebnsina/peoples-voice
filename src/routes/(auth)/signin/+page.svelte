<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>লগইন</title>
</svelte:head>

<section class="py-40">
	<div class="mx-auto max-w-md rounded-xl border border-slate-200 p-6">
		{#if form}
			<div class="mb-4 rounded-xl bg-slate-100 p-4 text-sm text-cyan-600">
				<pre class="text-xs">{JSON.stringify(form, null, 2)}</pre>
			</div>
		{/if}

		<h2 class="mb-4 text-lg font-medium">লগইন</h2>

		<form method="post" use:enhance class="space-y-4">
			<div>
				<label class="label" for="username">ব্যবহারকারীর নাম</label>
				<input
					class="input"
					type="text"
					name="username"
					id="username"
					placeholder="আপনার ব্যবহারকারীর নাম লিখুন"
					required
					defaultValue={form?.username ?? ''}
					minlength="3"
					maxlength="100"
				/>
			</div>
			<div>
				<label class="label" for="password">পাসওয়ার্ড</label>
				<input
					class="input"
					type="password"
					name="password"
					id="password"
					placeholder="********"
					required
					minlength="3"
					maxlength="100"
					autocomplete="username"
				/>
			</div>

			<div class="pt-4">
				<button class="btn" type="submit">লগইন</button>
			</div>
		</form>

		<div class="mt-6">
			<a
				class="flex items-center justify-center text-sm text-slate-600 underline-offset-2 hover:underline"
				href="/signup">নতুন একাউন্ট তৈরি করুন</a
			>
		</div>
	</div>
</section>
