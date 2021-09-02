<script>
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
	export let column = 'medium';
</script>

<section style="color: {theme['text']}; background-color: {theme['background']}">
	<div class="col-{column == 'wide' ? 'wide' : column == 'narrow' ? 'narrow' : 'medium'}">
		<slot></slot>
	</div>
</section>