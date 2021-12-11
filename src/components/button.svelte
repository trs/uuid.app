<script lang="ts">
  export let click: () => void;
  export let animateStart: string;
  export let animateName: string;

  let svgTarget: SVGElement;

  const execute = () => {
    svgTarget.classList.remove(animateStart);

    svgTarget.classList.add(animateName);
    setTimeout(() => {
      svgTarget.classList.remove(animateName);
    }, 250);
  }

  const windup = () => {
    svgTarget.classList.add(animateStart);
  }
</script>

<button
  on:mousedown={windup}
  on:mouseup={execute}
  on:click={click}
  class="
    bg-zinc-800
    px-3 sm:px-3 md:px-4
    py-2 sm:py-0
    transition-colors
    text-purple-400
    hover:text-white
    hover:bg-purple-500
  "
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
    bind:this={svgTarget}
    class="
      w-6
      sm:w-7
      md:w-8
      pointer-events-none
    "
  >
    <slot />
  </svg>
</button>
