<script context="module" lang="ts">
	import '../app.css';

  import type {Load} from '@sveltejs/kit';
  import { browser } from '$app/env';

  export const hydrate = false;

  export const load: Load = async ({session}) => {
    if (!browser && !session.uuid) {
      const {v4} = await import('$lib/uuid');
      session.uuid = v4();
    }

    return {};
  };
</script>

<slot />
