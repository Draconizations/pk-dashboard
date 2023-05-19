<script lang="ts">
	import type { Member } from "$lib/api/types";
	import MemberAccordion from "./MemberAccordion.svelte"
    export let members: Member[]
</script>

{#each members as member}
    <MemberAccordion {member} open={false} />
{/each}