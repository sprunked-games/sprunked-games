import { alternatesLanguage, defaultLocale } from "@repo/i18n/locales";
import { siteConfig } from "@repo/web/lib/config/site";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import IframeView from "./iframe_view";

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale = defaultLocale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: locale })
  return {
      title: `${t('title')} | ${t('slogan')}`,
      description: t("description"),
      alternates: {
          languages: alternatesLanguage(""),
      },
      icons: {
          icon: siteConfig.icon,
          apple: siteConfig.appleIcon,
      },
      // 禁止搜索引擎索引
      robots: {
        index: false,
        follow: true,
    },
  }
}

export default function Page({ params: { locale = defaultLocale } }: Props) {
  unstable_setRequestLocale(locale);
  return (   
    <IframeView params={{ locale }} />
  )
}