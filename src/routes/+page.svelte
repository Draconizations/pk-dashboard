<script lang="ts">
	import { enhance } from "$app/forms";
	import { Label, Input, Button, Alert } from "flowbite-svelte";
	import type { ActionData, PageServerData } from "./$types"
    import { IconLock, IconLockOpen } from "@tabler/icons-svelte"

    export let data: PageServerData
    export let form: ActionData

</script>

<h3 class="text-xl mb-2 text-gray-900 dark:text-gray-100">
    {#if data.user}
        <IconLockOpen class="inline" /> Welcome!
    {:else}
        <IconLock class="inline" /> Login
    {/if}
</h3>

<div class="w-full md:w-1/2 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-900 dark:text-gray-100">
    {#if data.error}
        <Alert color="red">
            <span class="font-medium">Invalid token.</span> Double check if you've got the correct token.
        </Alert>
    {/if}

    {#if data.user}
        {#if data.user.name}
            Welcome, <b>{data.user.name}</b>!
        {:else}
            Welcome!
        {/if}
        <form method="POST" use:enhance action="/?/logout">
        <button class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:red-blue-800 rounded-lg mt-2"
            >Logout
        </button>
        </form>
    {:else}
    <form method="POST" use:enhance action="/?/login">
        <Label for="token-input">
            Token
        </Label>
        <p class="mb-2" >Input your token here, you can get this by using <b>pk;token</b>.</p>
        <Input name="pk-token" id="token-input" placeholder="token..." type="password" />
        {#if form?.missing}
            <div class="text-sm text-red-800 dark:text-red-500">Your token is required.</div>
        {/if}
        <button class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-lg mt-2"
            >Login with token
        </button>
    </form>
    {/if}
</div>

<svelte:head>
    <title>PluralKit | home</title>
</svelte:head>