export interface ListOptions {
    pageLength: number
}

export function paginateList(list: any[], currentPage: number, pageLength: number) {
    let indexLast = currentPage * pageLength;
    let indexFirst = indexLast - pageLength;
    return list.slice(indexFirst, indexLast);
}