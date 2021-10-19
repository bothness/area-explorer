<script>
	import { getContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import mapbox from "mapbox-gl";
	const { Popup } = mapbox;

	const dispatch = createEventDispatcher();

	const popup = new Popup({
    closeButton: false,
    closeOnClick: false
  });
	
	export let id;
	export let source;
	export let sourceLayer = null;
	export let type;
	export let filter = null;
	export let layout = {};
	export let paint = {};
	export let data = null;
	export let code = null;
	export let name = 'name';
	export let colorCode = null;
	export let click = false;
	export let ignoreClick = false;
	export let clickCenter = false;
	export let selected = null;
	export let hover = false;
	export let hovered = null;
	export let highlight = false;
	export let highlightKey = 'highlighted';
	export let highlighted = [];
	export let order = null;
	export let maxzoom = null;
	export let minzoom = null;

	export let isChild = false;
	
	const { getMap } = getContext('map');
	const map = getMap();
	
	let selectedPrev = null;
	let hoveredPrev = null;
	let highlightedPrev = [];
	
	if (map.getLayer(id)) {
    map.removeLayer(id);
	}
	
	let options = {
		'id': id,
		'type': type,
		'source': source,
		'paint': paint,
		'layout': layout
	};

	if (filter) {
		options['filter'] = filter;
	}
	
	if (sourceLayer) {
		options['source-layer'] = sourceLayer;
	}
	if (maxzoom) {
		options['maxzoom'] = maxzoom;
	}
	if (minzoom) {
		options['minzoom'] = minzoom;
	}
	
	map.addLayer(options, order);

	// Updates "color" feature states for all geo codes
	// Assumes that each data point has the colours defined on the colorCode key
	function updateColors() {
		console.log('updating colors...');

		data.forEach(d => {
			map.setFeatureState({
				source: source,
				sourceLayer: sourceLayer,
				id: d[code]
			}, {
				color: d[colorCode]
			});
		});
	}

	$: colorCode && updateColors();

	// Updates the "highlighted" feature state as geo codes are added to/removed from the highlighted array
	$: if (highlight && highlighted != highlightedPrev) {
		if (highlightedPrev[0]) {
			highlightedPrev.forEach(code => {
				let state = {};
				state[highlightKey] = false;
				map.setFeatureState(
					{ source: source, sourceLayer: sourceLayer, id: code },
					state
				);
			});
		}
		highlightedPrev = highlighted;
		if (highlighted[0]) {
			highlighted.forEach(code => {
				let state = {};
				state[highlightKey] = true;
				map.setFeatureState(
					{ source: source, sourceLayer: sourceLayer, id: code },
					state
				);
			});
		}
	}
	
	// Adds a click event to change the selected geo code (if click = true for map layer)
	if (click) {
		map.on('click', id, (e) => {
      if (e.features.length > 0 && !ignoreClick) {
				let clicked = e.features[0].id;

				if ((isChild && highlighted.includes(clicked)) || (!isChild && selected != clicked)) {
					selected = clicked;

					dispatch('select', {
						code: selected
					});
				
					if (selectedPrev) {
						map.setFeatureState(
        	    { source: source, sourceLayer: sourceLayer, id: selectedPrev },
        	    { selected: false }
        	  );
					}
				
					map.setFeatureState(
        	  { source: source, sourceLayer: sourceLayer, id: selected },
        	  { selected: true }
					);

					if (clickCenter) {
						let center = centroid(e.features[0].toJSON().geometry);
						map.flyTo({
							center: center.geometry.coordinates
						});
					}
				
					selectedPrev = selected;
				}
			}
    });
	}
	
	// Updates the selected geo code if it is changed elsewhere in the app (outside of this component)
	$: if (selected != selectedPrev) {
		if (selectedPrev) {
			map.setFeatureState(
				{ source: source, sourceLayer: sourceLayer, id: selectedPrev },
				{ selected: false }
			);
		}
		if (selected) {
			map.setFeatureState(
				{ source: source, sourceLayer: sourceLayer, id: selected },
				{ selected: true }
			);
		}
		selectedPrev = selected;
	}
	
	// Adds an event to update the hovered geo code when the mouse is moved over the map
	if (hover) {
		map.on('mousemove', id, (e) => {
      if (e.features.length > 0) {
				let hoveredID = e.features[0].id;

				if (hovered) {
          map.setFeatureState(
            { source: source, sourceLayer: sourceLayer, id: hovered },
          	{ hovered: false }
        	);
      	}

				if ((isChild && highlighted.includes(hoveredID)) || (!isChild && selected != hoveredID)) {
					hovered = hoveredPrev = hoveredID;

        	map.setFeatureState(
        	  { source: source, sourceLayer: sourceLayer, id: hovered },
        	  { hovered: true }
        	);

        	// Change the cursor style as a UI indicator.
					map.getCanvas().style.cursor = 'pointer';

					// Show popup
					popup
						.setLngLat(e.lngLat)
						.setHTML(`<strong>${e.features[0].properties[name] ? e.features[0].properties[name] : e.features[0].properties[code]}</strong>`)
						.addTo(map);
				} else {
					// Remove popup
					popup.remove();
				}
      }
		});
		
		map.on('mouseleave', id, (e) => {
			if (hovered) {
        map.setFeatureState(
          { source: source, sourceLayer: sourceLayer, id: hovered },
          { hovered: false }
				);
      }
			hovered = hoveredPrev = null;
			
			// Reset cursor and remove popup
			map.getCanvas().style.cursor = '';
			popup.remove();
    });
	}
	
	// Updates the hovered geo code if it is changed elsewhere in the app (outside of this component)
	$: if (hover && hovered != hoveredPrev) {
		if (hoveredPrev) {
			map.setFeatureState(
				{ source: source, sourceLayer: sourceLayer, id: hoveredPrev },
        { hovered: false }
			);
		}
		if (hovered) {
			map.setFeatureState(
				{ source: source, sourceLayer: sourceLayer, id: hovered },
        { hovered: true }
			);
		}
		hoveredPrev = hovered;
	}
	
</script>

<style>
	:global(.mapboxgl-popup-content) {
		pointer-events: none !important;
		padding: 2px 5px !important;
	}
</style>