<template>
	<div @mouseenter="showPanel" align="center"  @mouseleave="disShow" style="height: 60px;width:400px;background-color:rgba(255, 255, 255, 0.5);">
    <div class="songlist__btn" v-if="show">
        <a href="javascript:;"><img src="Index_image/play.png" alt="play" height="35px" width="35px" class="songlist_btn"></a>
        <span><a href="javascript:;" @click="like"><img src="Index_image/like.png" alt="like" height="35px" width="35px" class="songlist_btn"></a></span>
        <span><a href="javascript:;" @click="choose"><img src="Index_image/add.png" alt="add" height="35px" width="35px" class="songlist_btn"></a></span>
        <span><a href="javascript:;"><img src="Index_image/download.png" alt="download" height="35px" width="35px" class="songlist_btn"></a></span>
    </div>
	</div>
</template>

<script>
import {likeSong} from '@/request/song'
export default {
    name: 'songPanel',
    props:['songid', 'type'], //type: 1歌曲  2专辑
    data () {
			return {
				show: false,
				me: sessionStorage.getItem('userid')
			}
    },
    methods: {
			showPanel() {
				this.show = true
			},
			disShow() {
				this.show = false
			},
			choose() {
				this.$emit('toChoose', this.songid)
			},
			like() {
				if(this.type == 1) {
					likeSong(this.me, this.songid, (json) => {
						if(json.success){
							this.$Notice.success({
								title: '成功',
								desc: json.errorMsg
							})
						} else {
							this.$Notice.error({
								title: '失败',
								desc: json.errorMsg
							})
						}
					})
				}
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



