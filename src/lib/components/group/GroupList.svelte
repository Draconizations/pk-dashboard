<script lang="ts">
	import type { Group } from "$lib/api/types";
	import GroupAccordion from "./GroupAccordion.svelte"
    export let groups: Group[]

    export let open: Record<string, boolean>
</script>

<div class="mb-2 w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg">
    {#each groups as group (group.uuid)}
        <GroupAccordion open={open[group.uuid || "abcde"]} {group} on:open />
    {/each}
</div>