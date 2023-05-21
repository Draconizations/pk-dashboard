<script lang="ts">
	import type { Group } from "$lib/api/types"

    export let value: Group[] = []
    export let groups: Group[] = []

    let input: string

    $: groups.sort((a,b) => a.name?.localeCompare(b.name || "abcde") || 1)

    let elements: (HTMLButtonElement & {
        active?: boolean,
        group?: Group
    })[] = []

    let buttonClass = "p-3 w-full border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 hover:dark:text-white hover:text-black focus-visible:outline-none focus:bg-blue-100 text-black hover:dark:bg-blue-800 hover:bg-blue-200 focus:dark:bg-blue-900"
    let inputClass = "mb-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:placeholder-gray-400 dark:text-white  border border-gray-200 dark:border-gray-600 p-2.5 text-sm focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
    let activeClass = "bg-blue-100 text-black dark:text-white hover:dark:bg-blue-800 hover:bg-blue-200 dark:bg-blue-900"

    function addGroup(index: number) {
        if (value.filter(g => g.uuid === groups[index].uuid)[0]) {
            value = value.filter(g => g.uuid !== groups[index].uuid)
            return
        }

        value.push(groups[index])
        value = value
    }
    
    function searchGroups() {
        if (!input) return

        for (let [index, group] of groups.entries()) {
            if (focusIfMatch(index, group.id) === true) return
        }
        for (let [index, group] of groups.entries()) {
            if (focusIfMatch(index, group.name) === true) return
        }
        for (let [index, group] of groups.entries()) {
            if (focusIfMatch(index, group.display_name) === true) return
        }
    }

    function focusIfMatch(index: number, value: string|undefined) {
        if (value && value.toLowerCase().includes(input.toLowerCase())) {
            elements.forEach(el => el.active = false)
            elements[index].scrollIntoView({
                block: "nearest"
            })
            elements[index].active = true
            return true
        }
        return false
    }

    function moveAround(event: KeyboardEvent) {
        let active = elements.indexOf(elements.filter(el => el && el.active === true)[0]) ?? -1
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault()

            if (active === -1) {
                elements[0].scrollIntoView({
                    block: "nearest"
                })
                elements[0].active = true
                return
            }

            if (event.key === "ArrowDown") {
                elements[active].active = false
                if (active === groups.length - 1) {
                    elements[0].scrollIntoView({
                        block: "nearest"
                    })
                    elements[0].active = true
                    return
                } else {
                    elements[active + 1].scrollIntoView({
                        block: "nearest"
                    })
                    elements[active + 1].active = true
                    return
                }
            }

            if (event.key === "ArrowUp") {
                elements[active].active = false
                if (active === 0) {
                    elements[groups.length - 1].scrollIntoView({
                        block: "nearest"
                    })
                    elements[groups.length - 1].active = true
                    return
                } else {
                    elements[active - 1].scrollIntoView({
                        block: "nearest"
                    })
                    elements[active - 1].active = true
                    return
                }
            }
        } else if (event.key === "Enter") {
            if (active === -1) return

            addGroup(active)
            return
        }
    }
</script>

<input class={inputClass} placeholder="Type to search..." bind:value={input} on:input={() => searchGroups()} on:keydown={(event) => moveAround(event)} />

<div class="grow h-72 border rounded-md border-gray-200 dark:border-gray-700 overflow-auto no-scrollbar">
    {#each groups as group, index (group.uuid)}
        <button
            on:click={() => addGroup(index)}
            bind:this={elements[index]}
            class={`${buttonClass} ${elements[index] && elements[index].active === true ? activeClass : ""} ${!value.filter(g => g.uuid === group.uuid)[0] ? "" : `bg-gray-400 dark:bg-gray-600 dark:text-gray-400 text-700 hover:bg-red-400 hover:dark:bg-red-800 text-black hover:dark:text-white ${elements[index] && elements[index].active === true ? "bg-red-400 dark:bg-red-800 text-black dark:text-white" : ""}` }`}
        >
            <b>{group.name}</b> ({group.id})
        </button>
    {/each}
</div>

<style lang="scss">
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>