<template>
  <div>
    <div class="detail-contain">
    <vue-lazy-component :timeout="3000">
      <Table stripe  :columns="columns" :data="songlist">
          <template slot-scope="{ row }" slot="songlistname">
              <strong><router-link class="panel-word" :to="'/songList/' + row.songlistid" :key="$route.path">{{ row.songlistname }}</router-link></strong>
          </template>
          <template slot-scope="{ row }" slot="menuBar">
              <strong>
                  <songPanel :songid="row.songlistid" :type="2" class="panel"></songPanel>
              </strong>
          </template>
          <template slot-scope="{ row, index }" slot="songnum">
              <strong><span class="panel-word">{{ songnum[index] }}</span></strong>
          </template>
          <template slot-scope="{ row, index }" slot="username">
              <strong><router-link class="panel-word" 
                  :to="'/profile/' + creater[index].userid + '/mylike'" :key="creater[index].userid">{{ creater[index].username }}</router-link></strong>
          </template>
          <template slot-scope="{ row, index }" slot="keepnum">
              <strong><span class="panel-word">{{ keepnum[index] }}</span></strong>
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
  </div>
</template>

<script>
import {AXIOS} from '@/http/http'
import songPanel from '../panel/songPanel'
import { setTimeout } from 'timers';
export default {
  components: {
      'songPanel': songPanel
    },
  props: ['songlist'],
  name: 'mylike-songlist',
  mounted () {
    this.$Loading.start();
    console.log('list-created')
    setTimeout(() => {
      console.log(this.songlist)
      for(let i=0; i<this.songlist.length; i++) {
      this.buildSongnum(this.songlist[i], i)
      this.buildKeepnum(this.songlist[i], i)
      this.buildCreator(this.songlist[i], i)
    }
    }, 1000)
    setTimeout(() => {
      this.$Loading.finish();
    }, 1500)
  },
  methods: {
    buildSongnum(songlist, i) {
      this.getSongnum(songlist.songlistid, (json) => {
        this.$set(this.songnum,i,json)
        // songlist.songnum = json
      })
    },
    buildKeepnum(songlist, i) {
      this.getSongnum(songlist.songlistid, (json) => {
        this.$set(this.keepnum,i,json)
        // songlist.keepnum = json
      })
    },
    buildCreator(songlist, i) {
      this.getUser(songlist.userid, (json) => {
        this.$set(this.creater,i,json)
        // songlist.creater = json
      })
    },
    getSongnum(songlistid, callback) {
      AXIOS.get('/getNumOfSongList?songlistid=' + songlistid)
      .then(respond => {
        callback(respond.data)
      })
      .catch(error => {
        this.$Loading.error();
        this.$Notice.error({
            title: '获取歌曲数目出错',
            desc: error ? error : '未知错误'
        })
      })
    },
    getKeepnum(songlistid, callback) {
      AXIOS.get('/getSongListSavedNum?songlistid=' + songlistid)
      .then(respond => {
        callback(respond.data)
      })
      .catch(error => {
        this.$Loading.error();
        this.$Notice.error({
            title: '获取歌曲收藏出错',
            desc: error ? error : '未知错误'
        })
      })
    },
    getUser(id, callback) {
      AXIOS.get('/getUser?id=' + id)
      .then(respond => {
        callback(respond.data)
      })
      .catch(error => {
        this.$Loading.error();
        this.$Notice.error({
            title: '获取创建人出错',
            desc: error ? error : '未知错误'
        })
      })
    },
    getName(name) {
      console.log(name)
      return name
    }
  },
  data() {
    return {
      songnum: [],
      keepnum: [],
      creater: [],
      columns:[
					{
						title: '歌单',
						width: 200,
						slot: 'songlistname'
					},
					{
						title: ' ',
						width: 400,
						slot: 'menuBar',
					},
					{
						title: '曲目数',
						slot: 'songnum',
					},
					{
						title: '创建人',
						slot: 'username',
					},
					{
						title: '收藏数',
						slot: 'keepnum',
					}
				],
    }
  }
}
</script>

<style scoped>
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
a {
  color: black
}
</style>


