<script lang="ts">
    import { page } from "$app/stores"
    import { getContext } from "svelte"
    import GroupList from "$lib/components/group/GroupList.svelte";
	import { filterGroupList, paginateList, type GroupListOptions } from "$lib/utils/list"
	import type { Group } from "$lib/api/types"
	import GroupListControl from "$lib/components/group/GroupListControl.svelte"
	import Pagination from "$lib/components/Pagination.svelte"

    const groups: any = getContext("groups")

    let options: GroupListOptions = {
        pageLength: 25,
        search: {
            name: ""
        }
    }

    let activePage = parseInt($page.url.searchParams.get('page') || "1")

    $: $groups.sort((a: Group, b: Group) => b.name && a.name?.localeCompare(b.name) || 0)
    $: filteredGroups = filterGroupList($groups, options)

    $: currentGroups = paginateList(filteredGroups, activePage, options.pageLength)

    let open: Record<string, boolean> = {}

    const toggleOpen = (event: CustomEvent<{
        member: string,
        state: boolean
    }>) => {
        let index = event.detail.member

        open[index] = open[index] || false
        open[index] = event.detail.state
    }
</script>

<div class="w-full xl:w-1/3">
    <GroupListControl bind:options />
    
    <div class="w-full flex justify-center mt-3">
        <Pagination listLength={filteredGroups.length} pageLength={options.pageLength} bind:activePage />
    </div>
</div>
<div class="w-full xl:w-2/3">
    <GroupList groups={currentGroups} on:open={(event) => toggleOpen(event)} {open} />
    <div class="w-full flex justify-center mt-3">
        <Pagination listLength={filteredGroups.length} pageLength={options.pageLength} bind:activePage />
    </div>
</div>

<svelte:head>
    <title>PluralKit | dash</title>
</svelte:head>