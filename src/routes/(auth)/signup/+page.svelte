<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<section class="py-20">
	<div class="mx-auto max-w-md rounded-xl border border-slate-200 p-6">
		{#if form}
			<div class="mb-4 rounded-xl bg-slate-100 p-4 text-sm text-cyan-600">
				<pre class="text-xs">{JSON.stringify(form, null, 2)}</pre>
			</div>
		{/if}

		<form method="POST" use:enhance>
			<h2 class="mb-8 text-center text-2xl font-bold tracking-tight text-gray-800">
				আপনার একাউন্ট তৈরি করুন
			</h2>

			<div class="mb-6">
				<label for="username" class="mb-2 block text-sm font-medium text-gray-700">
					ব্যবহারকারীর নাম
				</label>
				<input
					id="username"
					name="username"
					type="text"
					placeholder="আপনার ব্যবহারকারীর নাম লিখুন"
					class="input"
					required
					defaultValue={form?.username ?? ''}
				/>
			</div>

			<div class="mb-6">
				<label for="email" class="mb-2 block text-sm font-medium text-gray-700"> ইমেইল </label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="আপনার ইমেইল লিখুন"
					class="input"
					required
					defaultValue={form?.email ?? ''}
				/>
			</div>

			<div class="mb-6">
				<label for="phone" class="mb-2 block text-sm font-medium text-gray-700"> ফোন </label>
				<input
					id="phone"
					name="phone"
					type="tel"
					placeholder="আপনার ফোন নম্বর লিখুন"
					class="input"
					required
					defaultValue={form?.phone ?? ''}
				/>
			</div>

			<div class="mb-8">
				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">
					পাসওয়ার্ড
				</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="একটি পাসওয়ার্ড তৈরি করুন"
					class="input"
					required
				/>
			</div>

			<div class="flex items-center justify-center">
				<button type="submit" class="btn"> নিবন্ধন করুন </button>
			</div>
		</form>
	</div>
</section>
