<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
	import parseMarkdown from "$lib/api/parse-markdown"
	import type { Member } from "$lib/api/types"
	import { IconLock, IconUser } from "@tabler/icons-svelte"
	import AwaitHtml from "../common/AwaitHtml.svelte"
	import Icon from "../common/Icon.svelte"
	import MemberInfoSection from "./MemberInfoSection.svelte"

    export let member: Member

    export let open = false

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
            <Icon url={member.avatar_url} />
        </div>
    </button>
</div>
{#if open}
<div class="flex flex-col border-t border-gray-300 dark:border-gray-600 p-5"
    style={`border-left: 4px solid #${member.color}`}
    in:fly={{duration: 600}}
>
    <div class="info member-info flex flex-wrap -m-2">
        <!-- general member information -->
        <MemberInfoSection title="ID" field={member.id}/>
        <MemberInfoSection title="Name" field={member.name} html={true}/>
        <MemberInfoSection title="Display Name" field={member.display_name} html={true}/>
        <MemberInfoSection title="Pronouns" field={member.pronouns} html={true}/>
        <MemberInfoSection title="Color" field={member.color} />
        <MemberInfoSection title="Birthday" field={member.birthday} date={true}/>
        <MemberInfoSection title="Created" field={member.created} date={true}/>
    </div>
    <hr class="border-gray-200 dark:border-gray-700 my-4"/>
    <b>Description:</b>
    <div class="discord-markdown">
        <AwaitHtml htmlPromise={parsedDescription} />
    </div>
</div>
{/if}