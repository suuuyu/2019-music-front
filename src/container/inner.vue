<template>
  <div>
    <router-view></router-view>
    <menu-panel></menu-panel>
    <search-btn></search-btn>
    <player ref="player"></player>
  </div>
</template>

<script>

import menuPanel from '../components/panel/navegatorPanel'
import searchBtn from '../components/search/searchBtn'
import { AXIOS } from '@/http/http'
import player from "../components/Player"
import { getSong, getSongsInSonglist } from '@/request/song'
import { async } from 'q';
export default {
  mounted() {
    console.log("Attention! Inner Page!");
    var arr = [
      { id: -1, name: "Symphony" },
      { id: -1, name: "七里香" },
      { id: -1, name: "as if its your last" },
      { id: -1, name: "残酷月光" },
      { id: -1, name: "kill this love" }
    ];
    this.$refs.player.addMusic(arr);
  },
  components: {
    "menu-panel": menuPanel,
    "search-btn": searchBtn,
    player: player
  },
  name: "inner",
  data() {
    return {
      inner: 1,
      a: 1,
      b: 1,
      c: 1
    };
  },
  methods: {
    addSong(songid) {
      getSong(songid, (json) => {
        this.isBought(json, isBought => {
          if (isBought) {
            this.$refs.player.addMusic({
              id: songid,
              name: json.songname
            })
            this.$Notice.success({
              title: '歌曲成功添加到播放列表'
            })
          } else {
            this.$Notice.error({
                title: '播放失败',
                desc: `歌曲 ${json.songname}为付费歌曲，您当前不是会员或未付费购买，暂无法播放，已自动跳过`
              });
          }
        })
      })
    },
    addSonglist(songlistid) {
      getSongsInSonglist(songlistid, (json) => {
        let arr = []
        json.forEach(s => {
          this.isBought(s, (isBought) => {
            if (isBought) {
              arr.push({
              id: s.songid,
              name: s.songname
              })
            } else {
              this.$Notice.error({
                title: '播放失败',
                desc: `歌曲 ${s.songname}为付费歌曲，您当前不是会员或未付费购买，暂无法播放，已自动跳过`
              });
            }
          })
        });
        this.$refs.player.addMusic(arr)
        this.$Notice.success({
            title: '歌单中歌曲添加完毕'
        });
      })
    },
    isBought(song, callback){
			if(song.free=='1'){
        callback(true)
				return
			} else {
        AXIOS.get('/isSongBought',{params:{songid: song.id, albumid: song.albumid, userid:sessionStorage.getItem("userid")}})
        .then((response)=>{
          const result =  response.data=='1' ? true : false
          callback(result)
        })
        .catch(error => {
          this.$Notice.error({
            title: error
          });
          callback(false)
        })
			}
		}
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 50px;
}
</style>
