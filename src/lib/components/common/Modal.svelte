<script lang="ts">
    import { focusTrap } from "$lib/utils/focusTrap";
    export let open

    function escapeModal(event: KeyboardEvent) {
        if (event.key === "Escape" || event.key === "Backspace") {
            open = false
        }
    }
</script>

<div 
    use:focusTrap={true}
    on:click|stopPropagation={() => open = false} 
    on:keydown|stopPropagation={(event) => escapeModal(event)} 
    class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 p-5 w-full flex column items-center justify-center"
>
    <!-- svelte-ignore a11y-autofocus -->
    <button
        autofocus
        on:click|stopPropagation={() => open = false} 
        on:keydown|stopPropagation={(event) => escapeModal(event)}
        class="max-w-full md:max-w-2/3 lg:max-w-1/2 xl:max-w-1/3 max-h-full"
    >
        <slot />
    </button>
</div>