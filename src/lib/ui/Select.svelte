<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	export let options;
	export let selected = null;
	export let placeholder = "Find an area";
	export let value = "code";
	export let label = "name";
	export let group = null;
	export let search = false;
	
	let selectedPrev = selected;
	let selectedItem = selected ? options.find(d => { d[value] == selected[value] }) : null;
	let expanded = false;
	let filter = '';
	let active = null;
	let filtered;
	let el;
	let input;
	let items = [];
	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	$: regex = filter ? new RegExp(filter, 'i') : null;
	$: {
		filtered = regex ? options.filter(option => regex.test(option[label])) : options;
		active = 0;
	}
	
	function toggle(ev) {
		ev.stopPropagation();
		filter = '';
		expanded = !expanded;
		sleep(10).then(() => {
			if (input && expanded) {
				input.focus();
			}
		});
	}
	
	function select(option) {
		selected = option;
		expanded = false;
		dispatch('select', {
			selected: option,
			value: option[value]
		});
	}
	
	function unSelect(ev) {
		ev.stopPropagation();
		selected = null;
		selectedPrev = null;
		selectedItem = null;
		dispatch('select', {
			selected: null,
			value: null
		});
	}
	
	function doKeydown(ev) {
		if (expanded && filtered[0] && Number.isInteger(active)) {
			if (ev.keyCode === 38) {
				active -= active > 0 ? 1 : 0;
				items[active].scrollIntoView({ block: 'nearest', inline: 'start' });
			} else if (ev.keyCode === 40) {
				active += active < filtered.length - 1 ? 1 : 0;
				items[active].scrollIntoView({ block: 'nearest', inline: 'end' });
			}
		}
	}
	
	function doKeyup(ev) {
		if (filtered[0] && Number.isInteger(active)) {
			if (ev.keyCode === 13) {
				select(filtered[active]);
			}
		}
	}
	
	function onClick(ev) {
		if(ev.target !== el){
			expanded = false;
			active = 0;
		}
	};
	
	$: if (selectedPrev != selected) {
		selectedItem = options.find(d => d[value] == selected[value]);
		selectedPrev = selected;
	}
</script>

<style>
	#select {
		text-align: left;
	}
	a {
		text-decoration: none;
		display: block;
		padding: 0;
		border: 2px solid #206095 !important;
	}
	a span {
		display: inline-block;
		padding: 10px 5px;
	}
	.selection {
		overflow: hidden;
		max-width: calc(100% - 50px);
    white-space: nowrap;
	}
	#dropdown ul {
		list-style: none;
		background: #eee;
		margin: 0;
		margin-top: 3px;
		padding: 0;
		max-height: 170px;
		overflow-y: auto;
		overflow-x: hidden;
	}
	#dropdown li {
		line-height: 1em;
		padding: 6px;
	}
	#dropdown .highlight {
		color: #fff;
		background-color: #206095;
		font-weight: 500;
		cursor: pointer;
	}
	/* normalize the input elements, make them look like everything else */
	#select input {
		width: calc(100% - 40px);
		box-sizing: border-box;
		background: transparent;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
		line-height: inherit;
		display: inline-block;
		padding: 10px 5px;
		margin: 0;
		background-color: #fff;
		border: 2px solid #206095 !important;
		border-radius: 0px;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	#select input:focus {
		outline: none;
	}
	/* custom field (drop-down, text element) styling  */
	#select {
		display: block;
		width: 100%;
		position: relative;
	}
	.active {
		z-index: 1000;
		outline: 3px solid orange;
	}
	/* the toggle is the visible part in the form */
	#toggle,
	#select input {
		line-height: inherit;
		color: #206095;
		font-weight: 500;
		cursor: pointer;
	}
	/* drop-down list / text element */
	#dropdown {
		width: 100%;
		position: absolute;
		left: 0;
		opacity: 1;
	}
	.selected {
		color: #fff !important;
		background-color: #206095;
	}
	.button {
		color: #fff;
		background-color: #206095;
		background-repeat: no-repeat;
		background-position: center;
		display: inline-block;
		float: right;
	}
	.down {
		background-image: url("https://bothness.github.io/geo-draw/img/chevron-down.svg");
		width: 30px;
	}
	.search {
		background-image: url("https://bothness.github.io/geo-draw/img/search.svg");
		width: 30px;
	}
	.close {
		background-image: url("https://bothness.github.io/geo-draw/img/x-close.svg");
		width: 30px;
	}
	small {
		margin-left: 3px;
	}
	#toggle small {
		color: lightgrey;
	}
	#dropdown small {
		color: grey;
	}
</style>

<svelte:window on:click={onClick}/>

<div id="select" class:active={expanded} on:keydown={doKeydown}>
	{#if selectedItem && !search}
	<a id="toggle" class="selected" on:click={toggle}>
		<span class="selection">{selectedItem[label]} {#if group}<small>{selectedItem[group]}</small>{/if}</span>
		<span class="button close" on:click={unSelect}>&nbsp;</span>
	</a>
	{:else}
	<a id="toggle" on:click={toggle}>
		<span>{placeholder ? placeholder : 'Select one'}</span>
		<span class="button" class:search class:down={!search}>&nbsp;</span>
	</a>
	{/if}
	{#if expanded}
	<div id="dropdown" bind:this={el} style="top: 0;">
		<input type="text" placeholder="" bind:value={filter} autocomplete="false" bind:this={input} on:keyup={doKeyup} />
		<ul>
			{#if filter.length < 3}
			<li>Type a name...</li>
			{:else if filtered[0] && group}
			{#each filtered as option, i}
			<li class:highlight="{active == i}" on:click="{() => select(option)}" on:mouseover="{() => active = i}" bind:this="{items[i]}">
				{option[label]} <small>{option[group]}</small>
			</li>
			{/each}
			{:else if filtered[0]}
			{#each filtered as option, i}
			<li class:highlight="{active == i}" on:click="{() => select(option)}" on:mouseover="{() => active = i}" bind:this="{items[i]}">
				{option[label]}
			</li>
			{/each}
			{:else}
			<li>No results</li>
			{/if}
		</ul>
	</div>
	{/if}
</div>