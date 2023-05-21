<script lang="ts">
    import { Alert, Listgroup, ListgroupItem } from "flowbite-svelte";
	import type { Group, Member } from "$lib/api/types"
	import { Button } from "flowbite-svelte"
    import { getContext } from "svelte";
	import { IconTrash, IconUsers } from "@tabler/icons-svelte"
	import type { Writable } from "svelte/store"
	import api, { type ApiError } from "$lib/api"
	import MemberPicker from "../form/MemberPicker.svelte"

    export let group: Group
    export let mode: "view"|"edit"|"members"

    let changed: boolean = false
    let loading: boolean = false
    let err: string = ""
    let success: boolean = false
    
    let members: Writable<Member[]> = getContext("members")
    let groupList: Writable<Group[]> = getContext("groups")
    let token = getContext<Writable<string>>("token")
    
    let relevantMembers = $members.filter((m: Member) => group.members?.some(i => i === m.uuid))
    $: relevantMembers.sort((a, b) => a.name?.localeCompare(b.name || "") || 1)

    $: list = relevantMembers.map((m: Member) => {
        return {
            name: m.name,
            href: `./m/${m.id}`,
            id: m.id,
            display_name: m.display_name,
            uuid: m.uuid
        }
    })

    function removeMember(uuid: string) {
        relevantMembers = relevantMembers.filter(m => m.uuid !== uuid)
    }

    $: if (JSON.stringify(relevantMembers.map(m => m.uuid).sort()) === JSON.stringify(group.members?.sort())) {
        changed = false
    } else {

        changed = true
    }

    async function submit() {
        loading = true
        err = ""
        success = false

        const data = relevantMembers.map(m => m.uuid || "")

        try { 
            await api(`groups/${group.uuid}/members/overwrite`, {
                method: "POST",
                token: $token,
                body: data
            })

            $groupList.forEach(g => {
                if (g.uuid === group.uuid) {
                    g.members = data
                }
            })

            groupList.set($groupList)

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
    <Alert color="green" class="mb-2" >Member list successfully updated</Alert>
{/if}
<div class="flex flex-col lg:flex-row flex-wrap -p-2">
    <div class="flex flex-col p-2 w-full lg:w-2/3">
        <span class="flex items-center justify-between mb-3">
            <h4 class="text-lg"><IconUsers class="inline"/> Members</h4>
            <span>({relevantMembers.length} members)</span>
        </span>
        {#if list.length > 0}
        <Listgroup>
            {#each list as item (item.uuid)}
            <ListgroupItem class="hover:text-black dark:text-gray-100 hover:dark:text-white bg-white text-gray-900 dark:bg-gray-900 hover:bg-gray-100 hover:dark:bg-gray-800">
                <div class="flex justify-between items-center p-1">
                    <div class="flex flex-col md:flex-row justify-between w-full">
                        <span><b>{item.name}</b> ({item.id})</span>
                        {#if item.display_name}
                        <span class="mt-2 md:mt-0">{item.display_name}</span>
                        {/if}
                    </div>
                    <button class="text-red-700 dark:text-red-500 pl-4" on:click|stopPropagation={() => removeMember(item.uuid || "abcde")}>
                        <IconTrash class="inline"/>
                    </button>
                </div>
            </ListgroupItem>
            {/each}
        </Listgroup>
        {:else}
            <p>This group has no members yet! You can add some in this menu.</p>
        {/if}
    </div>
    <div class="flex flex-col p-2 w-full lg:w-1/3">
        <MemberPicker members={$members} bind:value={relevantMembers} />
    </div>
</div>
<hr class="border-gray-200 dark:border-gray-700 my-4"/>
<div class="flex flex-wrap gap-2">
    <Button disabled={!changed || loading} on:click={() => submit()} >Submit </Button>
    <Button disabled={loading} color="light" on:click={() => mode = "view"}>Cancel</Button>
</div>