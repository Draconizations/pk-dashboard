<script lang="ts">
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
	import type { LayoutData } from "./$types";

    export let data: LayoutData
    const members = writable()

    $: members.set(data.members)
    setContext("members", members)
</script>

<div class="flex flex-col xl:flex-row gap-4">
    <slot/>
</div>