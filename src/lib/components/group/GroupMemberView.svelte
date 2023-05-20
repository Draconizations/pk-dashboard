<script lang="ts">
    import { Listgroup } from "flowbite-svelte";
	import type { Group, Member } from "$lib/api/types"
	import { Button } from "flowbite-svelte"
    import { getContext } from "svelte";
	import { IconUsers } from "@tabler/icons-svelte"

    export let group: Group
    export let mode: "view"|"edit"|"members"
    
    let members: any = getContext("members")
    
    let relevantMembers = $members.filter((m: Member) => group.members?.some(i => i === m.uuid))
    relevantMembers.sort((a: Member, b: Member) => a.name?.localeCompare(b.name || ""))

    let list: Record<string, string>[] = relevantMembers.map((m: Member) => {
        return {
            name: m.name,
            href: `./m/${m.id}`,
            id: m.id,
            display_name: m.display_name
        }
    })
</script>

<div class="flex -p-2">
    <div class="flex flex-col p-2 w-full lg:w-2/3">
        <span class="flex items-center justify-between mb-3">
            <h4 class="text-lg"><IconUsers class="inline"/> Members</h4>
            <span>({relevantMembers.length} members)</span>
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