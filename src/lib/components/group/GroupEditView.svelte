<script lang="ts">
    import ResizeTextarea from "../form/ResizeTextarea.svelte";
	import type { Group } from "$lib/api/types"
	import { Alert, Button, Label } from "flowbite-svelte"
    import { getContext } from "svelte"
	import api, { type ApiError } from "$lib/api"
	import type { Writable } from "svelte/store"
	import ColorPicker from "../form/ColorPicker.svelte"
	import UrlInput from "../form/UrlInput.svelte"

    export let group: Group
    export let mode: "view"|"members"|"edit"

    let groupList = getContext<Writable<Group[]>>("groups")
    let token = getContext<Writable<string>>("token")

    let changed: boolean = false
    let loading: boolean = false
    let invalid: Record<string,boolean> = {}
    let err: string = ""

    let input: Group = {
        name: group.name,
        display_name: group.display_name,
        id: group.id,
        uuid: group.uuid,
        color: group.color,
        description: group.description,
        icon: group.icon,
        banner: group.banner,
    }

    $: if (input) {
        for (let x in input) {
            if (input[x as keyof Group] !== group[x as keyof Group]) {
                changed = true
                break
            }
            changed = false
        }
    }

    async function submit() {
        loading = true

        // trim all string fields
        // @ts-ignore
        Object.keys(input).forEach(k => input[k] = typeof input[k] == "string" ? input[k].trim() : input[k]);

        if (input.color && input.color?.startsWith("#")) {
            input.color = input.color.replace("#", "")
        }

        try { 
            const response = await api<Group>(`groups/${group.uuid}`, {
                method: "PATCH",
                token: $token,
                body: input
            })

            const newGroup = {...group, ...response}
            
            const newList = $groupList.map((g: Group) => {
                if (group.uuid === g.uuid) {
                    g = newGroup
                }
                return g
            })

            groupList.set(newList)
            loading = false
            mode = "view"
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
<div class="flex flex-wrap flex-col md:flex-row -m-2">
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="g-name">Name</Label>
        <ResizeTextarea bind:value={input.name} id="g-name" placeholder={group.name} minRows={1} maxRows={3} maxLength={100} />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="g-displayname">Display Name</Label>
        <ResizeTextarea bind:value={input.display_name} id="g-displayname" placeholder={group.display_name} minRows={1} maxRows={3} maxLength={100} />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="g-color">Color</Label>
        <ColorPicker bind:value={input.color} id="g-color" placeholder={group.color} bind:invalid />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="g-icon">Avatar Url</Label>
        <UrlInput bind:value={input.icon} id="g-icon" placeholder={group.icon} bind:invalid />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="g-banner">Banner Url</Label>
        <UrlInput bind:value={input.banner} id="g-banner" placeholder={group.banner} bind:invalid />
    </div>
</div>
<hr class="border-gray-200 dark:border-gray-700 my-4"/>
<Label class="mb-1" for="g-description">Description</Label>
<ResizeTextarea bind:value={input.description} id="g-description" placeholder={group.description} minRows={5} />
<hr class="border-gray-200 dark:border-gray-700 my-4"/>
<div class="flex flex-wrap gap-2">
    <Button disabled={!changed || Object.keys(invalid).some(i => invalid[i] === true) || loading} on:click={() => submit()} >Submit </Button>
    <Button disabled={loading} color="light" on:click={() => mode = "view"}>Cancel</Button>
</div>