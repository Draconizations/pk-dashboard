<script lang="ts">
	import parseMarkdown from "$lib/api/parse-markdown"
    import { DateTime } from "luxon";
	import AwaitHtml from "./AwaitHtml.svelte"
	import { Button } from "flowbite-svelte"
	import Modal from "./Modal.svelte"

    export let title: string
    export let field: string | undefined
    export let type: "html"|"plain"|"image"|"date"
    export let checks: string | undefined | boolean = false

    let open = false;

    let htmlPromise: Promise<string> = Promise.resolve(field || "")
    $: if (field && type === "html" ) {
        htmlPromise = parseMarkdown(field, { parseTimestamps: true, embed: true })
    }

    $: if (field && type === "date") {
        htmlPromise = Promise.resolve(parseDate(field))
    }

    function parseDate(date: string) {
        let parsed = DateTime.fromISO(date)
        let formatted = parsed.setLocale("en-US").toLocaleString(DateTime.DATE_MED)
        return formatted
    }
</script>

{#if (checks !== false && checks !== null && field) || (checks === false && field)}
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 ">
        {#if type !== "image"}
            <b>{title}:</b> <span><AwaitHtml {htmlPromise}/></span>
        {:else}
        <b>{title}:</b> <Button on:click={() => open = true} size="xs">View</Button>
        {/if}
    </div>
{/if}
{#if open && field}
    <Modal bind:open>
        <div class="p-2 rounded-lg border border-gray-600 m-auto min-h-full">
            <img class="w-full m-auto" style="max-height: 600px; max-width: 600px;" src={field} alt="Full icon" />
        </div>
    </Modal>
{/if}