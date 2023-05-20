<script lang="ts">
    import { page } from "$app/stores"
</script>

<div class="w-full md:w-1/3 lg:w-1/2 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-900 dark:text-gray-100 mx-auto">
    <h3 class="text-xl mb-2">{$page.status}: {$page.error?.message}</h3>
    {#if $page.status === 404}
        <p>Looks like this page doesn't exist. <a class="text-blue-600 dark:text-blue-400 hover:underline" href="/">Go home</a>?</p>
    {:else if $page.status === 500}
        <p>Internal server error! Please report this to the developers with what you were doing at the time.</p>
    {/if}
</div>