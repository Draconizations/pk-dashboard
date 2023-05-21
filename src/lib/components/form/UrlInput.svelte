<script lang="ts">
    export let value: string | undefined
    export let id: string
    export let placeholder: string = ""
    export let invalid: Record<string,boolean> = {}
    export let maxLength: number = 256

    let urlRegex = /^(https?:\/\/)([\da-z\.-_]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/i
    let defaultClass = "w-full rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:placeholder-gray-400 dark:text-white  border border-gray-200 dark:border-gray-600 p-2.5 text-sm focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"

    $: if (value) {
        invalid[id] = false
        if (!urlRegex.test(value)) invalid[id] = true
        else invalid[id] = false
    } else {
        invalid[id] = false
    }
</script>

<input type="url" bind:value={value} class={defaultClass} {placeholder} maxlength={maxLength} {id} />
{#if invalid[id]}
    <span class="text-sm text-red-800 dark:text-red-500">Invalid image url</span>
{/if}