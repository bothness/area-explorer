<script>
	import { setContext } from "svelte";
  import "../app.css";
	import { themes } from "$lib/config";
	import Warning from "$lib/ui/Warning.svelte";
	import ONSHeader from "$lib/layout/ONSHeader.svelte";
	import ONSFooter from "$lib/layout/ONSFooter.svelte";

  // STYLE CONFIG
  // Set theme globally (options are 'light' or 'dark')
  let theme = "light";
  setContext("theme", themes[theme]);
</script>

<Warning/>
<ONSHeader/>

<slot/>

<ONSFooter/>