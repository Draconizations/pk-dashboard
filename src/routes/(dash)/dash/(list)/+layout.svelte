<script lang="ts">
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
	import type { LayoutData } from "./$types";

    export let data: LayoutData
    const members = writable()
    const groups = writable()

    $: members.set(data.members)
    $: groups.set(data.groups)
    setContext("members", members)
    setContext("groups", groups)
</script>

<div class="flex flex-col xl:flex-row gap-4">
    <slot/>
</div>