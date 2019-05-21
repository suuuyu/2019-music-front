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
									<strong><a class="panel-word">{{ row.songname }}</a></strong>
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
					<Modal v-model="chooseList">
						<p slot="header" style="color:#f60;text-align:center">
								<Icon type="ios-information-circle"></Icon>
								<span>选择想加入的歌单</span>
						</p>
						<div style="text-align:center">
							 <Card :key="index" v-for="(s, index) in mySonglist">
										<div style="text-align:center" @click="keepSong(songid, s.songlistid)">
											<p>{{s.songlistname}}</p>
										</div>
								</Card>
						</div>
						<div slot="footer">
								<Button type="success" size="large" long @click="toEdit=true" v-if="!toEdit">新建歌单</Button>
								<Row v-if="toEdit">
									<Col span="18"><Input v-model="songlistName" v-if="toEdit" placeholder="请输入新歌单的名字"></Input></Col>
									<Col span="3"><Button type="success" @click="createSonglist" ><span>确定</span></Button></Col>
									<Col span="3"><Button @click="cancelEdit">取消</Button></Col>
								</Row>
						</div>
				</Modal>
    </div>
</template>

<script>
import {AXIOS} from '@/http/http'
import songPanel from '../panel/songPanel'
import { setTimeout } from 'timers'
import {showCreatedSongList, keepSong, createSonglist} from '@/request/song'
export default {
    components: {
        'songPanel': songPanel
    },
    props:['song'],
    name: 'mylike-song',
    mounted () {
			this.$Loading.start();
			setTimeout(() => {
				console.log('长度:' + this.song.length)
				for(let i=0; i<this.song.length; i++){
					this.buildAlbum(this.song[i].albumid, this.song[i])
					this.buildSinger(this.song[i].songid, this.song[i])
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
			createSonglist() {
				createSonglist(sessionStorage.getItem('userid'), this.songlistName, json => {
					this.$Notice.success({
						title: json
					})
					this.cancelEdit()
					this.toChoose(this.songid)
				})
			},
			cancelEdit() {
				this.songlistName = ''
				this.toEdit = false
			},
			keepSong(songid, songlistid){
				keepSong(songid, songlistid, json => {
					if(json.success){
						this.$Notice.success({
							title: json.errorMsg
						})
						this.chooseList = false
					} else {
						this.$Notice.error({
							title: json.errorMsg
						})
					}
					
				})
			},
			toChoose(id) {
				this.chooseList = true
				this.songid = id
				showCreatedSongList(sessionStorage.getItem('userid'), json => {
					this.mySonglist = json
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
