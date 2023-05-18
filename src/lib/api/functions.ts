import api, { ErrorType, type ApiError } from "$lib/api";
import type { System } from "$lib/api/types";
import type { Cookies } from "@sveltejs/kit";

export async function login(token: string, cookies: Cookies) {
    try {
        let user = await api<System>(`systems/@me`, {
            token: token
        })

        cookies.set("pk-user", JSON.stringify(user), {
            path: "/"
        })
        
        return user
    } catch (err: unknown) {
        let e = err as ApiError
        
        if (e.type === ErrorType.InvalidToken) {
            cookies.delete("pk-token", {
                path: "/"
            })
            cookies.delete("pk-user", {
                path: "/"
            })
        }
    }
}