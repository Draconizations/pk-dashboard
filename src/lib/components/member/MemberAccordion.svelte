<script lang="ts">
	import parseMarkdown from "$lib/api/parse-markdown"
	import type { Member } from "$lib/api/types"
	import { IconLock, IconUser } from "@tabler/icons-svelte"
	import AwaitHtml from "../common/AwaitHtml.svelte"

    export let member: Member
    export let open: boolean = false

    const toggle = () => open = !open

    let parsedDescription: Promise<string> = Promise.resolve("(no description)")
    $: if (member.description) {
        parsedDescription = parseMarkdown(member.description, { parseTimestamps: true, embed: true });
    }

</script>

<div class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-900 dark:text-gray-100 mb-2">
    <button on:click={toggle}>
        <div class="flex justify-between items-center">
            <div class="flex items-center text-lg">
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
    <div class={`flex flex-col border-t border-gray-300 dark:border-gray-600 mt-2 -mx-4 -mb-4 p-5 ${!open ? "hidden" : ""}`}>
        <div class="discord-markdown">
            <AwaitHtml htmlPromise={parsedDescription} />
        </div>
    </div>
</div>