// @ts-check
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import tinaDirective from './astro-tina-directive/register'
import { locales } from './src/i18n/ui.ts'

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL,
  base: '/',
  trailingSlash: "ignore",
	integrations: [mdx(), sitemap(), react(), tinaDirective()],
	i18n: {
		defaultLocale: 'en',
		locales,
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true,
			fallbackType: 'redirect',
		},
	},
})
