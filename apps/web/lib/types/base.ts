import {SVGProps} from "react"

export interface Pageable<T = {}> {
    current: number
    size: number
    total?: number
    data?: T
}


export type IconSvgProps<T = string> = {} & SVGProps<T>


export interface FAQItem {
    question: string
    answer: string
}