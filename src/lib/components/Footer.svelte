<script lang="ts">
    import { PUBLIC_REPOSITORY_URL } from "$env/static/public"
    import { version } from "$app/environment";
    import { Footer, FooterLink, FooterLinkGroup } from "flowbite-svelte";

    const repoUrl = PUBLIC_REPOSITORY_URL || "https://github.com/pluralkit/pluralkit/"
    const commitHash = version.split("-")[1]
</script>

<Footer class="shadow-none mt-auto flex dark:bg-gray-900" >
    <FooterLinkGroup ulClass="flex flex-wrap items-center justify-end flex-1 mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <FooterLink href={`${repoUrl}/commit/${commitHash}`}>
            {version}
        </FooterLink>
        <FooterLink href="https://pluralkit.me/privacy/">
            Privacy Policy
        </FooterLink>
    </FooterLinkGroup>
</Footer>