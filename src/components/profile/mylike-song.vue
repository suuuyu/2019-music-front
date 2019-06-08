<template>
    <div>
		<div class="detail-contain" >
			<vue-lazy-component  :timeout="1000">
			<Table stripe  :columns="columns" :data="song">
				<template slot-scope="{ row }" slot="name">
					<strong>
					<router-link class="panel-word" :to="'/song/' + row.songid" :key="$route.path">{{ row.songname }}
					<Icon type="logo-usd" v-show="row.free=='1'?false:true" 
					style="color:rgb(255, 174, 0);font-size:18px" />
					</router-link>
					</strong>
				</template>
				<template slot-scope="{ row }" slot="menuBar">
					<strong>
						<songPanel :songid="row.songid" :type="1" class="panel" @toChoose="toChoose"></songPanel>
					</strong>
				</template>
				<template slot-scope="{ row, index }" slot="singer">
					<strong><a class="panel-word" v-text="singers[index] ? singers[index].singername: '暂无'" @click="singers[index] ? openSingerDetail(singers[index]) : ''"></a></strong>
				</template>
				<template slot-scope="{ row, index}" slot="album">
					<strong><router-link class="panel-word" :to="'/album/' + row.albumid" :key="$route.path" v-text="albums[index] ? albums[index].albumname : '暂无'"></router-link></strong>
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
		<songlist-choose ref="chooser" :songid="songid" :mySonglist="mySonglist"></songlist-choose>
		<singer-detail ref="singerDetail"></singer-detail>
    </div>
</template>

<script>
import {AXIOS} from '@/http/http'
import songPanel from '../panel/songPanel'
import songlistChoose from '../panel/songlistChoose'
import { setTimeout } from 'timers'
import {showCreatedSongList, keepSong, createSonglist} from '@/request/song'
import singerDetail from '@/components/detail/singerDetail'
export default {
    components: {
		'songPanel': songPanel,
		'songlist-choose': songlistChoose,
		'singer-detail': singerDetail
    },
    props:['song'],
	name: 'mylike-song',
	watch: {
		song() {
			this.albums = new Array(this.song.length)
			this.singers = new Array(this.song.length)
			let msg = {'albumid': [], 'songid': []};
			for(let i=0; i<this.song.length; i++){
				// msg.albumid.push(this.song[i].albumid)
				// msg.songid.push(this.song[i].songid)
				this.buildAlbum(this.song[i].albumid, i)
				this.buildSinger(this.song[i].songid, i)
				// this.buildMsg(msg)
			}
		}
	},
    mounted () {
			this.$Loading.start();
			setTimeout(() => {
				console.log('长度:' + this.song.length)
				this.albums = new Array(this.song.length)
				this.singers = new Array(this.song.length)
				let msg = {'albumid': [], 'songid': []};
				for(let i=0; i<this.song.length; i++){
					// msg.albumid.push(this.song[i].albumid)
					// msg.songid.push(this.song[i].songid)
					this.buildAlbum(this.song[i].albumid, i)
					this.buildSinger(this.song[i].songid, i)
					// this.buildMsg(msg)
				}
			}, 1000)
			setTimeout(() => {
				this.$Loading.finish();
			}, 1500)
    },
    data () {
			return {
				singerDetail: false,
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
		openSingerDetail(singer) {
			this.$refs.singerDetail.open(singer)
		},
		toChoose(id) {
			this.$refs.chooser.toShow()
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
		buildAlbum(albumid, i) {
			this.getAlbum(albumid, (json) => {
				this.$set(this.albums, i, json)
			})
		},
		buildSinger(songid, i) {
			this.getSinger(songid, (json) => {
				this.$set(this.singers, i, json[0])
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
