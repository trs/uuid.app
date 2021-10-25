<script lang="ts">
  export let uuid;

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
    ring-2 ring-purple-500
    rounded-lg overflow-hidden
    flex
    h-10 sm:h-12 md:h-14
    text-xl sm:text-2xl md:text-3xl
    font-mono
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
      outline-none
      bg-black-500
      px-2 sm:px-3 md:px-4
    "
  />

  <CopyButton bind:input={inputElement} bind:click={highlight} />
  <GenerateButton bind:uuid={uuid} />
</div>

<style>
  input::selection {
    @apply bg-purple-500;
  }
</style>
