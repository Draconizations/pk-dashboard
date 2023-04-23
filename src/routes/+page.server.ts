import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

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
    }
}