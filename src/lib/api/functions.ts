import api, { type ApiError } from "$lib/api";
import type { System } from "$lib/api/types";

export async function login(token: string, callback: (user: System | undefined, error?: ApiError) => any) {
    try {
        let user = await api<System>(`systems/@me`, {
            token: token
        })
        
        callback(user)
    } catch (err: unknown) {
        let e = err as ApiError
        
        callback(undefined, e)
    }
}