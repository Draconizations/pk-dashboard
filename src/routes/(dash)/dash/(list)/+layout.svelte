<script lang="ts">
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
	import type { LayoutData } from "./$types";

    export let data: LayoutData
    const members = writable()
    const groups = writable()
    const token = writable()

    $: members.set(data.members)
    $: groups.set(data.groups)
    $: token.set(data.token)

    setContext("members", members)
    setContext("groups", groups)
    setContext("token", token)
</script>

<div class="flex flex-col xl:flex-row gap-4">
    <slot/>
</div>