<script lang="ts">
	let { data, children } = $props();
</script>

<div class="container mx-auto max-w-xl px-4 py-2">
	{@render children()}
</div>
