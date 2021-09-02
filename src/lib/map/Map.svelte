<script>
	import { onMount, setContext } from "svelte";
	import { Map, NavigationControl, GeolocateControl } from "mapbox-gl";

	export let map;
	export let id = "map";
	export let location = {
		bounds: [
			[-5.816, 49.864],
			[1.863, 55.872],
		], // England & Wales
	};
	export let style = "https://bothness.github.io/ons-basemaps/data/style-omt.json";
	export let interactive = true;
	export let minzoom = 0;
	export let maxzoom = 14;
	export let zoom = null;
	export let scrollzoom = true;
	export let geolocate = true;
	export let zoomcontrol = true;
	export let options = {};

	let container;
	let w;

	setContext("map", {
		getMap: () => map,
	});

	if (location.bounds) {
		options = { ...options, bounds: location.bounds };
	} else if (location.lon && location.lat) {
		options = {
			...options,
			center: [location.lon, location.lat],
		};
		if (location.zoom) {
			options.zoom = location.zoom;
		}
	}

	onMount(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "https://unpkg.com/mapbox-gl@1.13.0/dist/mapbox-gl.css";

		link.onload = () => {
			map = new Map({
				container,
				style: style,
				minZoom: minzoom,
				maxZoom: maxzoom,
				interactive: interactive,
				...options,
			});

			if (zoomcontrol) {
				map.addControl(new NavigationControl({showCompass: false}));
			}
			if (!scrollzoom) {
				map.scrollZoom.disable();
			}
			if (geolocate) {
				map.addControl(new GeolocateControl());
			}

			// Get initial zoom level
			map.on("load", () => {
				zoom = map.getZoom();
			});

			// Update zoom level when the view zooms
			map.on("zoom", () => {
				zoom = map.getZoom();
			});
		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});

	// Function that forces map to resize to fit parent div, in case it doesn't automatically
	function resizeCanvas() {
		let canvas = document.getElementsByClassName("mapboxgl-canvas");
		if (canvas[0]) {
			canvas[0].style.width = "100%";
			map.resize();
		}
	}

	// Invoke above function when parent div size changes
	$: w && resizeCanvas();
</script>

<div class="absolute top-0 bg-grey4 w-full h-full" bind:clientWidth={w} bind:this={container} {id}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	:global(.mapboxgl-control-container button) {
		margin: 0;
	}
	div {
		width: 100%;
		height: 100%;
	}
</style>
