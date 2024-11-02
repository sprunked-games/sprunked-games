import { NextUIProvider } from "@nextui-org/system"
import { defaultLocale } from "@repo/i18n/locales"
import "@repo/tailwind-config/globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import type { ReactNode } from "react"

import { Toaster } from "@repo/ui/toaster"
import { Footer, MicrosoftClarity, Navbar } from "@repo/web/lib/components"
import { siteConfig } from "@repo/web/lib/config/site"
import { GoogleAnalytics } from "@next/third-parties/google"

type Props = {
    children: ReactNode
    params: { locale: string }
}

export default async function LocaleLayout({
    children,
    params: { locale = defaultLocale }
}: Props) {
    const isDev = process.env.NODE_ENV === "development"
    const messages = await getMessages()
    return (
        
        <NextIntlClientProvider messages={messages} locale={locale}>
  
        <NextUIProvider>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
            {
                !isDev && (
                    <>
                        <GoogleAnalytics gaId={siteConfig.gaId as string}/>
                        <script defer data-domain={siteConfig.domain} src="https://app.pageview.app/js/script.js"></script>
                    </>
                )
            }
        </NextUIProvider>
    </NextIntlClientProvider>
    )
}
