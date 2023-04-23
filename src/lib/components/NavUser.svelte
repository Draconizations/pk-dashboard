<script lang="ts">
    import { NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, Tooltip } from 'flowbite-svelte'
    import { IconAdjustments, IconArchive, IconUsers, IconBoxMultiple, IconSun, IconMoon } from "@tabler/icons-svelte"

    export let hidden: boolean;
    export let toggle: () => void;

    export let ulClass: string;
    export let divClass: string;

    export let breakpoint: "lg" | "sm";

    let extraClass = " sm:hidden lg:flex"
    if (breakpoint === "sm") {
        extraClass = " hidden sm:flex lg:hidden"
    }

    export let theme: string
</script>

<NavUl hidden={breakpoint === "lg" ? hidden : true} ulClass={ulClass + extraClass} divClass={divClass + extraClass} >
    <span class="block py-2 pr-4 pl-3 sm:p-0 rounded sm:border-0 hover:text-blue-700 dark:hover:text-blue-200 cursor-pointer" >
        <div class="flex items-center gap-2">
            <Avatar/> System Name
        </div>
    </span>
    <Dropdown class="w-44 z-20">
        <DropdownItem href="/dash/abcde/s" class="hover:text-blue-600 dark:hover:text-blue-200" >
            <div class="flex items-center gap-2">
                <IconArchive /> System
            </div>
        </DropdownItem>
        <DropdownItem href="/dash/abcde/m" class="hover:text-blue-600 dark:hover:text-blue-200" >
            <div class="flex items-center gap-2">
                <IconUsers /> Member
            </div>
        </DropdownItem>
        <DropdownItem href="/dash/abcde/g" class="hover:text-blue-600 dark:hover:text-blue-200" >
            <div class="flex items-center gap-2">
                <IconBoxMultiple /> Groups
            </div>
        </DropdownItem>
    </Dropdown>
    <a href="/settings" class="block py-2 pr-4 pl-3 sm:p-0 rounded sm:border-0 hover:text-blue-700 dark:hover:text-blue-200" >
        <IconAdjustments />
    </a>
    <Tooltip placement="bottom" >Settings</Tooltip>
    <form method="POST">
        <li class="block py-2 pr-4 pl-3 sm:p-0 rounded sm:border-0 hover:text-blue-700 dark:hover:text-blue-200" >
            {#if theme === "dark"}
            <button formaction="/?/setTheme&theme=light">
                <IconSun />
            </button>
            <Tooltip placement="bottom" >Light mode</Tooltip>
            {:else}
            <button formaction="/?/setTheme&theme=dark">
                <IconMoon />
            </button>
            <Tooltip placement="bottom" >Dark mode</Tooltip>
            {/if}
        </li>
    </form>
    {#if breakpoint === "sm"}
        <NavHamburger on:click={toggle} btnClass={"ml-3" + extraClass} />
    {/if}
</NavUl>