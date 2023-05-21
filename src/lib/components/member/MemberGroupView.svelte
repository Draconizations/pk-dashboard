<script lang="ts">
    import { Alert, Listgroup, ListgroupItem, P } from "flowbite-svelte";
	import type { Group, Member } from "$lib/api/types"
	import { Button } from "flowbite-svelte"
    import { getContext } from "svelte";
	import { IconBoxMultiple, IconTrash } from "@tabler/icons-svelte"
	import GroupPicker from "../form/GroupPicker.svelte"
	import type { Writable } from "svelte/store"
	import type { ApiError } from "$lib/api"
	import api from "$lib/api"

    export let member: Member
    export let mode: "view"|"edit"|"groups"
    
    let groups: Writable<Group[]> = getContext("groups")
    let token = getContext<Writable<string>>("token")

    let changed: boolean = false
    let loading: boolean = false
    let err: string = ""
    let success: boolean = false
    
    let relevantGroups = $groups.filter((g: Group) => g.members?.some(id => id === member.uuid))
    $: relevantGroups.sort((a: Group, b: Group) => a.name?.localeCompare(b.name || "") || 1)

    $: list = relevantGroups.map((g: Group) => {
        return {
            name: g.name,
            href: `./g/${g.id}`,
            id: g.id,
            display_name: g.display_name,
            uuid: g.uuid
        }
    })

    function removeGroup(uuid: string) {
        relevantGroups = relevantGroups.filter((g: Group) => g.uuid !== uuid)
    }

    $: if (JSON.stringify(relevantGroups.map(g => g.uuid).sort()) === JSON.stringify($groups.filter(g => g.members?.some(id => id === member.uuid)).map(x => x.uuid).sort())) {
        changed = false
    } else {
        changed = true
    }
    
    async function submit() {
        loading = true
        err = ""
        success = false

        const data = relevantGroups.map(g => g.uuid)

        try { 
            await api(`members/${member.uuid}/groups/overwrite`, {
                method: "POST",
                token: $token,
                body: data
            })

            $groups.forEach(g => {
                if (data.some(x => x == g.uuid)) {
                    g.members?.push(member.uuid || "")
                    g.members = g.members
                } else {
                    g.members = g.members?.filter(m => m !== member.uuid)
                }
            })

            groups.set($groups)

            loading = false
            success = true
        } catch (error: unknown) {
            let e = error as ApiError
            err = e.message || "Unknown Error"
            loading = false
        }
    }
</script>

{#if err}
    <Alert color="red" class="mb-2" >{err}</Alert>
{/if}
{#if success}
    <Alert color="green" class="mb-2" >Group list successfully updated</Alert>
{/if}
<div class="flex flex-col lg:flex-row flex-wrap -p-2">
    <div class="flex flex-col p-2 w-full lg:w-2/3">
        <span class="flex items-center justify-between mb-3">
            <h4 class="text-lg"><IconBoxMultiple class="inline" /> Groups</h4>
            <span>({relevantGroups.length} groups)</span>
        </span>
        {#if relevantGroups.length > 0}
        <Listgroup>
            {#each list as item (item.uuid)}
            <ListgroupItem class="hover:text-black hover:dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700">
                <div class="flex justify-between items-center">
                    <div class="flex flex-col md:flex-row justify-between w-full">
                        <span><b>{item.name}</b> ({item.id})</span>
                        {#if item.display_name}
                        <span class="mt-2 md:mt-0">{item.display_name}</span>
                        {/if}
                    </div>
                    <button class="text-red-700 dark:text-red-500 pl-4" on:click|stopPropagation={() => removeGroup(item.uuid || "abcde")}>
                        <IconTrash class="inline"/>
                    </button>
                </div>
            </ListgroupItem>
            {/each}
        </Listgroup>
        {:else}
            <p>This member has no groups yet! You can add some in this menu.</p>
        {/if}
    </div>
    <div class="flex flex-col p-2 w-full lg:w-1/3">
        <GroupPicker groups={$groups} bind:value={relevantGroups} />
    </div>
</div>
<hr class="border-gray-200 dark:border-gray-700 my-4"/>
<div class="flex flex-wrap gap-2">
    <Button disabled={!changed || loading} on:click={() => submit()} >Submit </Button>
    <Button disabled={loading} color="light" on:click={() => mode = "view"}>Go back</Button>
</div>