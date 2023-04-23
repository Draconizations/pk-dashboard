import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    let theme = cookies.get("colorTheme") ?? "dark"
    return {
        theme: theme
    }
}