<script>
	export let count = 100;
	export let rank = 20;
	export let width = 4;
	export let height = 20;
	export let color = "black";
	
	$: offset = 1 - ((rank - 1) / (count - 1));
</script>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 10px;
		background-color: rgba(128,128,128,0.2);
	}
	.marker {
		position: absolute;
		top: 0;
		height: 100%;
	}
</style>

<div class="container" style="height: {height}px">
	<div class="marker" style="width: {width}px; left: calc({offset} * (100% - {width}px)); background-color: {color};"/>
</div>