import api from "$lib/api";
import type { Group, Member } from "$lib/api/types";
import { tokenOrRedirect } from "$lib/utils/cookies";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const token = tokenOrRedirect(cookies, "/")

    const members = api<Member[]>(`systems/@me/members`, {
        token: token
    })

    const groups = api<Group[]>(`systems/@me/groups?with_members=true`, {
        token: token
    })

    return {
        members: members,
        groups: groups
    }
}