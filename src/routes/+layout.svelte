<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '../app.css';

	let { data, children } = $props();
</script>

<div class="container mx-auto max-w-xl py-2">
	<Header user={data.user} />

	{@render children()}
</div>
