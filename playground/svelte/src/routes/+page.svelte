<script lang="ts">
  import { setTheemoContext } from '@theemo/svelte';
  import Themer from '$lib/themer.svelte';

  import { onMount } from 'svelte';

  onMount(() => {
    setTheemoContext();
  });
</script>

<Themer />
