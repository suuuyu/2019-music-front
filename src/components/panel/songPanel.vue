<template>
	<div @mouseenter="showPanel" align="center"  @mouseleave="disShow" style="height: 50px;width:400px;background-color:rgba(255, 255, 255, 0.5);">
    <div class="songlist__btn" v-if="show">
		<!-- <router-link tag="a" target="_blank" :to="{path:'/player',query:{musicList:['等你下课','发如雪','夜曲']} }"><img src="Index_image/play.png" alt="play" height="35px" width="35px" class="songlist_btn"></router-link> -->
		<Button type="primary" shape="circle" icon="ios-play" @click="play" class="songlist_btn"></Button>
		<Button shape="circle" icon="md-heart-outline" @click="like" :disabled="!me" class="songlist_btn"></Button>
		<Button shape="circle" icon="md-add" @click="choose" :disabled="!me" class="songlist_btn" v-if="type==1"></Button>
		<Button v-if="type==1" shape="circle" icon="ios-cloud-download-outline" class="songlist_btn" @click="downloadThis"></Button>
		<Button shape="circle" icon="md-trash" class="songlist_btn" v-if="type==2||type==1&&mySongList" type="warning" @click="toDelete"></Button>
    </div>
	</div>
</template>

<script>
import {likeSong, keepSonglist, getSongList, isBought} from '@/request/song'
import { isNumber } from 'util';
import { saveAs } from 'file-saver';
import {CORS, AXIOS} from '@/http/http'
export default {
    name: 'songPanel',
    props:['songid', 'type', 'mySongList', 'song'], //type: 1歌曲  2歌单 3专辑
    data () {
			return {
				show: false,
				me: sessionStorage.getItem('userid')
			}
	},
	mounted() {
		// if(this.type === 2) {
		// 	getSongList(this.songid, json => {
		// 		this.mySongList = json.userid == me ? true : false
		// 	})
		// }
	},
    methods: {
		downloadThis() {
			isBought(this.songid, sessionStorage.getItem('userid'), (res) => {
				if (res == 1||res == 2) {
					console.log(res)
					let mes= res == 1?'您已购买过此歌曲':'您是VIP会员，可以无限下载'
					this.$Message.success('即将开始下载')
					saveAs(CORS + this.song.songpath, this.song.songname)
				} else {
					this.$Message.error('您不是会员或未购买过歌曲，不能下载')
				}
			})
		},
		toDelete () {
			this.$emit('toDelete', this.songid)
		},
		play() {
			const inner = isNumber(this.$root.$children[0].$children[0].bottom) ? this.$root.$children[0].$children[1] : this.$root.$children[0].$children[0]
			console.log(inner)
			if(this.type == 1) {	
				inner.addSong(this.songid)
			}
			if(this.type == 2) {
				inner.addSonglist(this.songid)
			}
		},
		showPanel() {
			this.show = true
		},
		disShow() {
			this.show = false
		},
		choose() {
			if (!this.me) {
				sessionStorage.setItem('path', this.$router.history.current.fullPath)
				this.$router.push('/login')
				this.$Message.error('您当前未登录')
				return
			}
			this.$emit('toChoose', this.songid)
		},
		like() {
			if (!this.me) {
				sessionStorage.setItem('path', this.$router.history.current.fullPath)
				this.$router.push('/login')
				this.$Message.error('您当前未登录')
				return
			}
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
			if(this.type == 2) {
				keepSonglist(this.me, this.songid, (json) => {
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
	font-size: 30px;
}
.songlist_btn {
    margin-left: 20px;
}
</style>



