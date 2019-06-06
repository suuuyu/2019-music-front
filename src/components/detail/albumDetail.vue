<template>
  <div class="detail">
    <Layout>
			<div class="albumInfoDisplay">
			<Row class="myRow">
				<i-col span="10">
					<div class="albumPic"> <img style="width:384px;" :src="album.albumimage" alt=""></div>					
				</i-col>
				<i-col span="14" class="albumText">
					<div class="title">{{album.albumname}}</div>
					<div class="subTitle">歌手：{{singer.singername}}</div>
					<div class="text">
						<Row>
					   <i-col span="12">语种：{{album.language}}</i-col>
             <i-col span="12">发行公司：{{album.company}}</i-col>
					  </Row>
						<Row class="buttonGroup">
							<i-col span="8"><button class="btn btn-default-large myButton" type="button">播放全部</button></i-col>							
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
import {fetchAlbums} from '@/jsonp/fetchJSONP'
import { AXIOS } from '../../http/http';
import mylikesong from '../profile/mylike-song';
export default{
  name:"albumDetail",
  data(){
    return{
      albumId:String,
      album:{},
			singer:{},
			songs:[],
			userId:String,
    }
	},
	components:{
		mylikesong,
	},
  methods:{
    getAlbumInfo(){
      AXIOS.get('/getAlbum',{
        params:{
          albumid:this.albumId,
        }
      }).then(response=>{
				this.album = response.data;
				fetchAlbums([this.album])
        console.log(this.album);
        this.getSinger();
      }).catch(response=>{
        console.log(response);
			});
		},
		getSongsInAlbum:function(){
			AXIOS.get('/getSongsInAlbum',{
				params:{
					albumId:this.albumId,
				}
			}).then(response=>{
        this.songs = response.data;
        
			}).catch(response=>{
				console.log(response);
			});
		},
    getSinger:function(){
      console.log(this.album.singerid);
      AXIOS.get('/getSinger',{
        params:{
          singerid:this.album.singerid,
        }
      }).then(response=>{
        console.log(response.data);
        this.singer = response.data;
      }).catch(response=>{
        console.log(response);
      });
		},
	},
  mounted(){
		this.albumId = this.$route.params.albumId;
		this.userId = sessionStorage.getItem("userid");
		this.getAlbumInfo();
		this.getSongsInAlbum();
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
.albumPic{
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
.albumText{
	text-align: left;
}
.albumInfoDisplay
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