<script lang="ts">
    import { page } from "$app/stores";
    import { Button } from "flowbite-svelte";

    export let area: "dash" | "profile"
    export let sid: string = "exmpl";

    $: pageUrl = $page.url.pathname

    const matchPath = (url: string) => pageUrl.endsWith(url) ? true : false
    const buttonColor = (url: string) => matchPath(url) ? undefined : "light"

    const baseurl = area === "profile" ? `/profile/${sid}/` : `/dash/`
</script>


<div class="flex flex-wrap mb-4 mx-auto justify-center">
    <Button 
        href={baseurl} 
        class="rounded-r-none grow md:grow-0" 
        color={buttonColor("dash")}>
        Overview
    </Button>
    <Button 
        href={baseurl + "system"} 
        class="rounded-r-none rounded-l-none grow md:grow-0" 
        color={buttonColor("system")}>
        System
    </Button>
    <Button 
        href={baseurl + "members"} 
        class="rounded-r-none rounded-l-none grow md:grow-0" 
        color={buttonColor("members")}>
        Members
    </Button>
    <Button 
        href={baseurl + "groups"} 
        class="rounded-l-none grow md:grow-0" 
        color={buttonColor("groups")}>
        Groups
    </Button>
</div>