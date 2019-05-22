<template>
  <div class="detail">
    <Layout>
			<div class="songListInfoDisplay">
			<Row class="myRow">
				<i-col span="10">
					<div class="songListPic" style="background-image:url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3345124030,1424070086&fm=26&gp=0.jpg)"/>					
				</i-col>
				<i-col span="14" class="songListText">
					<div class="title">{{songList.songlistname}}</div>
					<div class="subTitle">{{createdUserName}}</div>
					<div class="text">
						<Row>
					   <i-col span="12">创建时间：{{songList.createtime}}</i-col>
					  </Row>
						<Row class="buttonGroup">
							<i-col span="8"><button class="btn btn-default-large myButton" type="button">播放全部</button></i-col>							
							<i-col span="8"><button class="btn btn-default-large myButton" type="button" @click="displaySongList">收藏</button></i-col>
						</Row>
					</div> 
				</i-col>
			</Row>
		</div>
		</Layout>
  </div>
</template>
<script>
import { AXIOS } from '../../http/http';
export default{
  name:"songListDetail",
  data(){
    return{
      songListId:String,
      songList:{},
      user:{},
    }
  },
  methods:{
    getCreatedUserName:function(){
    },
    getSongListInfo:function(){
      AXIOS.get('/getSongListById',{
        params:{
          songListId:this.songListId,
        }
      }).then(response=>{
        console.log(response.data);
        this.songList = response.data;
        var createdTime = this.songList.createtime;
        createdTime = createdTime.substring(0,11);
        createdTime = createdTime
      }).catch(response=>{
        console.log(response);
      });
    },
    getCreatedUserName:function(){
      AXIOS.get('/getUser',{
        params:{
          id:this.songList.userid,
        }
      }).then(response=>{
        console.log(response.data);
        this.user = response.data;
      }).catch(response=>{
        console.log(response);
      })
    }
  },
  mounted(){
    this.songListId = this.$route.params.songListID;
    this.getSongListInfo();
    this.getCreatedUserName();
  },
  
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
.songListPic{
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
.songListText{
	text-align: left;
}
.songListInfoDisplay
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