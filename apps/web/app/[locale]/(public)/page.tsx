import { Button } from "@nextui-org/button";
import { alternatesLanguage, defaultLocale, locales } from "@repo/i18n/locales";
import { Link } from "@repo/i18n/navigation";
import {
  Brain,
  Zap,
  Shield,
  Cloud,
  HeadphonesIcon,
  ImagePlus,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { siteConfig } from "@repo/web/lib/config/site";
import FAQ from "@repo/web/lib/components/faq";
import Home from "./home";
import Desc from "./desc";

type Props = {
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale = defaultLocale } }: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale)
  const t = await getTranslations({ locale: locale })
  
  // 构建 canonical URL
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : `https://${siteConfig.domain}`
  const canonicalPath = locale === defaultLocale ? '/' : `/${locale}`
  
  return {
      title: `${t('title')} | ${t('slogan')}`,
      description: t("description"),
      alternates: {
          languages: alternatesLanguage(""),
          canonical: `${baseUrl}${canonicalPath}`,
      },
      icons: {
          icon: siteConfig.icon,
          apple: siteConfig.appleIcon,
      },
  }
}

export default async function Page({ params: { locale = defaultLocale } }: Props) {
  unstable_setRequestLocale(locale)
    return ( 
      <div className="bg-black pt-5 pb-5 ">
       <Home params={{
          locale: locale
        }} /> 

        <Desc params={{
          locale: locale
        }} />
        </div>

        
    )
  }



