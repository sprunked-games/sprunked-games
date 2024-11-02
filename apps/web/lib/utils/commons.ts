import {customAlphabet} from "nanoid"
import {dash} from "radash";

const random = customAlphabet(
    "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890",
    8,
)

/**
 * 随机生成一个 ID
 * @param size 默认 8
 */
export function randomId(size = 8) {
    return random(size)
}

/**
 * 移除非法url 字符
 * @param str
 */
export function sanitizeUrl(str: string | null | undefined) {
    if (!str) return ""

    // 规范化字符串，确保统一处理斜杠和点
    const normalizedStr = str.replace(/\\/g, "/").toLowerCase()

    // 分离文件名和扩展名
    const parts = normalizedStr.split(".")
    const extension = parts.pop() // 获取扩展名
    const fileNameWithoutExtension = parts.join(".") // 获取无扩展名的部分

    // 仅对文件名部分进行非法字符替换，保留扩展名
    const sanitizedFileName = fileNameWithoutExtension.replace(
        /[^-\w\u4e00-\u9fa5]+/g,
        "",
    )

    // 重新组合文件名和扩展名
    return [sanitizedFileName, extension].filter(Boolean).join(".").trim()
}

export const slugOf = (value: string) => {
    if (!value?.length) {
        return ""
    }
    value = value.replaceAll("?", "")
    // 判断是否为中文
    if (/[\u4e00-\u9fa5]/g.test(value)) {
        return value
    }
    return dash(value);
}
