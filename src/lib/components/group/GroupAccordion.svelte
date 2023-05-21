<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
	import parseMarkdown from "$lib/api/parse-markdown"
	import type { Group } from "$lib/api/types"
	import { IconLock, IconBoxMultiple } from "@tabler/icons-svelte"
	import AwaitHtml from "../common/AwaitHtml.svelte"
	import Icon from "../common/Icon.svelte"
	import InfoSection from "../common/InfoSection.svelte"
	import Banner from "../common/Banner.svelte"
	import GroupMemberView from "./GroupMemberView.svelte"
	import { Button } from "flowbite-svelte"
	import GroupEditView from "./GroupEditView.svelte"

    export let group: Group

    export let open = false
    let mode: "view" | "edit" | "members" = "view"

    const dispatch = createEventDispatcher()
    const toggle = () => {
        dispatch("open", {
            member: group.uuid || "abcde",
            state: !open
        })
    }

    let parsedDescription: Promise<string> = Promise.resolve("(no description)")
    $: if (group.description) {
        parsedDescription = parseMarkdown(group.description, { parseTimestamps: true, embed: true });
    }

</script>

<div class="w-full border-t border-gray-300 dark:border-gray-600 p-4 first:border-0 flex">
    <button on:click={toggle} class="grow -m-4 p-4">
        <div class="flex justify-between items-center w-full">
            <div class="flex items-center text-lg flex-wrap">
                {#if group.privacy && group.privacy.visibility === "public"}
                    <IconBoxMultiple class="mr-2" />
                {:else}
                    <IconLock class="mr-2" />
                {/if}
                <h3 class="mr-1">
                    {group.name}
                </h3>
                <span class="text-md">
                    ({group.id})
                </span>
            </div>
            <Icon url={group.icon} />
        </div>
    </button>
</div>
{#if open}
    <div class="flex flex-col border-t border-gray-300 dark:border-gray-600 p-5"
        style={`border-left: 4px solid #${group.color}`}
        in:fly={{duration: 600}}
    >
        {#if mode === "view"}
            <div class="info member-info flex flex-wrap -m-2">
                <!-- general member information -->
                <InfoSection title="ID" field={group.id} type="plain"/>
                <InfoSection title="Name" field={group.name}  type="html"/>
                <InfoSection title="Display Name" field={group.display_name} type="html"/>
                <InfoSection title="Color" field={group.color} type="plain" />
                <InfoSection title="Created" field={group.created} type="date"/>
            </div>
            <hr class="border-gray-200 dark:border-gray-700 my-4"/>
            <b>Description:</b>
            <div class="discord-markdown">
                <AwaitHtml htmlPromise={parsedDescription} />
            </div>
            {#if group.banner}
                <hr class="border-gray-200 dark:border-gray-700 my-4"/>
                <Banner url={group.banner} />
            {/if}
            <hr class="border-gray-200 dark:border-gray-700 my-4"/>
            <div class="flex flex-wrap gap-2">
                <Button on:click={() => mode = "edit"}>Edit</Button> <Button color="light" on:click={() => mode = "members"}>View members</Button>
            </div>
        {:else if mode === "edit"}
            <GroupEditView {group} bind:mode />
        {:else if mode === "members"}
            <GroupMemberView {group} bind:mode />
        {/if}
    </div>
{/if}