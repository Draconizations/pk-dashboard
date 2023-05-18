import type { Member } from "$lib/api/types";

export interface ListOptions {
    pageLength: number
    search: {
        name: string
    }
}

export function paginateList(list: any[], activePage: number, pageLength: number) {
    let indexLast = activePage * pageLength;
    let indexFirst = indexLast - pageLength;
    return list.slice(indexFirst, indexLast);
}

export function filterMemberList(list: Member[], options: ListOptions) {
    Object.keys(options.search).forEach(key => {
        // @ts-ignore
        list = list.filter(m => m[key].toLowerCase().includes(options.search[key].toLowerCase()))
    })
    return list
}