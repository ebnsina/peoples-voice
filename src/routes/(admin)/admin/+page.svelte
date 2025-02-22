<script lang="ts">
	let { data } = $props();
</script>

<h1>Admin Dashboard</h1>
<h2>Users ({data.users.length})</h2>
<ul>
	{#each data.users as user}
		<li>{user.username} - {user.isAdmin ? 'Admin' : 'User'}</li>
	{/each}
</ul>
<h2>Posts ({data.posts.length})</h2>
<h2>Votes ({data.votes.length})</h2>
<ul>
	{#each data.votes as vote}
		<li>{vote.user.username} voted {vote.voteType} on post {vote.postId}</li>
	{/each}
</ul>
