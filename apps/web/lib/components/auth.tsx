"use client"
import { fetchGet } from "@repo/web/lib/utils/requests"
import { useEffect } from "react"

export function Auth() {
	useEffect(() => {
		fetchGet("/api/auth").catch((e) => {
			console.error("auth error:", e)
		})
	}, [])
	return <></>
}
