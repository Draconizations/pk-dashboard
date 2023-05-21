<script lang="ts">
    export let value: string | undefined
    export let placeholder: string = ""
    export let invalid: Record<string,boolean> = {}
    export let id: string

    let colorRegex = /^#?[A-Fa-f0-9]{6}$/
    let defaultClass = "rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:placeholder-gray-400 dark:text-white  border border-gray-200 dark:border-gray-600 p-2.5 text-sm focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"

    function update(event: Event) {
        let color = (event.target as HTMLInputElement).value
        value = color
    }

    $: if (value) {
        invalid[id] = false
        if (!colorRegex.test(value)) invalid[id] = true
        else invalid[id] = false
    } else {
        invalid[id] = false
    }
</script>

<div class="flex gap-1 items-center">
    <input class={`${defaultClass} w-full`} bind:value {placeholder} {id} />
    <input class={`${defaultClass} h-11 w-1/3`} type="color" on:change={(event) => update(event)} />
</div>
{#if invalid[id]}
    <span class="text-sm text-red-800 dark:text-red-500">Invalid hexcode. Use a 6-digit color (#ff0000)</span>
{/if}

<style lang="scss">
    input {
        line-height: 1.5em;
    }
</style>