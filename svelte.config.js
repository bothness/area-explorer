/** @type {import('@sveltejs/kit').Config} */
import static_adapter from '@sveltejs/adapter-static';

const production = process.env.NODE_ENV === 'production';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: static_adapter({
			// Options below are defaults
			pages: 'build',
			assets: 'build',
			fallback:'404.html'
		}),
		prerender: {
			enabled: false
		},
		ssr: false,
		paths: {
			assets: production ? 'https://bothness.github.io/area-explorer' : '',
			base: production ? '/area-explorer' : ''
		}
	}
};

export default config;
