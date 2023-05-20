<script lang="ts">
    import { Listgroup } from "flowbite-svelte";
	import type { Group, Member } from "$lib/api/types"
	import { Button } from "flowbite-svelte"
    import { getContext } from "svelte";
	import { IconBoxMultiple } from "@tabler/icons-svelte"

    export let member: Member
    export let mode: "view"|"edit"|"groups"
    
    let groups: any = getContext("groups")
    
    let relevantGroups = $groups.filter((g: Group) => g.members?.some(id => id === member.uuid))
    relevantGroups.sort((a: Group, b: Group) => a.name?.localeCompare(b.name || ""))

    let list: Record<string, string>[] = relevantGroups.map((g: Group) => {
        return {
            name: g.name,
            href: `./g/${g.id}`,
            id: g.id,
            display_name: g.display_name
        }
    })
</script>

<div class="flex -p-2">
    <div class="flex flex-col p-2 w-full lg:w-2/3">
        <span class="flex items-center justify-between mb-3">
            <h4 class="text-lg"><IconBoxMultiple class="inline" /> Groups</h4>
            <span>({relevantGroups.length} groups)</span>
        </span>
        <Listgroup active items={list} let:item >
            <div class="flex flex-col md:flex-row justify-between">
                <span><b>{item.name}</b> ({item.id})</span>
                <span class="mt-2 md:mt-0">{item.display_name}</span>
            </div>
        </Listgroup>
    </div>
</div>
<hr class="border-gray-200 dark:border-gray-700 my-4"/>
<div class="flex flex-wrap">
    <Button color="light" on:click={() => mode = "view"}>Back</Button>
</div>