<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
	import parseMarkdown from "$lib/api/parse-markdown"
	import type { Member } from "$lib/api/types"
	import { IconLock, IconStarFilled, IconUser } from "@tabler/icons-svelte"
	import AwaitHtml from "../common/AwaitHtml.svelte"
	import Icon from "../common/Icon.svelte"
	import MemberInfoSection from "../common/InfoSection.svelte"
	import Banner from "../common/Banner.svelte"
	import { Button, Tooltip } from "flowbite-svelte"
	import MemberGroupView from "./MemberGroupView.svelte"
	import MemberEditView from "./MemberEditView.svelte"

    export let member: Member

    export let open = false
    let mode: "view" | "edit" | "groups" = "view"

    const dispatch = createEventDispatcher()
    const toggle = () => {
        dispatch("open", {
            member: member.uuid || "abcde",
            state: !open
        })
    }

    let parsedDescription: Promise<string> = Promise.resolve("(no description)")
    $: if (member.description) {
        parsedDescription = parseMarkdown(member.description, { parseTimestamps: true, embed: true });
    }

</script>

<div class="w-full border-t border-gray-300 dark:border-gray-600 p-4 first:border-0 flex">
    <button on:click={toggle} class="grow -m-4 p-4">
        <div class="flex justify-between items-center w-full">
            <div class="flex items-center text-lg flex-wrap">
                {#if member.privacy && member.privacy.visibility === "public"}
                    <IconUser class="mr-2" />
                {:else}
                    <IconLock class="mr-2" />
                {/if}
                <h3 class="mr-1">
                    {member.name}
                </h3>
                <span class="text-md">
                    ({member.id})
                </span>
            </div>
            {#if member.webhook_avatar_url}
                <Icon url={member.webhook_avatar_url}>
                    <IconStarFilled class="icon-outlined" size={20} />
                    <Tooltip placement="bottom">This member has a Proxy Avatar set</Tooltip>
                </Icon>
            {:else}
                <Icon url={member.avatar_url} />
            {/if}
        </div>
    </button>
</div>
{#if open}
    <div class="flex flex-col border-t border-gray-300 dark:border-gray-600 p-5"
        style={`border-left: 4px solid #${member.color}`}
        in:fly={{duration: 600}}
    >
        {#if mode === "view"}
            <div class="info member-info flex flex-wrap -m-2">
                <!-- general member information -->
                <MemberInfoSection title="ID" field={member.id} type="plain"/>
                <MemberInfoSection title="Name" field={member.name}  type="html"/>
                <MemberInfoSection title="Display Name" field={member.display_name} type="html"/>
                <MemberInfoSection title="Pronouns" field={member.pronouns} type="html"/>
                <MemberInfoSection title="Color" field={member.color} type="plain" />
                <MemberInfoSection title="Birthday" field={member.birthday} type="date"/>
                <MemberInfoSection title="Created" field={member.created} type="date"/>
                <MemberInfoSection title="Main Avatar" checks={member.webhook_avatar_url} field={member.avatar_url} type="image"/>
            </div>
            <hr class="border-gray-200 dark:border-gray-700 my-4"/>
            <b>Description:</b>
            <div class="discord-markdown">
                <AwaitHtml htmlPromise={parsedDescription} />
            </div>
            {#if member.banner}
                <hr class="border-gray-200 dark:border-gray-700 my-4"/>
                <Banner url={member.banner} />
            {/if}
            <hr class="border-gray-200 dark:border-gray-700 my-4"/>
            <div class="flex flex-wrap gap-2">
                <Button on:click={() => mode = "edit"}>Edit</Button> <Button color="light" on:click={() => mode = "groups"}>View groups</Button>
            </div>
        {:else if mode === "edit"}
            <MemberEditView {member} bind:mode />
        {:else if mode === "groups"}
            <MemberGroupView {member} bind:mode />
        {/if}
    </div>
{/if}