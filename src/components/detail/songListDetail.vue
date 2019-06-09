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
					<div class="subTitle">创建者：{{songListCreater.username}}</div>
					<div class="text">
						<Row>
					   <i-col span="12">创建时间：{{songList.createtime}}</i-col>
					  </Row>
						<Row class="buttonGroup">
							<i-col span="8"><Button class="btn btn-default-large myButton"  @click="playAll">播放全部</Button></i-col>							
							<i-col span="8"><Button class="btn btn-default-large myButton"  v-on:click="keepSongList" 
							v-bind:class="{keepedButton:isKeeped}">{{isKeeped?'取消收藏':'收藏'}}</Button></i-col>
						</Row>
					</div> 
				</i-col>
			</Row>
		</div>
		</Layout>
		<Layout>
			<div>
        <Tabs value="name1" @on-click="handle">
            <TabPane label="歌曲" name="name1" class="real-panel"><mylikesong :song="songs"></mylikesong></TabPane>
        </Tabs>
    </div>
		</Layout>
  </div>
</template>
<script>
import { AXIOS } from '../../http/http';
import mylikesong from '../profile/mylike-song';
import { isNumber } from 'util';
export default{
  	name: 'songListDetail',
  	data(){
    return{
			songListId:'',
			songList:{},
			songListCreater:{},
			songs:[],
			isKeeped:false,
			userId:'',
    	}
	},
	components:{
		mylikesong,
	},
  methods:{
		playAll() {
				const inner = isNumber(this.$root.$children[0].$children[0].bottom) ? this.$root.$children[0].$children[1] : this.$root.$children[0].$children[0]
				console.log(inner)
				inner.addSonglist(this.songListId)
			},
    getSongListInfo:function(){
      AXIOS.get('/getSongListById',{
        params:{
          songListId:this.songListId,
        }
      }).then(response=>{
        this.songList = response.data;
        var createdTime = this.songList.createtime;
        createdTime = createdTime.substring(0,10);
        this.songList.createtime = createdTime;
        this.getCreatedUserName();
      }).catch(response=>{
        console.log(response);
			});
		},
		getSongsInList:function(){
			AXIOS.get('/getSongsInList',{
				params:{
					songListId:this.songListId,
				}
			}).then(response=>{
				this.songs = response.data;
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
        this.songListCreater = response.data;
      }).catch(response=>{
        console.log(response);
      });
		},
	  keepSongList:function(){
			console.log(this.isKeeped);
			if(!this.isKeeped){
				AXIOS.post('/keepSongListPost',this.$qs.stringify({
					'userId':this.userId,
					'songListId':this.songListId,
				}),
				{
					headers:{
						'Content-Type':'application/x-www-form-urlencoded',
						'Access-Control-Allow-Origin':'http://localhost:8081',
					}
				}).then(response=>{
					if(response.data){
						this.isKeeped = true;
						this.$Notice.success({
            	title: '收藏成功'
        		});
					}else{
						this.$Notice.error({
            	title: '收藏失败'
        		});
					}
				}).catch(response=>{
					console.log(response);
					this.$Notice.error({
            	title: '收藏失败'
        	});
				});
			}else{
				AXIOS.post('/cancelKeepSongList',this.$qs.stringify({
					'userId':this.userId,
					'songListId':this.songListId,
				}),
				{
					headers:{
						'Content-Type':'application/x-www-form-urlencoded',
						'Access-Control-Allow-Origin':'http://localhost:8081',
					}
				}).then(response=>{
					if(response.data){
						this.isKeeped = false;
						this.$Notice.success({
            	title: '取消收藏成功'
        		});
					}
					else{
						this.$Notice.error({
            	title: '取消收藏失败'
        	});
					}
				}).catch(response=>{
					console.log(response);
					this.$Notice.error({
            	title: '取消收藏失败'
        	});
				});
			}
		},
		judgeIfKeeped:function(){
			AXIOS.get('/isSonglistSaved',{
				params:{
					userid:this.userId,
					songlistid:this.songListId,
				}
			}).then(response=>{
				console.log(response.data);
				if(response.data=="0"){
					this.isKeeped = false;
				}else{
					this.isKeeped = true;
				}
			}).catch(response=>{
				console.log(response.data);
			})
		}
	},
  mounted(){
		this.songListId = this.$route.params.songListID;
		this.userId = sessionStorage.getItem("userid");
		this.getSongListInfo();
		this.getSongsInList();
		this.judgeIfKeeped();
	},
}
</script>
<style scoped>
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
.keepedButton{
	background:skyblue;
	font:whitesmoke;
}
</style>