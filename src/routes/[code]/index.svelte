<script context="module">
	export const prerender = true;

	import { getData } from "$lib/utils";
	import { urls } from "$lib/config";
	
	async function loadArea(code, options) {
		let res = await fetch(urls.places + code + '.json');
		let json = await res.json();

		return json;
	}

	async function loadEW(options) {
		const code = 'K04000001';

		let res = await fetch(urls.places + code + '.json');
		let json = await res.json();

		return json;
	}

	export async function load({ page, fetch }) {
		let code = page.params.code;

		let res = await getData(urls.options);
		
		let lookup = {};
		res.forEach(d => lookup[d.code] = d.name);
		res.forEach(d => {
		  d.typepl = types[d.type].pl;
		  d.typenm = types[d.type].name;
		  d.typestr = lookup[d.parent] ? `${types[d.type].name} in ${lookup[d.parent]}` : '';
		});

		let options = res.sort((a, b) => a.name.localeCompare(b.name));
		let ew = await loadEW(options);
		let place = await loadArea(code, options);

		return {
			props: { options, place, ew }
		}
	}
</script>
<script>
  import { base, assets } from "$app/paths";
  import { goto } from '$app/navigation';
	import { suffixer, changeClass, changeStr, adjectify } from "$lib/utils";
	import { types, codes, mapStyle, mapSources, mapLayers, mapPaint } from "$lib/config";
	import Section from "$lib/layout/Section.svelte";
	import ColChart from "$lib/chart/ColChart.svelte";
	import StackedBarChart from "$lib/chart/StackedBarChart.svelte";
	import Em from "$lib/ui/Em.svelte";
	import Select from "$lib/ui/Select.svelte";
	import Map from "$lib/map/Map.svelte";
	import MapSource from "$lib/map/MapSource.svelte";
	import MapLayer from "$lib/map/MapLayer.svelte";

	export let options, place, ew;
	
	let w, cols;
	let map = null;
	let overtime = false;

	let active = {
		selected: null,
		type: null,
		childType: null,
		highlighted: [],
		hovered:  null
	};

	let isChild = {};
	Object.keys(mapLayers).forEach(key => isChild[key] = false);

	function makeData(props) {
		const sum = (a, b) => a + b;
		let code = props[0];
		let val = props[1];
		
		let source = place.data[code][val]['2011'];
		let sourcePrev = place.data[code][val]['2001'];
		let sourceEW = ew.data[code][val]['2011'];

		let keys = codes[code].map(d => d.code);
		let labels = codes[code].map(d => d.label ? d.label : d.code);
		let data = keys.map((key, i) => {
			if (Array.isArray(key)) {
				return {x: labels[i], y: key.map(k => source[k]).reduce(sum, 0), ew: key.map(k => sourceEW[k]).reduce(sum, 0), prev: key.map(k => sourcePrev[k]).reduce(sum, 0)};
			} else {
				return {x: labels[i], y: source[key], ew: sourceEW[key], prev: sourcePrev[key]};
			} 
		});
		
		return data;
	}

	function fitMap(bounds) {
		if (map) {
			map.fitBounds(bounds, {padding: 20});
		}
	}

	function updateActive(place)  {
		let prev = JSON.parse(JSON.stringify(active));
		let code = place.code;
		let type = place.type;
		let children = place.children[0] ? place.children.map(d => d.code) : [];
		let childType = place.type == 'rgn' ? 'cty' : children[0] ? place.children[0].type : null;

		active.selected = code;
		active.type = type;
		active.childType = childType;
		active.highlighted = children;

		let keys = Object.keys(mapLayers);
		let fillProps = ['fill-color', 'fill-opacity'];
		let lineProps = ['line-color', 'line-width', 'line-opacity'];

		// Change layer visibility and paint properties if geography level changes
		if (map && (active.type != prev.type || active.childType != prev.childType)) {
			// Set map layer visibility properties
			keys.forEach(key => {
				let visibility = key == type || (childType && key == childType) ? 'visible' : 'none';
				map.setLayoutProperty(key + '-fill', 'visibility', visibility);
				map.setLayoutProperty(key + '-bounds', 'visibility', visibility);
				if (place.parents[0]) {
					map.setLayoutProperty(key + '-self', 'visibility', visibility);
				}
				isChild[key] = key == childType ? true : false;
			});

			// Set new paint properties
			if (place.parents[0]) {
				fillProps.forEach(prop => map.setPaintProperty(type + '-fill', prop, mapPaint[children[0] ? 'fill-active' : 'fill-self'][prop]));
				lineProps.forEach(prop => {
					map.setPaintProperty(type + '-bounds', prop, mapPaint['line-active'][prop]);
					map.setPaintProperty(type + '-self', prop, mapPaint['line-self'][prop]);
				});
			}
			if (childType) {
				fillProps.forEach(prop => map.setPaintProperty(childType + '-fill', prop, mapPaint['fill-child'][prop]));
				lineProps.forEach(prop => map.setPaintProperty(childType + '-bounds', prop, mapPaint['line-child'][prop]));
			}
		}
	}

	function update(place) {
		updateActive(place);
		fitMap(place.bounds);
	}

	function mapSelect(ev) {
		goto(`${base}/${ev.detail.code}`, {noscroll: true});
	}

	function menuSelect(ev) {
		goto(`${base}/${ev.detail.value}`, {noscroll: true});
	}

	function onResize() {
		cols = w < 575 ? 1 : window.getComputedStyle(grid).getPropertyValue("grid-template-columns").split(" ").length;
	}

	$: w && onResize();
	$: chartLabel = overtime ? '2001 comparison' : place && place.parents[0] ? 'England and Wales comparison' : null;
	$: place && update(place);
	$: hasChange = place && place.data.population.value.change.all != null;
</script>

<svelte:head>
  <title>{place.name} Census Data</title>
	<meta name="description" content="">
  <meta property="og:title" content="{place.name} Census Data" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{assets}/{place.code}/" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:description" content="Explore census data for {place.name}." />
	<meta name="description" content="Explore census data for {place.name}." />
</svelte:head>

<Section column="wide">
{#if place && ew}
<div class="grid mtl">
	<div>
		{#if place.parents[0]}
		<span class="text-small">
			{#each [...place.parents].reverse() as parent, i}
			<a href="{base}/{parent.code}" sveltekit:noscroll>{parent.name}</a>{@html ' &gt; '}
			{/each}
			{place.name}
		</span><br/>
		{/if}
		<span class="text-big title">{place.name}</span>
	</div>
	<div>
		<div style="width: 260px; padding-top: 5px;" class:float-right={cols > 1}>
		<Select {options} group="typestr" search={true} on:select="{menuSelect}"/>
		</div>
	</div>
</div>


<div class="grid mts">
	<div class="text-small">
		Comparison:
		<button class="btn" class:btn-active={!overtime} on:click={() => overtime = false}>National-level figures</button>
		<button class="btn" class:btn-active={overtime} on:click={() => overtime = true}>Change from 2001</button>
	</div>
</div>

<div id="grid" class="grid mt" bind:clientWidth={w}>
	<div style="grid-column: span {cols};">
		<h3>Overview <span class="title-inset muted">Census 2011</span></h3>
	</div>
	<div>
			{#if place.type == 'ew' || place.type =='ctry'}
			The population of {place.name} was {place.data.population.value['2011'].all.toLocaleString()} at the time of the 2011 Census.
			{:else}
			{place.name} is a {types[place.type].name.toLowerCase()} in {place.parents[0].type == 'rgn' ? 'the ' + place.parents[0].name : place.parents[0].name}.
			The {types[place.type].name.toLowerCase()}'s population of {place.data.population.value['2011'].all.toLocaleString()} at the time of the 2011 Census made it the country's {place.data.population.value_rank['2011'].all.toLocaleString()}{suffixer(place.data.population.value_rank['2011'].all)} largest.
			{/if}
			{#if hasChange}
			{place.name} saw a population {place.data.population.value.change.all > 0 ? 'increase' : 'decrease'} of {changeStr(place.data.population.value.change.all, '%', 1)} from 2001.
			{/if}
	</div>
	<div>
		<span class="text-bold">Population</span>
		<br/>
		<span class="text-big">{place.data.population.value['2011'].all.toLocaleString()}</span><br/>
		{#if !overtime}
		{#if place.type != 'ew'}
		<span class="text-small"><Em>{place.data.population.value['2011'].all / ew.data.population.value['2011'].all >= 0.001 ? ((place.data.population.value['2011'].all / ew.data.population.value['2011'].all) * 100).toFixed(1) : '<0.1'}%</Em> of England and Wales population</span>
		{#if place.type != 'ctry'}
		<div class="text-small muted">{place.data.population.value_rank['2011'].all.toLocaleString()}{suffixer(place.data.population.value_rank['2011'].all)} largest population of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}</div>
		{/if}
		{/if}
		{:else if hasChange}
		<span class="text-small"><Em><span class="{changeClass(place.data.population.value.change.all)}">{changeStr(place.data.population.value.change.all, '%', 1)}</span></Em> since 2001</span>
		{#if !['ew', 'ctry'].includes(place.type)}
		<div class="text-small muted">{place.data.population.value_rank.change.all.toLocaleString()}{suffixer(place.data.population.value_rank.change.all)} largest increase of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}</div>
		{/if}
		{/if}
	</div>
	<div>
		<span class="text-bold">Density</span>
		<br/>
		<span class="inline text-big">{place.data.density.value['2011'].all.toLocaleString()}</span>
		<span class="inline condensed text-small">people<br/>per hectare</span><br/>
		{#if !overtime}
		{#if !['ew', 'ctry'].includes(place.type)}
		<span class="text-small"><Em>{adjectify(place.count, place.data.density.value_rank['2011'].all)}</Em> average density</span>
		<div class="text-small muted">{place.data.density.value_rank['2011'].all.toLocaleString()}{suffixer(place.data.density.value_rank['2011'].all)} highest density of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}</div>
		{/if}
		{:else if hasChange}
		<span class="text-small"><Em><span class="{changeClass(place.data.population.value.change.all)}">{changeStr(place.data.population.value.change.all, '%', 1)}</span></Em> since 2001</span>
		{#if !['ew', 'ctry'].includes(place.type)}
		<div class="text-small muted">{place.data.population.value_rank.change.all.toLocaleString()}{suffixer(place.data.population.value_rank.change.all)} largest increase of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}</div>
		{/if}
		{/if}
	</div>
	<div style="grid-column: span {cols};">
		<h3>Explore related areas</h3>
	</div>
	<div id="map" style="grid-column: span {cols == 2 ? 2 : cols && cols > 2 ? cols - 1 : 1};">
		<Map bind:map location={{bounds: place.bounds}} options={{fitBoundsOptions: {padding: 20}}} style={mapStyle}>
			{#each ['oa', 'lsoa', 'msoa'] as key}
			<MapSource {...mapSources[key]}>
				<MapLayer
					{...mapLayers[key]}
					id="{key}-fill"
					type="fill"
					isChild={isChild[key]}
					click={true}
					selected={active.selected}
					on:select={mapSelect}
					highlight={true}
					highlighted={active.highlighted}
					hover={true}
					hovered={active.hovered}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['fill-self'] : active.childType == key ? mapPaint['fill-child'] : mapPaint.fill}/>
				<MapLayer
					{...mapLayers[key]}
					id="{key}-bounds"
					type="line"
					selected={active.selected}
					highlight={true}
					highlighted={active.highlighted}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-active'] : active.childType == key ? mapPaint['line-child'] : mapPaint.line}/>
				<MapLayer
					{...mapLayers[key]}
					id="{key}-self"
					type="line"
					selected={active.selected}
					layout={{visibility: active.type == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-self'] : mapPaint.line}/>
			</MapSource>
			{/each}
			<MapSource {...mapSources.crd}>
				{#each ['lad', 'cty', 'rgn', 'ctry'] as key}
				<MapLayer
					{...mapLayers[key]}
					id={key + "-fill"}
					type="fill"
					isChild={isChild[key]}
					click={true}
					selected={active.selected}
					on:select={mapSelect}
					highlight={true}
					highlighted={active.highlighted}
					hover={true}
					hovered={active.hovered}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['fill-active'] : active.childType == key ? mapPaint['fill-child'] : mapPaint.fill}/>
				<MapLayer
					{...mapLayers[key]}
					id={key + "-bounds"}
					type="line"
					selected={active.selected}
					highlight={true}
					highlighted={active.highlighted}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-active'] : active.childType == key ? mapPaint['line-child'] : mapPaint.line}/>
				<MapLayer
					{...mapLayers[key]}
					id={key + "-self"}
					type="line"
					selected={active.selected}
					layout={{visibility: active.type == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-self'] : mapPaint.line}/>
				{/each}
			</MapSource>
		</Map>
	</div>
	<div>
		<span class="text-bold">Parents of {place.name}</span><br/>
		<span class="text-small">
		{#if place.parents[0]}
		{#each [...place.parents].reverse() as parent, i}
		<span style="display: block; margin-left: {i > 0 ? (i - 1) * 15 : 0}px">{@html i > 0 ? '↳ ' : ''}<a href="{base}/{parent.code}" sveltekit:noscroll>{parent.name}</a></span>
		{/each}
		{:else}
		<span class="muted">No parents for {place.name}</span>
		{/if}
		</span>
	</div>
	<div>
		<span class="text-bold">{place.children[0] ? types[place.children[0].type].pl : 'Areas'} within {place.name}</span><br/>
		<span class="text-small">
		{#if place.children[0]}
		{#each place.children as child, i}
		<a href="{base}/{child.code}" sveltekit:noscroll>{child.name}</a>{ i < place.children.length - 1 ? ', ' : ''}
		{/each}
		{:else}
		<span class="muted">No areas within {place.name}</span>
		{/if}
		</span>
	</div>
	<div style="grid-column: span {cols};">
		<h3>Key stats for {place.name} <span class="title-inset muted">Census 2011</span></h3>
	</div>
	<div>
		<span class="text-bold">Median age</span>
		<br/>
		<span class="inline text-big">{place.data.agemed.value['2011'].all.toLocaleString()}</span>
		<span class="inline condensed text-small">years</span><br/>
		{#if !overtime && !['ew', 'ctry'].includes(place.type)}
		<span class="text-small"><Em>{adjectify(place.count, place.data.agemed.value_rank['2011'].all, ['older', 'younger'])}</Em> average age</span>
		<div class="text-small muted">{place.data.agemed.value_rank['2011'].all.toLocaleString()}{suffixer(place.data.agemed.value_rank['2011'].all)} oldest median age of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}</div>
		{:else if hasChange}
		<span class="text-small"><Em><span class="{changeClass(place.data.agemed.value['2011'].all - place.data.agemed.value['2001'].all)}">{changeStr(place.data.agemed.value['2011'].all - place.data.agemed.value['2001'].all, ' years', 0)}</span></Em> since 2001</span>
		{#if !['ew', 'ctry'].includes(place.type)}
		<div class="text-small muted">{place.data.agemed.value_rank.change.all.toLocaleString()}{suffixer(place.data.agemed.value_rank.change.all)} largest increase of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}</div>
		{/if}
		{/if}
	</div>
	<div>
		<span class="text-bold">Age profile</span><br/>
		<div class="chart" style="height: 100px;">
			<ColChart data="{place && makeData(['age10yr', 'perc', '2011'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}"/>
		</div>
		{#if chartLabel && !(overtime && !hasChange)}
		<div class="text-small muted"><li class="line"></li> {chartLabel}</div>
		{/if}
	</div>
	<div>
		<span class="text-bold">Sex</span><br/>
		<StackedBarChart data="{place && makeData(['population', 'perc', '2011'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div>
		<span class="text-bold">Ethnicity</span><br/>
		<StackedBarChart data="{place && makeData(['ethnicity', 'perc', '2011'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div>
		<span class="text-bold">General health</span><br/>
		<StackedBarChart data="{place && makeData(['health', 'perc', '2011'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div>
		<span class="text-bold">Employment</span><br/>
		<StackedBarChart data="{place && makeData(['economic', 'perc', '2011'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div>
		<span class="text-bold">Travel to work</span><br/>
		<StackedBarChart data="{place && makeData(['travel', 'perc', '2011'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div>
		<span class="text-bold">Home ownership</span><br/>
		<StackedBarChart data="{place && makeData(['tenure', 'perc', '2011'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
</div>
{/if}
</Section>

<style>
	a {
		color: rgb(0, 60, 87);
	}
	h3 {
		margin-top: 8px;
	}
	.btn {
		padding: 2px 4px;
		margin: 0;
		border: 2px solid #206095;
		cursor: pointer;
		color: #206095;
		background-color: lightgrey;
	}
	.btn-active {
		color: white;
		background-color: #206095;
	}
	.increase {
		color: darkgreen;
	}
	.increase::before {
		content: '▲';
		color: darkgreen;
	}
	.decrease {
		color: darkred;
	}
	.decrease::before {
		content: '▼';
		color: darkred;
	}
	.nochange {
		font-size: 0.85em;
		color: grey;
	}
	.line {
		background-color: #27A0CC;
		width: 25px;
  	height: 2px;
  	display: inline-block;
		margin-bottom: 3px;
	}
	.title {
		display: inline-block;
		margin-top: -3px;
	}
	.text-right {
		text-align: right;
	}
	.float-right {
		float: right;
	}
	.inline {
		display: inline-block;
	}
	.condensed {
		line-height: 1.1em;
	}
	.mt {
		margin-top: 20px;
	}
	.mts {
		margin-top: 10px;
	}
	.mtl {
		margin-top: 55px;
	}
	.mbs {
		margin-bottom: 10px;
	}
	.grid {
		display: grid;
		width: 100%;
		grid-gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		justify-content: stretch;
	}
	.title-inset {
		font-weight: normal;
		font-size: 13.6px;
	}
	#grid {
		grid-gap: 20px !important;
	}
	.chart {
		position: relative;
		width: 100%;
	}
	#map {
		grid-row: span 2;
		min-height: 400px;
	}
	</style>