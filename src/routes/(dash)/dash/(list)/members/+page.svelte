<script lang="ts">
    import { getContext } from "svelte";
	import MemberList from "$lib/components/member/MemberList.svelte";
	import MemberListControl from "$lib/components/member/MemberListControl.svelte"

    const members: any = getContext("members")
</script>

<div class="w-full lg:w-1/2 xl:w-1/3">
    <MemberListControl />
</div>
<div class="w-full lg:w-1/2 xl:w-2/3">
    <MemberList members={$members} />
</div>