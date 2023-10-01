<script lang="ts">
    import type { IManga } from '../types';
    import settings from '../core/settings';
    import MangaPage from './MangaPage.svelte';

    export let manga: IManga;
</script>

<main
    id="Chapter"
    class="{$settings.fitWidthIfOversize ? 'fitWidthIfOversize' : ''}
      {$settings.viewMode}"
>
    {#each Array.from(Array(manga.pages + 1).keys()).slice(manga.begin) as index}
        <MangaPage {index} />
    {/each}
</main>

<style>
</style>
