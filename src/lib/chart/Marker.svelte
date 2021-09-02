<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale, xDomain, yDomain } = getContext('LayerCake');

	export let axis = 'x';
	export let color = '#206095';
	
	$: min = axis == 'y' ? $xDomain[0] : $yDomain[0];
	$: max = axis == 'y' ? $xDomain[1] : $yDomain[1];
</script>

{#each $data as d}
<g class="marker">
	<circle
		cx="{axis == 'y' ? $xScale((max + min) / 2) : $xGet(d)}"
		cy="{axis == 'y' ? $yGet(d) : $yScale((max + min) / 2)}"
		r="8"
		fill="{color}"
		stroke-width="0"
	/>
</g>
{/each}