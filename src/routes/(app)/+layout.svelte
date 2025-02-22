<script lang="ts">
	import Header from '$lib/components/header.svelte';
	let { data, children } = $props();

</script>

<div class="container mx-auto max-w-xl px-4 py-2">
	<!-- <Header user={data.user} /> -->
	{@render children()}
</div>
