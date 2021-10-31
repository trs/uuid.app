<script lang="ts">
  let className: string = undefined;
  export { className as class };
</script>

<span class="
  flex
  {className}
">
  <slot />
</span>
