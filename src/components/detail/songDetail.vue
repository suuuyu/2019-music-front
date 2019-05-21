<template>
  <div class="detail">
		<Layout>
			<div class="songInfoDisplay">
			<Row class="myRow">
				<i-col span="10">
					<div class="songPic" <!--style="background-image:url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3345124030,1424070086&fm=26&gp=0.jpg)"-->/>					
				</i-col>
				<i-col span="14" class="songText">
					<div class="title">{{song.name}}</div>
					<div class="subTitle">{{song.singerName}}</div>
					<div class="text">
						<Row>
					   <i-col span="12">专辑：{{song.albumName}}</i-col>
					   <i-col span="12">风格：{{song.school}}</i-col>
					  </Row>
					  <Row>
						  <i-col span="12">语种：{{song.language}}</i-col>
						  <i-col span="12">公司：{{song.company}}</i-col>
					  </Row>
					  <Row>
						  <i-col span="12">发行时间：{{song.issueTime}}</i-col>
						  <i-col span="12">播放次数：{{song.playTimes}}</i-col>
					  </Row>
						<Row class="buttonGroup">
							<i-col span="8"><button class="btn btn-default-large myButton" type="button">播放</button></i-col>							
							<i-col span="8">
							  <button class="btn btn-default-large myButton dropdown-toggle" 
							    data-toggle="dropdown" aria-haspopup="true" 
							    aria-expanded="false" type="button">添加到   
							    <span class="caret"></span>
							  </button>
							  <ul class="dropdown-menu">
							    <li v-for="songList in songLists" class="songListItem">
										{{songList.songlistname}}
									</li>
							  </ul>
							</i-col>
							<i-col span="8"><button class="btn btn-default-large myButton" type="button">下载</button></i-col>
						</Row>
					</div> 
				</i-col>
			</Row>
		</div>
		</Layout>
		<Layout backgroud="green">
			<div class=commentAdd>
				<div class="commentTitle">
					<p class="title comment">评论</p>
				  <p class="subTitle comment subComment">共{{song.commentNum}}条评论</p>
				</div>
			  <div>
					<i-input type="textarea" placeholder="留下你的评论吧……" :rows="6" ref="commentText" v-model = "commentText"
					class = "commentArea" style="{fontSize:30px}"></i-input>
				</div>
				<i-button type="primary" class="commentButton" v-on:click="commentSubmit">提交</i-button>
			</div>
			<div class="commentList">
				<commentList  v-bind:commentList="commentsList" ref="comment"></commentList>
			</div>
		</Layout>
  </div>
</template>

<script>
import commentList from '../profile/commentList.vue'
import { AXIOS } from '../../http/http';
export default {
	methods:{
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
			AXIOS.get("/getSingerBySong",{
				params:{
					songid:this.song.id,
				}
			}).then(response=>{
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
			  var songInfo = response.data["songInfo"];
				this.song.name = songInfo.songname;
				this.song.albumName = response.data["albumName"];
				this.song.school = songInfo.songschool;
				this.song.company = songInfo.company;
				this.song.language = songInfo.language;
				this.song.playTimes = songInfo.playtimes;
				this.song.issueTime = songInfo.songage;

				//歌曲图片获取代码暂未写定，留待进一步工作
				//this.song.image = 

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
		}
	},
	beforeMount(){
		this.userID = sessionStorage.getItem("userid");
	},
	components:{
		commentList
	},
  name: 'songDetail',
	mounted(){
		this.song.id = this.$route.params.id;
		this.getSingerName();
		this.getSongInfo();
		this.getSongList();
	},
  data(){
		return {
			userID:"",
			commentText:"留下你的评论吧~",
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
			},
			commentsList:{},
			songLists:[],
		}
	}
}
</script>

<style scoped>
.commentArea{
	font-size:35px;
}
.detail{
	
}
.songListItem{
	height:50px;
	font-size:20px;
	border: 4px 4px 4px 4px;
	border-color:black;
	border-style:initial;
}
.commentList{
	margin-top:50px;
	width:80%;
	height:1600px;
	margin-left:auto;
	margin-right:auto;
}
.commentTitle{
	position: relative;
	height:100px;
}
.comment{
	float:left;
	vertical-align: bottom;
}
.subComment{
	margin-left:40px;
	height:75px;
	position:absolute;
	left:100px;
	bottom:19px;
}
.commentButton{
	margin-top:30px;
	float:right;
	width:100px;
	height:60px;
	font-size:20px;
}
.commentAdd{
	padding-top:80px;
	width:80%;
	margin-left:auto;
	margin-right:auto;
}
.myButton{
	width:80%;
	height:100%;
	font-size:25px;
	background:white;
	border-color:lightskyblue;
	border:3px 3px 3px 3px;
}
.buttonGroup{
	height:119px;
	padding-top:55px;
}
.text{
	padding-top:20px;
	font-size:25px;
}
.title{
	font-size:50px;
}
.subTitle{
	font-size:30px;
	padding-top: 15px;

}
.songPic{
	width: 80%;
  height: 0;
	padding-bottom: 80%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size: cover;
}
.songText{
	text-align: left;
}
.songInfoDisplay
{
	padding: 5% 5% 5% 5%;
  width: 1280;
	height:512;
}
.myRow{
	width: 100%;
	height: 100%;
}
.ivu-col{
	height: 100%;
}
.ivu-layout-sider
{
	background: white!important
}
.detail {
	width: 1280px;
	height: 100%;
	margin-left: auto;
	margin-right: auto; 
}
.name-text {
	float: left;
	font-size: 31px;
	line-height: 50px;
	font-weight: 400;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70%;
	margin-right: 10px
}
.singer-text {
	height: 24px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 90%
}
</style>