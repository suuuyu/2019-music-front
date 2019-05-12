<template>
    <div class="songlist__btn">
        <a href="javascript:;"><img src="Index_image/play.png" alt="play" height="35px" width="35px" class="songlist_btn"></a>
        <span><a href="javascript:;"><img src="Index_image/like.png" alt="like" height="35px" width="35px" class="songlist_btn"></a></span>
        <span><a id="add" href="javascript:;"><img src="Index_image/add.png" alt="add" height="35px" width="35px" class="songlist_btn"></a></span>
        <span><a href="javascript:;"><img src="Index_image/download.png" alt="download" height="35px" width="35px" class="songlist_btn"></a></span>
    </div>
</template>

<script>
export default {
    name: 'songPanel',
    props:['songid'],
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
.songlist__btn {
    position: relative;
    white-space: normal;
}
.songlist_btn {
    margin-left: 10px;
}
</style>



