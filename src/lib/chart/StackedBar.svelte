<script>
	export let data;
	export let xKey = "x";
	export let yKey = "y";
	export let colors = ['#206095', '#A8BD3A', '#003C57', '#27A0CC', '#118C7B', '#F66068', '#746CB1', '#22D0B6', 'lightgrey'];

  let sum, breaks;
	
	function update() {
		// Calculate sum and breaks from 0% to 100%, and round breaks to nearest 1
	  sum = data.map(d => d[yKey]).reduce((a, b) => a + b, 0);
	  let brks = [0];
	  data.forEach(d => brks.push(brks[brks.length - 1] + d[yKey]));
    breaks = brks;
	}
	
	$: (data || yKey) && update();
</script>

{#if sum && breaks}
<div class="stack">
	{#each data as row, i}
	<div class="cell" style="left: {(breaks[i] / sum) * 100}%; width: {(row[yKey] / sum) * 100}%; background-color: {colors[i]};"/>
	{/each}
</div>
{/if}

<style>
	.stack {
    position: relative;
		width: 100%;
		height: 100%;
	}
	.cell {
		position: absolute;
    height: 100%;
    top: 0;
	}
</style>