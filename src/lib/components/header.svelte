<script lang="ts">
	import Logo from './logo.svelte';

	let { user } = $props();
</script>

<header class="py-3">
	<nav class="flex items-center justify-between">
		<Logo />

		<ul class="flex space-x-4">
			{#if !user}
				<li>
					<a class="btn" href="/signin">লগইন</a>
				</li>
			{:else}
				<form method="POST" action="/signout">
					<button class="btn" type="submit"> Sign Out </button>
				</form>
			{/if}
		</ul>
	</nav>
</header>
