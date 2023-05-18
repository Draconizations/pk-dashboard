<script lang="ts">
	import type { Member } from "$lib/api/types";

    export let members: Member[]

    members.sort((a, b) => b.name && a.name?.localeCompare(b.name) || 0)
</script>

<div class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-900 dark:text-gray-100">
    <ul>
        {#each members as member (member.uuid)}
            <li>
                {member.name} ({member.id})
            </li>
        {/each}
    </ul>
</div>