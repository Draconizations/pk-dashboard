<script lang="ts">
    import { page } from "$app/stores"
    import { getContext } from "svelte"
	import MemberList from "$lib/components/member/MemberList.svelte"
	import MemberListControl from "$lib/components/member/MemberListControl.svelte"
	import type { Member } from "$lib/api/types"
    import { filterMemberList, paginateList } from "$lib/utils/list"
    import type { ListOptions } from "$lib/utils/list"
	import Pagination from "$lib/components/Pagination.svelte";

    const members: any = getContext("members")
    let options: ListOptions = {
        pageLength: 25,
        search: {
            name: ""
        }
    }

   let activePage = parseInt($page.url.searchParams.get('page') || "1")

    $members.sort((a: Member, b: Member) => b.name && a.name?.localeCompare(b.name) || 0)
    $: filteredMembers = filterMemberList($members, options)

    $: currentMembers = paginateList(filteredMembers, activePage, options.pageLength)

</script>

<div class="w-full lg:w-1/2 xl:w-1/3">
    <MemberListControl bind:options />
    
    <div class="w-full flex justify-center mt-3">
        <Pagination listLength={filteredMembers.length} pageLength={options.pageLength} bind:activePage />
    </div>
</div>
<div class="w-full lg:w-1/2 xl:w-2/3">
    <MemberList members={currentMembers} />
</div>