import {dirname, sep} from "path"
import {fileURLToPath} from "url"
import {createLogger, format, transports} from "winston"

let loggerTransports: any = [
    new transports.Console(),
]

if (process.env.NODE_ENV === 'production') {
    loggerTransports = [
        ...loggerTransports,
        new transports.File({filename: 'error.log', level: 'error'}),
        new transports.File({filename: 'combined.log'}),
    ]
}
const {combine, timestamp, label, printf, splat, colorize} = format
const colorizer = colorize()
const logFormat = printf(({level, message, timestamp, label}) => {
    return `${timestamp} ${label ?? __filename} ${level.toUpperCase()} ${colorizer.colorize(level, message)}`
})

export const __file = (fp = import.meta.url) => {
    const __filename = fileURLToPath(fp);
    const __dirname = dirname(__filename);

    const joinDir = __dirname.slice(0, __dirname.lastIndexOf(sep)).split(sep).map(v => v.slice(0, 1)).join(".")
    const prefix = joinDir + "." + __dirname.slice(__dirname.lastIndexOf(sep) + 1)
    const suffix = __filename.slice(__filename.lastIndexOf(sep) + 1)
    return `${prefix}.${suffix}`
}

const formatter = (labelValue: string) => combine(
    splat(),
    timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    label({label: labelValue}),
    logFormat)

const rootLogger = createLogger({
    level: 'info',
    format: formatter("root"),
    transports: loggerTransports
})


export const getLogger = (label?: string, level: string = "info",) => {
    return createLogger({
        level: level,
        format: formatter(__file(label)),
        transports: loggerTransports
    })
}

export default rootLogger