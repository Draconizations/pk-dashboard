import type { Group, Member } from "$lib/api/types";

export interface ListOptions {
    pageLength: number
    search: {
        name: string
    }
}

export interface MemberListOptions extends ListOptions {

}

export interface GroupListOptions extends ListOptions {

}

export function paginateList(list: any[], activePage: number, pageLength: number) {
    let indexLast = activePage * pageLength;
    let indexFirst = indexLast - pageLength;
    return list.slice(indexFirst, indexLast);
}

export function filterMemberList(list: Member[], options: MemberListOptions) {
    Object.keys(options.search).forEach(key => {
        // @ts-ignore
        list = list.filter(m => m[key].toLowerCase().includes(options.search[key].toLowerCase()))
    })
    return list
}

export function filterGroupList(list: Group[], options: GroupListOptions) {
    Object.keys(options.search).forEach(key => {
        // @ts-ignore
        list = list.filter(m => m[key].toLowerCase().includes(options.search[key].toLowerCase()))
    })
    return list
}