import api from "$lib/api";
import type { Member } from "$lib/api/types";
import { tokenOrRedirect } from "$lib/utils/cookies";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const token = tokenOrRedirect(cookies, "/")

    const list = api<Member[]>(`systems/@me/members`, {
        token: token
    })

    return {
        members: list
    }
}