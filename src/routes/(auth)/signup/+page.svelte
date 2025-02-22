<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<div class="mx-auto mt-12 max-w-lg px-4">
	{#if form}
		<div class="mb-4 rounded-xl bg-slate-100 p-4 text-sm text-cyan-600">
			<pre class="text-xs">{JSON.stringify(form, null, 2)}</pre>
		</div>
	{/if}

	<form
		method="POST"
		use:enhance
		class="mb-6 rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
	>
		<!-- Header -->
		<h2 class="mb-8 text-center text-2xl font-bold tracking-tight text-gray-800">
			Create Your Account
		</h2>

		<!-- Username -->
		<div class="mb-6">
			<label for="username" class="mb-2 block text-sm font-medium text-gray-700"> Username </label>
			<input
				id="username"
				name="username"
				type="text"
				placeholder="Enter your username"
				class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				required
				defaultValue={form?.username ?? ''}
			/>
		</div>

		<!-- Email -->
		<div class="mb-6">
			<label for="email" class="mb-2 block text-sm font-medium text-gray-700"> Email </label>
			<input
				id="email"
				name="email"
				type="email"
				placeholder="Enter your email"
				class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				required
				defaultValue={form?.email ?? ''}
			/>
		</div>

		<!-- Phone -->
		<div class="mb-6">
			<label for="phone" class="mb-2 block text-sm font-medium text-gray-700"> Phone </label>
			<input
				id="phone"
				name="phone"
				type="tel"
				placeholder="Enter your phone number"
				class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				required
				defaultValue={form?.phone ?? ''}
			/>
		</div>

		<!-- Password -->
		<div class="mb-8">
			<label for="password" class="mb-2 block text-sm font-medium text-gray-700"> Password </label>
			<input
				id="password"
				name="password"
				type="password"
				placeholder="Create a password"
				class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				required
			/>
		</div>

		<!-- Submit Button -->
		<div class="flex items-center justify-center">
			<button
				type="submit"
				class="transform rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				Sign Up
			</button>
		</div>
	</form>
</div>
