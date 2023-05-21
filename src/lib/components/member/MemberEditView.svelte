<script lang="ts">
    import ResizeTextarea from "../form/ResizeTextarea.svelte";
	import type { Member } from "$lib/api/types"
	import { Alert, Button, Label } from "flowbite-svelte"
    import { getContext } from "svelte"
	import api, { type ApiError } from "$lib/api"
	import type { Writable } from "svelte/store"
	import ColorPicker from "../form/ColorPicker.svelte"
	import UrlInput from "../form/UrlInput.svelte"
	import DatePicker from "../form/DatePicker.svelte"

    export let member: Member
    export let mode: "view"|"groups"|"edit"

    let memberList = getContext<Writable<Member[]>>("members")
    let token = getContext<Writable<string>>("token")

    let changed: boolean = false
    let loading: boolean = false
    let invalid: Record<string,boolean> = {}
    let err: string = ""

    let input: Member = {
        name: member.name,
        display_name: member.display_name,
        id: member.id,
        uuid: member.uuid,
        color: member.color,
        description: member.description,
        pronouns: member.pronouns,
        avatar_url: member.avatar_url,
        webhook_avatar_url: member.webhook_avatar_url,
        banner: member.banner,
        birthday: member.birthday
    }

    $: if (input) {
        for (let x in input) {
            if (input[x as keyof Member] !== member[x as keyof Member]) {
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
            const response = await api<Member>(`members/${member.uuid}`, {
                method: "PATCH",
                token: $token,
                body: input
            })

            const newMember = {...member, ...response}
            
            const newList = $memberList.map((m: Member) => {
                if (member.uuid === m.uuid) {
                    m = newMember
                }
                return m
            })

            memberList.set(newList)
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
        <Label class="mb-1" for="m-name">Name</Label>
        <ResizeTextarea bind:value={input.name} id="m-name" placeholder={member.name} minRows={1} maxRows={3} />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="m-displayname">Display Name</Label>
        <ResizeTextarea bind:value={input.display_name} id="m-displayname" placeholder={member.display_name} minRows={1} maxRows={3} />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="m-pronouns">Pronouns</Label>
        <ResizeTextarea bind:value={input.pronouns} id="m-pronouns" placeholder={member.pronouns} minRows={1} maxRows={3} />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="m-color">Color</Label>
        <ColorPicker bind:value={input.color} id="m-color" placeholder={member.color} bind:invalid />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="m-birthday">Birthday</Label>
        <DatePicker bind:value={input.birthday} id="m-birthday" placeholder={member.birthday} />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="m-avatar">Avatar Url</Label>
        <UrlInput bind:value={input.avatar_url} id="m-avatar" placeholder={member.avatar_url} bind:invalid />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="m-proxyavatar">Proxy Avatar Url</Label>
        <UrlInput bind:value={input.webhook_avatar_url} id="m-proxyavatar" placeholder={member.webhook_avatar_url} bind:invalid />
    </div>
    <div class="p-2 w-full md:w-1/2 lg:w-1/3">
        <Label class="mb-1" for="m-banner">Banner Url</Label>
        <UrlInput bind:value={input.banner} id="m-banner" placeholder={member.banner} bind:invalid />
    </div>
</div>
<hr class="border-gray-200 dark:border-gray-700 my-4"/>
<Label class="mb-1" for="m-description">Description</Label>
<ResizeTextarea bind:value={input.description} id="m-description" placeholder={member.description} minRows={5} />
<hr class="border-gray-200 dark:border-gray-700 my-4"/>
<div class="flex flex-wrap gap-2">
    <Button disabled={!changed || Object.keys(invalid).some(i => invalid[i] === true) || loading} on:click={() => submit()} >Submit </Button>
    <Button disabled={loading} color="light" on:click={() => mode = "view"}>Discard Edit</Button>
</div>