<script>
	import Legend from './Legend.svelte';
	export let data;
	export let height = 80;
	export let xKey = "x";
	export let yKey = "y";
	export let zKey = "ew";
	export let width = 5;
	export let colors = ['#206095', '#A8BD3A', '#003C57', '#27A0CC', '#118C7B', '#F66068', '#746CB1', '#22D0B6', 'lightgrey'];
	export let vertical = true;
	export let round = false;
	export let decimals = 0;
	
	let cells;
	
	// Set style string
	let style = vertical ? `grid-auto-flow: column; grid-template-rows: repeat(${width}, 1fr);` : `grid-template-columns: repeat(${width}, 1fr);`;
	
	function update() {
		// Calculate sum and breaks from 0% to 100%, and round breaks to nearest 1
	let sum = data.map(d => d[yKey]).reduce((a, b) => a + b, 0);
	let breaks = [0];
	data.forEach(d => breaks.push(breaks[breaks.length - 1] + ((d[yKey] / sum) * 100)));
	breaks = breaks.map(d => Math.round(d));
	
	// Generate 100 cells
	let cls = [];
	data.forEach((d, i) => {
		let count = breaks[i + 1] - breaks[i];
		for (let j = 0; j < count; j ++) {
			cls.push({label: d[xKey], color: colors[i]});
		}
	});
		cells = cls;
	}
	
	$: data && update();
</script>

<div class="chart" style="height: {height}px;">
	<div class="grid" {style}>
		{#each cells as cell}
		<div class:round style="background-color: {cell.color}"/>
		{/each}
	</div>
</div>
<div class="legend">
	<Legend {data} {zKey} {round} {decimals}/>
</div>

<style>
	.chart {
		width: 100%;
	}
	.legend {
		width: 100%;
		margin-top: 3px;
	}
	.grid {
		display: grid;
		width: 100%;
		height: 100%;
		grid-gap: 1px;
		justify-content: stretch;
	}
	.grid > div {
		background-color: grey;
	}
	.round {
		border-radius: 50%;
		transform: scale(0.9);
	}
</style>