<script>
	import { getContext } from 'svelte';

	const { xGet, xScale, yRange } = getContext('LayerCake');
	
	export let ticks;
	export let colors = ['lightgrey', 'grey', 'grey', 'lightgrey'];
	export let opacity = 1;
	
</script>

<g class="stack-group" opacity={opacity}>
	{#each ticks.slice(0, -1) as tick, i}
		<rect
			class='group-rect'
			x="{$xScale(tick)}"
			y="{$yRange[1]}"
			width="{$xScale(ticks[i + 1]) - $xScale(tick)}"
			height="{$yRange[0]}"
			fill="{colors[i]}"
		/>
	{/each}
</g>