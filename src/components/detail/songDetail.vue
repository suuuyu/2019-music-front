<template>
  <div class="detail">
		<songlistChoose :chooseList="chooseList" :songid="song.id" :mySonglist="songLists"/>
			<div class="main">
				<div class="mod_data" itemscope="" itemtype="http://schema.org/MusicRecording">
						<span class="data__cover">
							<img id="albumImg" :src="img" class="data__photo">
							<i class="data__cover_mask"></i>
						</span>
					<div class="data__cont">
						<div class="data__name">
							<!--/*@thymesVar id="song" type="com.example.demo.entity.Song"*/-->
							<h1 id="songName" class="data__name_txt" >{{song.name}}</h1>
						</div>
						<div class="data__singer">
							<i class="icon_singer"><a class="js_singer data__singer_txt" >{{song.singerName}}</a></i>
						</div>
						<ul class="data__info">
							<li class="data_info__item" >专辑：<a>{{song.albumName}}</a></li>
							<li class="data_info__item data_info__item--even" >{{`语种：${song.language}`}}</li>
							<li class="data_info__item" >{{`流派：${song.school}`}}</li>
							<li class="data_info__item data_info__item--even" >{{`公司：${song.company}`}}</li>
							<li class="data_info__item" >{{`发行时间：${song.issueTime} 年代`}}</li>
							
						</ul>
						<div class="data__actions" role="toolbar">
							<Button class="mod_btn_green js_all_play" type="primary" :disabled="!bought" @click="play()" icon="md-play">播放</Button>
							<Button class="mod_btn js_fav_album" @click="displaySongList" icon="md-add">添加到</Button>
							<Button class="mod_btn js_into_comment" :disabled="bought" @click="buy()" icon="ios-card">购买</Button>
            </div>
					</div>
				</div>
			</div>
			<div class="comment">
				<div style="max-width: 900px;margin-right:auto;margin-left:auto;">
					<div class="part__hd">
						<h2 class="part__tit">评论<span class="c_tx_thin part__tit_desc js_all_comment_num">共{{song.commentNum}}条评论</span></h2>
					</div>
					<div class="mod_comment js_cmt_input">
						<Input v-model="commentText" ref="commentText" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="说点什么吧" />
					</div>
					<Button type="primary" class="commentButton" @click="commentSubmit" icon="md-brush">提交</Button>
					<div class="commentList">
						<commentList  v-bind:commentList="commentsList" ref="comment"></commentList>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
import commentList from '../profile/commentList.vue'
import songlistChoose from '../panel/songlistChoose.vue'
import { AXIOS } from '../../http/http';
import {showCreatedSongList, keepSong, createSonglist} from '@/request/song';
import {fetchAlbums} from '@/jsonp/fetchJSONP'
import { setTimeout } from 'timers';
export default {
	methods:{
		displaySongList:function(id){
			this.chooseList = true;
			this.song.id = id;
			showCreatedSongList(sessionStorage.getItem('userid'), json => {
				this.songLists = json;
			});
		},
		commentSubmit:function(event){
			//UserID获取，待完成
			console.log("Attention!");
			var userID = sessionStorage.getItem("userid");
			var songID = this.song.id;
			console.log(this.commentText);
			var text = this.commentText;
			this.commentText = "";
			AXIOS.post("/commentSong",this.$qs.stringify({
				'songID':songID,
				'userID':userID,
				'commentText':text,
			}),
				{
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Access-Control-Allow-Origin':'http://localhost:8081',
					}
				}).then(response=>{
				if(response.data){
					console.log(response.data);
					this.getSongInfo();
				}
			}).catch(response=>{
				console.log(response);
			});
		},
		getSingerName:function(){
			AXIOS.get("/getSingerBySong?songid=" + this.song.id)
			.then(response=>{
					var singerList = response.data;
					this.song.singerName = "";
					for(var i=0; i<singerList.length; i++){
						this.song.singerName += singerList[i].singername;
						this.song.singerName += ",";
					}
					this.song.singerName = this.song.singerName.substring(0, this.song.singerName.length-1);
			}).catch((response)=>{
				  console.log(response.data);
			});
		},
		getSongInfo:function(){
			AXIOS.get("/getSongInfo",{
				params:{
					songId:this.song.id,
				}
			}).then(response=>{
				console.log("Attention! Here!");
				console.log(response.data);
			  var songInfo = response.data["songInfo"];
				this.song.name = songInfo.songname;
				this.song.albumname = response.data["albumName"];
				this.song.school = songInfo.songschool;
				this.song.company = songInfo.company;
				this.song.language = songInfo.language;
				this.song.playTimes = songInfo.playtimes;
				this.song.issueTime = songInfo.songage;
				this.song.albumid = songInfo.albumid;
				this.song.free = songInfo.free;

				//歌曲图片获取代码暂未写定，留待进一步工作
				//this.song.image = 
				fetchAlbums([this.song])
				setTimeout(() => {
					this.img = this.song.albumimage
				}, 500);

				//获取评论信息
				var List = response.data["commentsList"];
				this.song.commentNum = List.length;
				for(var i=0; i<List.length; i++){
					List[i].name = response.data["commentUsers"][i];
				}
				this.commentsList = List;
			}).catch(response=>{
				console.log(response.data);
			});
		},
		getSongList:function(){
			console.log(this.userID);
			AXIOS.get("/getSongList",{
				params:{
					id:this.userID,
				}
			}).then(response=>{
				console.log(response.data);
				var songList = response.data.createdsonglist;
				for(let i=0; i<songList.length; i++){
					this.songLists.push(songList[i]);
				}
				console.log(this.songLists.length);
			}).catch(response=>{
				console.log(response);
			});
		},
		isBought(){
			if(this.song.free=='1'){
				this.bought=true
				return
			}else{
			AXIOS.get('/isSongBought',{params:{songid:this.song.id,albumid:this.song.albumid,userid:sessionStorage.getItem("userid")}})
			.then((response)=>{
				this.bought= response.data=='1'?true:false
			})
			}
		},
		buy(){
			AXIOS.get('/buyMusic',{params:{id:sessionStorage.getItem('userid'),mid:this.song.id,type:'s'}})
			.then((response)=>{
				if(response.data==true){
					this.bought=true
					this.$Message.success('您已成功购买此歌曲')
				}
				else{
					this.$Message.error('购买失败。可能原因：余额不足')
				}
			})
		},
		play(){
			const inner = this.$root.$children[0].$children[0]
			inner.addSong(this.song.id)
		}
	},
	beforeCreate(){
		this.userID = sessionStorage.getItem("userid");
	},
	components:{
		commentList,songlistChoose
	},
  name: 'songDetail',
	created(){
		this.song.id = this.$route.params.songid;
		console.log(this.song.id);
		this.getSingerName();
		this.getSongInfo();
		this.getSongList();
		
	},
	mounted(){
		/*setTimeout(1000)
		this.isBought();*/
	},
	watch:{
		'song.free':{
			handler(newValue,oldValue){
				this.isBought()
			},
			deep:true,
			immediate:true
		}
	},
  data(){
		return {
			chooseList:false,
			img: '',
			userID:"",
			commentText:"",
			song: {
					id: "",
					name: '名称',
					albumName:'专辑名称',
					image:'',
					school:'流派',
					company:'公司',
					language:'语种',
					singerName: '歌手名字',
					issueTime:'发行时间',
					playTimes:0,
					commentNum:0,
					albumid:'',
					free:''
			},
			bought:false,
			commentsList:{},
			songLists:[],
		}
	}
}
</script>

<style scoped>
.data__actions .mod_btn, .data__actions .mod_btn_green {
	min-width: 122px;
	min-height: 38px;
	text-align: center;
	padding: 0 18px;
	font-family: 微软雅黑;
	margin-right: 10px;
	font-size: 14px;
}
.h1, .h2, .h3, h1, h2, h3 {
    margin-top: 0;
    margin-bottom: 0;
}
.part__hd, .part_detail__hd {
	overflow: hidden;
	height: 60px;
}
.part__tit, .part_detail__tit {
	float: left;
	font-size: 24px;
	font-weight: 400;
	line-height: 58px;
	font-family: 微软雅黑;
}
.part__tit_desc {
	font-size: 14px;
	margin-left: 12px;
}
.c_tx_thin {
	color: #999;
}
.icon_singer {
	float: left;
}
li {
	float: left;
}
a {
    color: #000;
    text-decoration: none;
}
.main, .section_inner {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
}
.mod_data {
	position: relative;
	height: 250px;
	padding-left: 305px;
	margin-top: 40px;
	margin-bottom: 35px;
}
.mod_data {
	padding-left: 340px;
}
.data__cover {
	position: absolute;
	left: 0;
	top: 0;
	width: 250px;
	height: 250px;
}
.data__photo {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.data__cover_mask {
	position: absolute;
	left: 0;
	top: 0;
	width: 300px;
	height: 266px;
	background: url(/Index_image/album_cover.png) 0 0 no-repeat;
	pointer-events: none;
}
.data__cont {
	padding-top: 13px;
}
.data__name {
	overflow: hidden;
	height: 50px;
	line-height: 50px;
}
.data__name_txt {
	float: left;
	font-size: 31px;
	line-height: 50px;
	font-weight: 400;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70%;
	margin-right: 10px;
}
.data__singer {
	white-space: nowrap;
}
.data__singer_txt {
	font-size: 16px;
	color: #333;
}
.data__info {
	text-align:left;
	width: 550px;
	overflow: hidden;
	padding-top: 8px;
}
.data_info__item {
	float: left;
	line-height: 27px;
	width: 200px;
	margin-right: 30px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 14px;
}
.data_info__item--even {
	width: 300px;
	margin-right: 0;
}
.data__actions {
	position: absolute;
	bottom: 23px;
	font-size: 0;
}
.commentArea{
	font-size:35px;
}
.data__cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 250px;
    height: 250px;
}
.data__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.songListItem{
	height:50px;
	font-size:20px;
	border: 4px 4px 4px 4px;
	border-color:black;
	border-style:initial;
}
.commentList{
	margin-top:80px;
}
.commentTitle{
	position: relative;
	height:100px;
}
.comment{
	background: #f5f7f9;
}

.commentButton{
	margin-top: 20px;
	font-size: 14px;
	float:right;
}



</style>