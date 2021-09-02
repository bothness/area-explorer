<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, yRange, xScale, yScale, y, z } = getContext('LayerCake');

	$: columnWidth = d => {
		const vals = $xGet(d);
		return Math.max(0, (vals[1] - vals[0]));
	};

	$: columnHeight = d => {
		return $yRange[0] - $yGet(d);
	};

	/* --------------------------------------------
	 * Default styles
	 */
	export let stroke = '';
	export let strokeWidth = 0;
	export let dxTick = 0;
	export let dyTick = 0;
	export let formatVal = d => d;
	export let fill = '#206095';
	export let textAnchor = 'middle';

</script>

<style>
	.column-group {
		font-size: .85em;
		isolation: auto;
	}
</style>

<g class="column-group">
	{#each $data as d, i}
		<rect
			class='group-rect'
			data-id="{i}"
			x="{$xScale.bandwidth ? $xGet(d) : $xGet(d)[0]}"
			y="{$yGet(d)}"
			width="{$xScale.bandwidth ? $xScale.bandwidth() : columnWidth(d)}"
			height="{columnHeight(d)}"
			fill={fill}
			{stroke}
			stroke-width="{strokeWidth}"
		/>
		{#if $z}
		<rect
			class='group-rect'
			data-id="{i}"
			x="{$xScale.bandwidth ? $xGet(d) : $xGet(d)[0]}"
			y="{$yScale($z(d)) - 1}"
			width="{$xScale.bandwidth ? $xScale.bandwidth() : columnWidth(d)}"
			height="2"
			fill="#27A0CC"
			{stroke}
			stroke-width="{strokeWidth}"
		/>
		{/if}
	  <text
	  	x="{$xScale.bandwidth ? $xGet(d) + ($xScale.bandwidth() / 2) : $xGet(d)[0]}"
	  	y='{$yGet(d) - 4}'
  		dx='{dxTick}'
  		dy='{dyTick}'
  		text-anchor='{textAnchor}'>{formatVal($y(d))}</text>
	{/each}
</g>