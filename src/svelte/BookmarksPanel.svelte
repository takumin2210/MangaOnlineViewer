<script lang="ts">
    import { _ as getLocaleString } from 'svelte-i18n';
    import settings from '../core/settings';
    import IconX from './icons/x.svelte';
    import IconExternalLink from './icons/external-link.svelte';
    import IconTrash from './icons/trash.svelte';
    import { isEmpty } from '../utils/checks';
</script>

<div id="BookmarksPanel" class="panel">
    <button id="CloseBookmarks" class="closeButton" title={$getLocaleString('CLOSE')}>
        <IconX />
    </button>
    <h2>{$getLocaleString('BOOKMARKS')}</h2>
    <div id="BookmarksList">
        {#if isEmpty($settings.bookmarks)}
            {$getLocaleString('LIST_EMPTY')}
        {:else}
            {#each $settings.bookmarks as mark, index (index)}
                <div id="Bookmark{index + 1}" class="BookmarkItem">
                    <span class="bookmarkData bookmarkDate">
                        {new Date(mark.date).toISOString().slice(0, 10)}
                    </span>
                    <span class="bookmarkData bookmarkURl">
                        <a class="" href={mark.url} target="_blank">{mark.url}</a>
                    </span>
                    <span class="bookmarkData bookmarkPage">Page: {mark.page}</span>
                    <span class="bookmarkData bookmarkFunctions">
                        <a class="" href={mark.url} target="_blank">
                            <button class="ControlButton open" title="Open Bookmark" type="button">
                                <IconExternalLink />
                            </button>
                        </a>
                        <button
                            class="ControlButton erase"
                            title="Delete Bookmark"
                            type="button"
                            value={mark.url}
                        >
                            <IconTrash />
                        </button>
                    </span>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
</style>
