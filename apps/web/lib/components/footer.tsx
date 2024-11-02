"use client"
import { Link, usePathname } from "@repo/i18n/navigation"
import { Link as NextLink } from "@nextui-org/link"
import { localeNames } from "@repo/i18n/locales"
import { siteConfig } from "@repo/web/lib/config/site"
import { useLocale, useTranslations } from "next-intl"

export default function Footer() {
    const t = useTranslations()
    const pathname = usePathname()
    const locale = useLocale()
    const link_builder = (href: string, name: string) => {
        if (href === 'en') {
            // 英文时，确保pathname不带locale
            return (
                <NextLink
                    className="w-1/7 text-gray-500 hover:text-primary-200"
                    href={pathname}
                >
                    {name}
                </NextLink>
            )
        } else {
            return (
                <Link
                    className="w-1/7 text-gray-500 hover:text-primary-200"
                    href={pathname}
                    locale={href}
                >
                    {name}
                </Link>
            )
        }
    }

    return (
        <>
            <footer className="md:pt-22 pt-10  bg-black px-4 md:px-8 text-white">
                <div className="w-full max-w-[1480px] mx-auto items-center gap-16 ">
                    <div className="flex flex-col gap-5 md:flex-row">
                        <div className="flex flex-col justify-start gap-y-2 ">
                            <div className="">
                                <p className="text-gray-200 text-lg font-semibold sm:text-2xl font-leckerli">
                                    {t('title')}
                                </p>
                                <p className="max-2xl">{t(siteConfig.slogan as any)}</p>
                            </div>

                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {
                                siteConfig.navbarItems.flatMap((it: any) => it?.children ?? [it])
                                    .map((it, index) => (
                                        <span className="text-gray-200 font-bold text-lg" key={`${it.title}-${index}`}>
                                            <Link
                                                href={it.href}
                                                locale={locale}
                                            >
                                                {/* {t(it.title)} */}
                                            </Link>
                                        </span>
                                    ))
                            }
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="grid grid-cols-3 md:grid-cols-8 gap-2">
                            {/* 添加了locale={key}属性，这将告诉next-intl在切换语言时保持pathname(当前路径) */}
                            {Object.entries(localeNames).map(([key, name]) => (
                                <div key={key}>
                                    {locale === key ? (
                                        <span className="text-primary-200 w-1/7 cursor-default">
                                            {name}
                                        </span>
                                    ) : (
                                        link_builder(key, name)
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2 py-10 border-t flex-row-reverse items-center justify-between sm:flex">
                        <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
                            {/* <li>
                                <a href="https://tap4.ai/"
                                    className="font-medium text-gray-500 hover:text-primary-200 duration-150"
                                    title="Tap4 AI Tools Directory">Tap4 AI Tools Diresctory</a>
                            </li>
                            <li>
                                <a href="https://woy.ai/" title="Woy AI Tools Directory">Woy AI Tools</a>
                            </li>
                            <li>
                                <a href="https://dokeyai.com/" title="Dokey AI Tools Directory">DokeyAI</a>
                            </li> */}

                        </ul>
                        <p className="mt-6 sm:mt-0">© 2024 {t('title')} All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
