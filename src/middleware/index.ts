import { defineMiddleware } from "astro:middleware"

const supportedLocales = ['en', 'zh-TW']
const defaultLocale = 'en'

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
	if (url.pathname === '/') {
		const acceptLang = request.headers.get('accept-language') ?? ''
		const preferred = supportedLocales.find(locale => acceptLang.includes(locale))
		const locale = preferred ?? defaultLocale
		return Response.redirect(`${url.origin}/${locale}`, 302)
	}

	return next()
})
