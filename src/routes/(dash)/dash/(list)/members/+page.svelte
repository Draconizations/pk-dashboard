<script lang="ts">
	import MemberList from "$lib/components/member/MemberList.svelte";
	import MemberListControl from "$lib/components/member/MemberListControl.svelte"
	import type { PageData } from "./$types";

    export let data: PageData
</script>

<div class="w-full lg:w-1/2 xl:w-1/3">
    <MemberListControl />
</div>
<div class="w-full lg:w-1/2 xl:w-2/3">
    <MemberList members={data.members} />
</div>