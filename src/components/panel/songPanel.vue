<template>
	<div @mouseenter="showPanel" align="center"  @mouseleave="disShow" style="height: 60px;width:400px;background-color:rgba(255, 255, 255, 0.5);">
    <div class="songlist__btn" v-if="show">
        <a href="javascript:;"><img src="Index_image/play.png" alt="play" height="35px" width="35px" class="songlist_btn"></a>
        <span><a href="javascript:;"><img src="Index_image/like.png" alt="like" height="35px" width="35px" class="songlist_btn"></a></span>
        <span><a id="add" href="javascript:;"><img src="Index_image/add.png" alt="add" height="35px" width="35px" class="songlist_btn"></a></span>
        <span><a href="javascript:;"><img src="Index_image/download.png" alt="download" height="35px" width="35px" class="songlist_btn"></a></span>
    </div>
	</div>
</template>

<script>
export default {
    name: 'songPanel',
    props:['songid'],
    data () {
        return {
            show: false
        }
    },
    methods: {
        showPanel() {
          this.show = true
				},
				disShow() {
					this.show = false
				}
    }
}
</script>

<style scoped>
.songlist__btn {
    position: relative;
    white-space: normal;
		margin-bottom: auto;
		margin-top: 10px;
}
.songlist_btn {
    margin-left: 10px;
}
</style>



