<script>
  import '../app.css';
  import { setTheemoContext } from '@theemo/svelte';

  let { children } = $props();

  setTheemoContext();
</script>

<h1>SvelteKit Playground</h1>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

{@render children()}
