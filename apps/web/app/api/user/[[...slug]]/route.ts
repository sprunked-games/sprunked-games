import type { NextApiRequest } from "@repo/web/env"
import { AutoRouter } from "itty-router"

const router = AutoRouter<NextApiRequest>({ basic: "/api/user" })

router.post("/favorite/tools", async (request) => {
	const userId = request.auth.userId
	const { toolId } = await request.json()
	// Handle this operation client-side or use a separate API service
	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	})
})

export const POST = (request: any) => router.fetch(request)
export const GET = (request: any) => router.fetch(request)

export async function generateStaticParams() {
    return [
        { slug: ['favorite', 'tools'] },
        // Add other possible slug combinations here
    ]
}