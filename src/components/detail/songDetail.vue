<template>
  <div class="detail">
		<Layout>
			<div class="songInfoDisplay">
			<Row class="myRow">
				<i-col span="10">
					<div class="songPic" style="background-image:url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3345124030,1424070086&fm=26&gp=0.jpg)"/>					
				</i-col>
				<i-col span="14" class="songText">
					<div class="songName">{{song.name}}</div>
					<div class="singerName">{{song.singerName}}</div>
					<div class="otherInfo">
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
							<i-col span="8"><i-button shape="circle" class="myButton" type="primary">播放</i-button></i-col>
							<i-col span="8"><i-button shape="circle" class="myButton">添加到</i-button></i-col>
							<i-col span="8"><i-button shape="circle" class="myButton">下载</i-button></i-col>
							<!--<i-col span="6"><i-button class="myButton">添加到</i-button></i-col>-->
						</Row>
					</div> 
				</i-col>
			</Row>
		</div>
		</Layout>
		<Layout backgroud="green">
			<div class=commentAdd>
			  <div>
					<i-input type="textarea" placeholder="留下你的评论吧……"></i-input>
				</div>
			</div>
		</Layout>
  </div>
</template>

<script>
export default {
  name: 'songDetail',
	mounted(){
	  console.log('id' + this.song.id);
	},
  data(){
		return {
			song: {
					id: 1,
					name: '名称',
					alnumName:'专辑名称',
					image:'',
					school:'流派',
					company:'公司',
					language:'语种',
					singerName: '歌手名字',
					albumId:0,
					issueTime:'发行时间',
					playTimes:0,
			}
		}
	}
}
</script>

<style scoped>
.myButton{
	width:80%;
	height:100%;
	font-size:25px;
}
.buttonGroup{
	padding-top:55px;
	height:119px;
}
.otherInfo{
	padding-top:20px;
	font-size:25px;
}
.songName{
	font-size:50px;
}
.singerName{
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