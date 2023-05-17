<script lang="ts">
  import "../app.scss";
  import Navbar from "$lib/components/Navbar.svelte"
  import Footer from "$lib/components/Footer.svelte";
  import type { LayoutData } from "./$types"

  export let data: LayoutData
</script>

<div class={"flex flex-1 flex-col" + " " + data.theme}>
  <div class="bg-white dark:bg-gray-900 flex-1 flex flex-col">
    <Navbar theme={data.theme} user={data.user} />
      <div class="container mx-auto p-3">
        <slot />
      </div>
    <Footer />
  </div>
</div>