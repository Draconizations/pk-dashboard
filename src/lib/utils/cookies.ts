import { redirect, type Cookies } from "@sveltejs/kit"

export function tokenOrRedirect(cookies: Cookies, redirectTo: string): string {
    let token = cookies.get("pk-token")
    if (!token) throw redirect(303, redirectTo)
    return token
}