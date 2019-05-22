<template>
    <div>
        <div class="mod_songlist_toolbar">
            <a href="javascript:;" class="mod_btn_blue js_all_play">
                <i class="mod_btn_green__icon_play"></i>
                <img src="Index_image/mod_play.png" class="operate_btn" alt="play">
                播放
            </a>
            <a href="javascript:;" class="mod_btn js_all_fav">
                <i class="mod_btn__icon_add"></i>
                <img src="Index_image/mod_add.png" class="operate_btn" alt="add">
                添加到
            </a>
            <a href="javascript:;" class="mod_btn js_all_down">
                <i class="mod_btn__icon_down"></i>
                <img src="Index_image/mod_download.png" class="operate_btn" alt="download">
                下载
            </a>
            <a href="javascript:;" class="mod_btn js_batch">
                <i class="mod_btn__icon_batch"></i>
                <img src="Index_image/mod_multoperate.png" class="operate_btn" alt="operate">
                批量操作
            </a>
        </div>
				<div class="detail-contain" >
					<vue-lazy-component  :timeout="3000">
					<Table stripe  :columns="columns" :data="song">
							<template slot-scope="{ row }" slot="name">
									<strong><router-link class="panel-word" :to="'/song/' + row.songid" :key="$route.path">{{ row.songname }}</router-link></strong>
							</template>
							<template slot-scope="{ row }" slot="menuBar">
									<strong>
											<songPanel :songid="row.songid" :type="1" class="panel" @toChoose="toChoose"></songPanel>
									</strong>
							</template>
							<template slot-scope="{ row }" slot="singer">
									<strong><a class="panel-word" v-text="row.singer[0].singername"></a></strong>
							</template>
							<template slot-scope="{ row }" slot="album">
									<strong><a class="panel-word" v-text="row.album.albumname"></a></strong>
							</template>
							<template slot-scope="{ row }" slot="length">
									<strong><span class="panel-word">{{ row.length }}</span></strong>
							</template>
						</Table>
						<div class="demo-spin-col" slot="skeleton">
							<Spin fix>
									<Icon type="ios-loading" size=25 class="demo-spin-icon-load"></Icon>
									<div>Loading</div>
							</Spin>
						</div>
						</vue-lazy-component>
        	</div>
					<songlist-choose :chooseList="chooseList" :songid="songid" :mySonglist="mySonglist"></songlist-choose>
    </div>
</template>

<script>
import {AXIOS} from '@/http/http'
import songPanel from '../panel/songPanel'
import songlistChoose from '../panel/songlistChoose'
import { setTimeout } from 'timers'
import {showCreatedSongList, keepSong, createSonglist} from '@/request/song'
export default {
    components: {
				'songPanel': songPanel,
				'songlist-choose': songlistChoose
    },
    props:['song'],
    name: 'mylike-song',
    mounted () {
			this.$Loading.start();
			setTimeout(() => {
				console.log('长度:' + this.song.length)
				let msg = {'albumid': [], 'songid': []};
				for(let i=0; i<this.song.length; i++){
					// msg.albumid.push(this.song[i].albumid)
					// msg.songid.push(this.song[i].songid)
					this.buildAlbum(this.song[i].albumid, this.song[i])
					this.buildSinger(this.song[i].songid, this.song[i])
					// this.buildMsg(msg)
				}
			}, 1000)
			setTimeout(() => {
				this.$Loading.finish();
			}, 1500)
    },
    data () {
			return {
				chooseList: false,
				songid: '',
				toEdit: false,
				songlistName: '',
				albums: [
					// "albumid": "1000000",
					// "albumname": "十一月的萧邦",
					// "singerid": "200000",
					// "albumimage": null,
					// "albumage": "00",
					// "language": "中文",
					// "company": "索尼音乐"
				],
				singers: [
					// {
					// 	"singerid": "200000",
					// 	"singername": "周杰伦",
					// 	"singerimage": null,
					// 	"singersex": "男",
					// 	"region": "中国台湾",
					// 	"introduction": "中国台湾流行男歌手"
 				 	// }
				],
				mySonglist:[],
				columns:[
					{
						title: '歌名',
						width: 200,
						slot: 'name'
					},
					{
						title: ' ',
						width: 400,
						slot: 'menuBar',
					},
					{
						title: '歌手',
						slot: 'singer',
					},
					{
						title: '专辑',
						slot: 'album',
					},
					{
						title: '时长',
						slot: 'length',
					}
				],

			}
    },
    methods: {
			toChoose(id) {
				this.chooseList = true
				this.songid = id
				showCreatedSongList(sessionStorage.getItem('userid'), json => {
					this.mySonglist = json
				})
			},
			buildMsg(msg) {
				AXIOS.post('/buildSong', msg)
				.then(response => {
					alert(response.data)
					this.albums = response.data.albums
					this.singers = response.data.singers
					console.log(response.data)
				})
				.catch(error => {
					console.log(error)
				})
			},
			buildAlbum(albumid, song) {
				this.getAlbum(albumid, (json) => {
					song.album = json
				})
			},
			buildSinger(songid, song) {
				this.getSinger(songid, (json) => {
					song.singer = json
				})
			},
			getAlbum(albumid, callback) {
				AXIOS.get('/getAlbum?albumid=' + albumid)
				.then(respond => {
					callback(respond.data)
				})
				.catch(error => {
					this.$Loading.error();
					this.$Notice.error({
							title: '获取专辑出错',
							desc: error ? error : '未知错误'
					})
				})
			},
			getSinger(songid, callback) {
				AXIOS.get('/getSingerBySong?songid=' + songid)
				.then(respond => {
					callback(respond.data)
				})
				.catch(error => {
					this.$Loading.error();
					this.$Notice.error({
							title: '获取歌曲出错',
							desc: error ? error : '未知错误'
					})
				})
			}
    }
}
</script>

<style scoped>
a {
  color: black
}
.demo-spin-icon-load{
	animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
		from { transform: rotate(0deg);}
		50%  { transform: rotate(180deg);}
		to   { transform: rotate(360deg);}
}
.demo-spin-col{
	height: 300px;
	position: relative;
	border: 1px solid #eee;
}
.mod_songlist_toolbar {
    float: left;
    margin-bottom: 20px;
    font-size: 0;
    padding-top: 20px;
}
.mod_btn_blue {
    border: 1px solid rgba(22,154,243,1.00);
    background-color: rgba(22,154,243,1.00);
    color: #fff;
}
.mod_btn, .mod_btn_blue {
    border-radius: 2px;
    font-size: 14px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    width: 120px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
}
.mod_btn {
    border: 1px solid #c9c9c9;
    background-color: #FFFFFF;
    color: #000;
}
.operate_btn {
    height: 15px;
    position: relative;
    top: 3px;
    right: 3px;
}
.detail-contain {
    float: left;
    position: relative;
    width: 100%;
    min-width: 1200px;
}
.panel {
    margin-right: 50px;
		margin-bottom: 0;
}
.panel-word {
    font-size: 14px;
    font-family: 微软雅黑,sans-serif;
    font-weight:500;
}
</style>
