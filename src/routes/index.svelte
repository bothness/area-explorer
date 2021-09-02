<script context="module">
	export const prerender = true;
</script>
<script>
  import { base } from "$app/paths";
  import Section from "$lib/layout/Section.svelte";
</script>

<svelte:head>
  <title>Area Explorer</title>
  <meta name="description" content="Explore census data for places in England and Wales.">
</svelte:head>

<Section column="wide">
  <div class="block">
    <span class="text-big title">Area Explorer</span>
    <p>Select a country or region to start exploring</p>
    <ul>
      <li><a href="{base}/K04000001"><strong>England and Wales</strong></a></li>
      <ul>
        <li><a href="{base}/E92000001">England</a></li>
        <ul>
          <li><a href="{base}/E12000001">North East</a></li>
          <li><a href="{base}/E12000002">North West</a></li>
          <li><a href="{base}/E12000003">Yorkshire and The Humber</a></li>
          <li><a href="{base}/E12000004">East Midlands</a></li>
          <li><a href="{base}/E12000005">West Midlands</a></li>
          <li><a href="{base}/E12000006">East of England</a></li>
          <li><a href="{base}/E12000007">London</a></li>
          <li><a href="{base}/E12000008">South East</a></li>
          <li><a href="{base}/E12000009">South West</a></li>
        </ul>
        <li><a href="{base}/W92000004">Wales</a></li>
      </ul>
    </ul>
  </div>
</Section>

<style>
	.block {
    margin-top: 55px;
    display: block;
	}
	.title {
		display: inline-block;
		margin-top: -3px;
	}
</style>