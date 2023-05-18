<script lang="ts">
    import type { ListOptions } from "$lib/utils/list"
import { IconSearch } from "@tabler/icons-svelte";
	import { Input, Label } from "flowbite-svelte"

    export let options: ListOptions
</script>

<h3 class="text-xl mb-2 text-gray-900 dark:text-gray-100">
    <IconSearch class="inline"/> Search Members
</h3>
<div class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-900 dark:text-gray-100">
    <Label for="quick-name-search" class="mb-1" >Quick Search</Label>
    <Input id="quick-name-search" bind:value={options.search.name} placeholder="Filter by member name..." />
</div>