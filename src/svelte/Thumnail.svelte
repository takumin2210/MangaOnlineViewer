<script lang="ts">
    export let index: number;
    export let src: string = '';
</script>

<div id="Thumbnail{index}" class="Thumbnail">
    <img id="ThumbnailImg{index}" alt="" class="ThumbnailImg" {src} />
    <span class="ThumbnailIndex">{index}</span>
</div>
