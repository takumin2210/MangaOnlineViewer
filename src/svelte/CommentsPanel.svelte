<script lang="ts">
    import { _ as getLocaleString } from 'svelte-i18n';
    import type { IManga } from '../types';
    import { isBackgroundColorDark } from '../utils/colors';
    import IconMessage from './icons/message.svelte';

    export let manga: IManga;
    function showComments() {
        document.getElementById('CommentsArea')?.classList.toggle('hide');
        document.querySelector('#CommentsButton')?.remove();
    }
</script>

<section id="CommentsPanel" class={manga.comments ? '' : 'hide'}>
    <button
        id="CommentsButton"
        class="ControlButton"
        title={$getLocaleString('DISPLAY_COMMENTS')}
        on:click={showComments}
        style="width:100%"
    >
        <IconMessage />
        {$getLocaleString('DISPLAY_COMMENTS')}
    </button>
    <div
        id="CommentsArea"
        class="hide {isBackgroundColorDark(manga.comments ?? document.body) ? 'dark' : 'light'}"
    >
        {manga.comments}
    </div>
</section>
