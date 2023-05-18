import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { login } from "$lib/api/functions";
import type { ApiError } from "$lib/api";
import type { System } from "$lib/api/types";

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get("pk-token")
    const savedUser = cookies.get("pk-user")
    
    let user: System | undefined
    let error: ApiError | undefined

    if (savedUser) user = JSON.parse(savedUser)

    if (token && !user) {
        await login(token as string, cookies)
    }

    return {
        user: user,
        error: error
    }
}

export const actions: Actions = {
    setTheme: async ({ url, cookies, request }) => {
        const theme = url.searchParams.get("theme")

        if (theme) {
            cookies.set("colorTheme", theme, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365,
            })
        }

        throw redirect(302, request.headers.get("referer") ?? "/")
    },

    login: async ({ cookies, request}) => {
        const data = await request.formData()
        const token = data.get("pk-token")

        if (!token) return fail(400, { missing: true })

        cookies.set("pk-token", token as string, {
            path: "/"
        })
        
        await login(token as string, cookies)

        throw redirect(302, request.headers.get("referer") ?? "/")
    },

    logout: async ({ cookies}) => {
        cookies.delete("pk-token", {
            path: "/"
        })
        cookies.delete("pk-user", {
            path: "/"
        })

        throw redirect(302, "/")
    }
}