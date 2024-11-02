import BundleAnalyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import createNextIntlPlugin from "next-intl/plugin";
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const withBundleAnalyzer = BundleAnalyzer({
    // enabled: process.env.ANALYZE === 'true',
    enabled: false,
})

const withNextIntl = createNextIntlPlugin()
// 添加支持直接使用本地.mdx文件组件
const withMDX = createMDX({
    options: {
        jsx: true,
        // remark 转换转换插件
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [],
    },
})

/** @type {import('next').NextConfig} */
const nextConfig = {

    staticPageGenerationTimeout: 1000,
    onDemandEntries: {
        // 在开发模式下保持页面在内存中的时间更长
        maxInactiveAge: 25 * 1000,
        // 同时保持在内存中的页面数
        pagesBufferLength: 5,
    },
    experimental: {
        serverComponentsExternalPackages: ["@aws-sdk", "httpx"],
        //  turbo 模式下 mdxRs 不支持 remarkPlugins
        // mdxRs: true,
        optimizePackageImports: ["zod", "pinyin-pro", "radash", "dayjs", "howler", "crypto-js", "itty-router", "ai", "winston", "zod", "@next/third-parties", "@react-aria"],
        cssChunking: "strict"
    },
    // output: 'standalone',
    productionBrowserSourceMaps: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    transpilePackages: ["next-mdx-remote"],
    trailingSlash: false,
    optimizeFonts: true,
    env: {
        UE_WEB_URL: process.env.UE_WEB_URL,
        DOUBAO_API_KEY:process.env.DOUBAO_API_KEY,
        DOUBAO_MODEL_NAME:process.env.DOUBAO_MODEL_NAME
    }
}

export default withBundleAnalyzer(withMDX(withNextIntl(nextConfig)))
