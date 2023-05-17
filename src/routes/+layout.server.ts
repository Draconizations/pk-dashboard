import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    let theme = cookies.get("colorTheme") ?? "dark"
    let user = cookies.get("pk-user") ?? null
    if (user) user = JSON.parse(user)
    
    return {
        theme: theme,
        user: user
    }
}