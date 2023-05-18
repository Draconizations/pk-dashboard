<script lang="ts">
	import type { Member } from "$lib/api/types";
    export let members: Member[]
</script>

<div class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-gray-900 dark:text-gray-100">
    <ul>
        {#each members as member (member.uuid)}
            <li>
                <b>{member.name}</b> ({member.id})
            </li>
        {/each}
    </ul>
</div>