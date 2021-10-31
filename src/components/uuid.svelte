<script lang="ts">
  export let uuid;

  import Wrap from '../components/wrap.svelte';
  import CopyButton from '../components/copyButton.svelte';
  import GenerateButton from '../components/generateButton.svelte';

  let containerElement: HTMLDivElement;
  let inputElement: HTMLInputElement;

  let highlight = () => {
    containerElement.classList.replace("ring-purple-500", "ring-white");
    setTimeout(() => {
      containerElement.classList.replace("ring-white", "ring-purple-500");
    }, 250);
  }

</script>

<div
  bind:this={containerElement}
  class="
    xs:ring-2 ring-purple-500
    rounded-lg
    grid grid-cols-1 xs:grid-cols-[1fr,auto] grid-rows-[auto,auto] xs:grid-rows-1
    justify-items-center
    gap-3 xs:gap-0
    h-8 xs:h-10 sm:h-12 md:h-14
    transition-all
    text-white whitespace-nowrap
  "
>
  <input
    type="text"
    bind:this={inputElement}
    bind:value={uuid}
    size="36"
    readonly
    class="
      font-mono
      text-md xs:text-lg sm:text-xl md:text-2xl
      rounded-lg xs:rounded-r-none
      xs:ring-0 ring-2 ring-purple-500
      outline-none
      bg-black-500
      px-3 sm:px-3 md:px-4
      py-2 sm:py-0
    "
  />

  <Wrap class="
    xs:ring-0 ring-2 ring-purple-500
    sm:ring-0
    rounded-lg xs:rounded-r-0 xs:rounded-l-0
  ">
    <Wrap class="rounded-l-lg xs:rounded-none overflow-hidden">
      <CopyButton bind:input={inputElement} bind:click={highlight} />
    </Wrap>
    <Wrap class="rounded-r-lg overflow-hidden">
      <GenerateButton bind:uuid={uuid} />
    </Wrap>
  </Wrap>
</div>

<style>
  input::selection {
    @apply bg-purple-500;
  }
</style>
