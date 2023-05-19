<script lang="ts">
	import type { Member } from "$lib/api/types";
	import MemberAccordion from "./MemberAccordion.svelte"
    export let members: Member[]

    export let open: Record<string, boolean>
</script>

<div class="mb-2 w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg">
    {#each members as member (member.uuid)}
        <MemberAccordion {member} on:open open={open[member.uuid || "abcde"]}/>
    {/each}
</div>