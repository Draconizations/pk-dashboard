<script lang="ts">
	import parseMarkdown from "$lib/api/parse-markdown"
    import { DateTime } from "luxon";
	import AwaitHtml from "../common/AwaitHtml.svelte"

    export let title: string
    export let field: string | undefined
    export let html: boolean = false
    export let date: boolean = false

    let htmlPromise: Promise<string> = Promise.resolve(field || "")
    $: if (field && html) {
        htmlPromise = parseMarkdown(field, { parseTimestamps: true, embed: true })
    }

    $: if (field && date) {
        htmlPromise = Promise.resolve(parseDate(field))
    }

    function parseDate(date: string) {
        let parsed = DateTime.fromISO(date)
        let formatted = parsed.setLocale("en-US").toLocaleString(DateTime.DATE_MED)
        return formatted
    }
</script>

{#if field}
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 ">
        <b>{title}:</b> <span><AwaitHtml {htmlPromise}/></span>
    </div>
{/if}