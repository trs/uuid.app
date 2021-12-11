<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit';

  export const load: Load = async ({session}) => {
    return {
      props: {
        uuid: session.uuid
      }
    };
  };
</script>

<script lang="ts">
  export let uuid: string;

  import UUID from '../components/uuid.svelte';
</script>

<svelte:head>
	<title>uuid v4</title>
</svelte:head>

<main class="flex items-center justify-center h-screen">
  <UUID bind:uuid={uuid} />
</main>

<footer class="text-purple-500 absolute bottom-0 flex items-center justify-center w-screen p-4 gap-6">
  <a href="api"
    class="hover:text-white flex flex-col items-center"
  >
    <svg class="h-6 w-6 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <p class="text-sm">API</p>
  </a>

  <a href="https://github.com/trs/uuid.app" target="_blank" rel="noopener noreferrer"
    class="hover:text-white flex flex-col items-center"
  >
    <svg class="h-6 w-6 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
    <p class="text-sm">Code</p>
  </a>
</footer>
