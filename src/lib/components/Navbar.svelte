<script lang="ts">
    import { Navbar, NavBrand, NavUl, NavHamburger} from 'flowbite-svelte'
    import { IconSquareRoundedPlus, IconBook, IconBrandDiscord} from "@tabler/icons-svelte"
	import NavUser from './NavUser.svelte';

    const ulClass = "flex p-1 mt-1 items-center"
    const ulClassSm = ulClass + " flex-row justify-center sm:space-x-8 sm:mt-0 sm:text-sm sm:font-medium"
    const ulClassLg = ulClass + " flex-col lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium"
    
    const divClass = 'w-full'
    const divClassSm = divClass + " sm:block sm:w-auto"
    const divClassLg = divClass + " lg:block lg:w-auto"

    export let theme: string
</script>

<Navbar let:hidden let:toggle class="border-b border-gray-300 dark:border-gray-700 mb-5">
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            PluralKit
        </span>
    </NavBrand>
    <NavHamburger on:click={toggle} class="sm:hidden" />
    <NavUser {toggle} {hidden} ulClass={ulClassSm} divClass={divClassSm} breakpoint="sm" {theme} />
    <NavUl {hidden} ulClass={ulClassLg} divClass={divClassLg} >
        <a class="block py-2 pr-4 pl-3 lg:p-0 rounded lg:border-0 hover:text-blue-700 dark:hover:text-blue-200" href="https://discord.com/oauth2/authorize?client_id=466378653216014359&scope=bot%20applications.commands&permissions=536995904">
            <div class="flex items-center gap-2">
                <IconSquareRoundedPlus /> Invite Bot
            </div>
        </a>
        <a class="block py-2 pr-4 pl-3 lg:p-0 rounded lg:border-0 hover:text-blue-700 dark:hover:text-blue-200" href="https://pluralkit.me/">
            <div class="flex items-center gap-2">
                <IconBook /> Documentation
            </div>
        </a>
        <a class="block py-2 pr-4 pl-3 lg:p-0 rounded lg:border-0 hover:text-blue-700 dark:hover:text-blue-200" href="https://discord.gg/PczBt78">
            <div class="flex items-center gap-2">
                <IconBrandDiscord /> Support Server
            </div>
        </a>
    </NavUl>
    <NavUser {toggle} {hidden} ulClass={ulClassSm} divClass={divClassSm} breakpoint="lg" {theme} />
</Navbar>
