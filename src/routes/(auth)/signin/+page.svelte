<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<section class="py-40">
	<div class="mx-auto max-w-md rounded-xl border border-slate-200 p-6">
		{#if form}
			<div class="mb-4 rounded-xl bg-slate-100 p-4 text-sm text-cyan-600">
				<pre class="text-xs">{JSON.stringify(form, null, 2)}</pre>
			</div>
		{/if}

		<h2 class="mb-4 text-lg font-medium">Sign in</h2>

		<form method="post" use:enhance class="space-y-4">
			<div>
				<label class="mb-2 block text-sm text-slate-600" for="username">Username</label>
				<input
					class="w-full"
					type="text"
					name="username"
					id="username"
					placeholder="helana171"
					required
					defaultValue={form?.username ?? ''}
					minlength="3"
					maxlength="100"
				/>
			</div>
			<div>
				<label class="mb-2 block text-sm text-slate-600" for="password">Password</label>
				<input
					class="w-full"
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
				<button
					class="block w-full cursor-pointer rounded-xl bg-cyan-600 px-6 py-2.5 text-sm text-white"
					type="submit">Sign in</button
				>
			</div>
		</form>

		<div class="mt-6">
			<a
				class="flex items-center justify-center text-sm text-slate-600 underline-offset-2 hover:underline"
				href="/signup">Create a new account</a
			>
		</div>
	</div>
</section>
