<script lang="ts">
	import Logo from './logo.svelte';

	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Posts', href: '/posts' },
		{ label: 'About', href: '/about' }
	];

	let { user } = $props();
</script>

<header class="py-3">
	<nav class="flex items-center justify-between">
		<Logo />

		<ul class="flex space-x-4">
			{#each navLinks as { label, href }, i}
				<li>
					<a class="text-sm text-gray-700 hover:text-gray-900" class:selected={i === 0} {href}>
						{label}
					</a>
				</li>
			{/each}

			{#if !user}
				<li>
					<a class="text-sm text-gray-700 hover:text-gray-900" href="/signin">Sign In</a>
				</li>
			{:else}
				<form method="POST" action="/signout">
					<button class="text-sm text-gray-700 hover:text-gray-900" type="submit">
						Sign Out
					</button>
				</form>
			{/if}
		</ul>
	</nav>
</header>
