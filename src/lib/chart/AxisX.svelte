<script>
	import { getContext } from 'svelte';

	const { width, height, xScale, yScale, yRange } = getContext('LayerCake');

	export let gridlines = true;
	export let formatTick = d => d;
	export let baseline = false;
	export let flipped = false;
	export let snapTicks = false;
	export let ticks = undefined;
	export let prefix = '';
	export let suffix = '';
	export let xTick = undefined;
	export let yTick = 15;
	export let dxTick = 0;
	export let dyTick = 0;
	export let lineColor = '#999';
	export let textColor = '#555';
	export let solid = false;
	export let stagger = false;
	export let median = true;

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$xScale.domain() :
			$xScale.ticks(ticks);

	function textAnchor(i) {
		if (snapTicks === true) {
			if (i === 0) {
				return 'start';
			}
			if (i === tickVals.length - 1) {
				return 'end';
			}
		}
		return 'middle';
	}
</script>

<g class='axis x-axis'>
	{#each tickVals as tick, i}
		<g class='tick tick-{ tick }' transform='translate({$xScale(tick)},{$yRange[0]})'>
			{#if gridlines !== false}
				<line y1='{($height * -1)}' y2='{stagger && i % 2 == 0 ? dyTick + yTick + 2 : dyTick + yTick - 13}' x1='0' x2='0' stroke='{lineColor}' stroke-width="{median && Array.isArray(ticks) && i == Math.floor(ticks.length / 2) ? 2 : 1}" class:baseline={solid}></line>
			{/if}
			<text
				x="{xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0 }"
				y='{flipped ? ($height * -1) - 6 : stagger && i % 2 == 0 ? yTick + 15 : yTick}'
				dx='{textAnchor(i) == 'start' ? dxTick - 2 : textAnchor(i) == 'end' ? dxTick + 2 : dxTick}'
				dy='{dyTick}'
				text-anchor='{textAnchor(i)}'
				fill='{textColor}'
				class:bold="{median && Array.isArray(ticks) && i == Math.floor(ticks.length / 2)}">
				{#if i == tickVals.length - 1}
				{prefix}{formatTick(tick)}{suffix}
				{:else}
				{formatTick(tick)}
				{/if}
			</text>
		</g>
	{/each}
	{#if baseline === true}
		<line class="baseline" y1='{$height}' y2='0' x1='{$xScale(0)}' x2='{$xScale(0)}' stroke='{lineColor}'></line>
	{/if}
</g>

<style>
	.tick {
		font-size: 0.85em;
	}
	line,
	.tick line {
		stroke-dasharray: 2;
	}
	.baseline {
		stroke-dasharray: 0 !important;
	}
	.bold {
		font-weight: bold;
	}
</style>