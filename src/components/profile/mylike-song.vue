<template>
    <div>
		<div class="detail-contain" >
			<vue-lazy-component  :timeout="1000">
			<Table stripe  :columns="columns" :data="toShow">
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
						<songPanel :songid="row.songid" :type="1" class="panel" @toChoose="toChoose" :mySongList="isMySongList" @toDelete="deleteSong" :song="row"></songPanel>
					</strong>
				</template>
				<template slot-scope="{ row }" slot="singer">
					<strong><a class="panel-word" v-text="row.singer ? row.singer: '暂无'" @click="row.singer ? openSingerDetail(row.singerID) : ''"></a></strong>
				</template>
				<template slot-scope="{ row, index}" slot="album">
					<strong><router-link class="panel-word" :to="'/album/' + row.albumid" :key="$route.path" v-text="albums[index] ? albums[index].albumname : '暂无'"></router-link></strong>
				</template>
				<template slot-scope="{ row }" slot="length">
					<strong><span class="panel-word">{{minuteTime(row.length)}}</span></strong>
				</template>
			</Table>
			<div style="margin: 10px;overflow: hidden">
				<div style="float: right;">
					<Page :total="song.length" :page-size="8"	 :current="index" @on-change="changePage"></Page>
				</div>
			</div>
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
import {showCreatedSongList, keepSong, createSonglist, unkeepSong} from '@/request/song'
import singerDetail from '@/components/detail/singerDetail'
export default {
    components: {
		'songPanel': songPanel,
		'songlist-choose': songlistChoose,
		'singer-detail': singerDetail
    },
    props:['song', 'songlist'],
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
				// this.buildMsg(msg)
			}
			this.changePage(this.index)
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
				// this.buildMsg(msg)
			}
			if (this.songlist.userid && this.songlist.userid === sessionStorage.getItem('userid')) {
				this.isMySongList = true
			}
			this.changePage(this.index)
			// this.toShow = this.song
		}, 1000)
		setTimeout(() => {
			this.$Loading.finish();
		}, 1500)
    },
    data () {
			return {
				index: 1,
				toShow: [],
				isMySongList: false,
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
		changePage(index) {
			this.index = index
			this.toShow = []
			for(let i = 0; i<8; i++) {
				let pos = i +  (index - 1) * 8
				if (this.song.length > pos) {
					this.toShow.push(this.song[pos])
				}
				
			}
		},
		deleteSong(songid) {
			console.log(songid)
			unkeepSong(songid,this.songlist.songlistid, (json) => {
				let toShow = this.toShow
				if (json.success) {
					let index = -1
					for(let i = 0;i<toShow.length;i++) {
						if(toShow[i].songid === songid) {
							index = i
							break
						}
					}
					this.toShow.splice(index, 1)
					this.$Message.success('删除成功')
				} else {
					this.$Message.error(json)
				}
			} )
		},
		minuteTime(second) {
			let minute = parseInt(second / 60)
			second = String(second % 60 + 100)
			return `${minute}:${second.substr(second.length - 2, 2)}`
		},
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
	padding-bottom: 100px;
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
