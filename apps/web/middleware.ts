import {
	defaultLocale,
	localeDetection,
	localePrefix,
	locales,
	pathnames,
} from "@repo/i18n/locales"
import createMiddleware from "next-intl/middleware"
import type { NextApiRequest } from "./env"

const doIntlMiddleware = createMiddleware({
	locales,
	defaultLocale,
	localePrefix,
	pathnames,
	localeDetection,
})

export default async (req: NextApiRequest) => {
	// 使用国际化中间件处理请求
	const intlResponse = doIntlMiddleware(req)
	return intlResponse
}

export const config = {
	matcher: [
		// 添加这一行以匹配根路径
		"/",
		// Match all pathnames except for
		// - … if they start with `/api`, `/_next` or `/_vercel`
		// - … the ones containing a dot (e.g. `favicon.ico`)
		"/((?!api|_next|_vercel|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
		"/api/:path",
	],
}
