<script lang="ts">
	const { votes }: { voteType: string }[] = $props();

	const totalVotes = votes.length;
	const voteCounts = {
		AGREE: votes.filter((v) => v.voteType === 'AGREE').length,
		DISAGREE: votes.filter((v) => v.voteType === 'DISAGREE').length,
		NO_COMMENT: votes.filter((v) => v.voteType === 'NO_COMMENT').length,
		ABSTAIN: votes.filter((v) => v.voteType === 'ABSTAIN').length
	};
	const votePercentages = {
		AGREE: totalVotes > 0 ? (voteCounts.AGREE / totalVotes) * 100 : 0,
		DISAGREE: totalVotes > 0 ? (voteCounts.DISAGREE / totalVotes) * 100 : 0,
		NO_COMMENT: totalVotes > 0 ? (voteCounts.NO_COMMENT / totalVotes) * 100 : 0,
		ABSTAIN: totalVotes > 0 ? (voteCounts.ABSTAIN / totalVotes) * 100 : 0
	};
</script>

<div class="space-y-3">
	{#each ['AGREE', 'DISAGREE', 'NO_COMMENT', 'ABSTAIN'] as voteType}
		<div class="flex items-center gap-3">
			<span class="w-24 text-sm font-medium text-gray-800">
				{voteType === 'AGREE'
					? 'সম্মত'
					: voteType === 'DISAGREE'
						? 'অসম্মত'
						: voteType === 'NO_COMMENT'
							? 'মন্তব্য নেই'
							: 'ভোটদানে বিরত'}
				({voteCounts[voteType]})
			</span>
			<div class="h-2 flex-1 rounded-full bg-gray-200">
				<div
					class="h-2 rounded-full
                    {voteType === 'AGREE'
						? 'bg-green-500'
						: voteType === 'DISAGREE'
							? 'bg-red-500'
							: voteType === 'NO_COMMENT'
								? 'bg-gray-500'
								: 'bg-blue-500'}"
					style="width: {votePercentages[voteType]}%"
				></div>
			</div>
			<span class="text-sm text-gray-600">
				{votePercentages[voteType].toFixed(1)}%
			</span>
		</div>
	{/each}
</div>
