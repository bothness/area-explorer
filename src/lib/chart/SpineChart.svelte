<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';

	import Stack from './Stack.svelte';
	import Marker from './Marker.svelte';
	import AxisX from './AxisX.svelte';

	export let data;
	export let ticks;
  export let colors = ['lightgrey', 'grey', 'grey', 'lightgrey'];
	export let key = 'x';
	export let padding = { top: 0, bottom: 20, left: 2, right: 2 };
	export let stagger = false;
	export let formatTick = d => d.toLocaleString();
	export let scale = 'linear';
	export let suffix = '';
	
	let d3scale = scale == "log" ? scaleLog : scale == "sqrt" ? scaleSqrt : scaleLinear;
</script>

<style>
	.chart-container {
		width: 100%;
		height: 100%;
    min-height: 10px;
	}
</style>

<div class="chart-container" aria-hidden="true">
	<LayerCake
		padding={padding}
		x={key}
		yDomain={[0, 1]}
		xDomain={[ticks[0], ticks[ticks.length - 1]]}
		xScale={d3scale()}
		data={data}
	>
		<Svg>
			<Stack
				{ticks}
				{colors}
				opacity={0.3}
			/>
			<AxisX
				{ticks}
				solid={true}
				lineColor="rgba(0,0,0,0.65)"
				{formatTick}
				snapTicks={true}
				dyTick={0}
				{stagger}
				{suffix}
			/>
			<Marker/>
		</Svg>
	</LayerCake>
</div>