import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA()
	],
	server: {
		proxy: {
			'/dash': 'https://frotaweb-dash.pages.dev',
			'/reports': 'https://traccar-reports.pages.dev',
			'/traccar': 'https://frotaweb-traccar.pages.dev',
			'/api/socket': 'ws://gps.rastreosat.com.br',
			'/api/reports': 'http://178.156.172.139',
			'/api': 'http://gps.rastreosat.com.br',
		},
	},
});
