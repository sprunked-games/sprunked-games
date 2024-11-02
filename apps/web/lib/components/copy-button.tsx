"use client"

import { cn } from "@repo/utils/utils"
import { Copy, CopyCheck } from "lucide-react"
import { memo, useState } from "react"

type CopyButtonProps = {
	className?: string,
	classNames?: {
		wrapper?: string
		icon?: string
		copiedIcon?: string
	}
	onClick: () => void
}

const CopyButton = memo<CopyButtonProps>(({ className, classNames, onClick }) => {
	const [isCopied, setIsCopied] = useState(false)
	const handleClick = () => {
		setIsCopied(true)
		onClick()
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	return (
		<div
			className={cn(
				"inline-flex cursor-pointer transition delay-100 hover:scale-110 active:scale-90 disabled:text-gray-500 disabled:select-none",
				className,
				classNames?.wrapper,
			)}
		>
			{isCopied ? (
				<CopyCheck
					className={cn("size-5", classNames?.icon, classNames?.copiedIcon, "text-primary")}
				/>
			) : (
				<Copy
					className={cn("size-5", classNames?.icon)}
					onClick={handleClick}
				/>
			)}
		</div>
	)
})
CopyButton.displayName = "CopyButton"
export default CopyButton
