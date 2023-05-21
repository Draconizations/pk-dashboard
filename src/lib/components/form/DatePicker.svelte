<script lang="ts">
    import { Helper } from "flowbite-svelte";

    export let value: string | undefined
    export let placeholder: string = ""
    export let id: string

    let defaultClass = "w-full rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:placeholder-gray-400 dark:text-white  border border-gray-200 dark:border-gray-600 p-2.5 text-sm focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
</script>

<input type="date" bind:value class={defaultClass} {placeholder} {id} />
<Helper class="text-sm">Hint: 0004 is the blank year</Helper>