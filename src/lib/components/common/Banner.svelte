<script lang="ts">
    import resizeMedia from "$lib/api/resize-media";
	import Modal from "./Modal.svelte"
    
    export let url: string

    let open = false
</script>

<button on:click|stopPropagation={() => open = true}>
    <img class="rounded-md w-full object-cover banner" src={resizeMedia(url, [1024, 512])} alt="banner" />
</button>

{#if open && url}
    <Modal bind:open>
        <div class="p-2 rounded-lg border border-gray-600 m-auto min-h-full">
            <img class="w-full m-auto" style="max-height: 600px; max-width: 800px;" src={url} alt="Full icon" />
        </div>
    </Modal>
{/if}

<style lang="scss">
    .banner {
        aspect-ratio: 3 / 1;
    }

    @media (min-width: 768px) {
        .banner {
            aspect-ratio: 4 / 1;
        }
    }
</style>