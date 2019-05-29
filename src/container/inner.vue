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
import player from "../components/Player"
import { getSong, getSongsInSonglist } from '@/request/song'
export default {
  mounted(){
    console.log("Attention! Inner Page!");
    // this.$refs.player.addMusic(arr)
  },
  components: {
    'menu-panel': menuPanel,
    'search-btn': searchBtn,
    'player': player
  },
  name: 'inner',
  data(){
    return{
      inner: 1,
      a: 1,
      b: 1,
      c: 1
    }
  },
  methods: {
    addSong(songid) {
      getSong(songid, (json) => {
        this.$refs.player.addMusic(json.songname)
      })
    },
    addSonglist(songlistid) {
      console.log(songlistid)
      getSongsInSonglist(songlistid, (json) => {
        console.log(json)
        let arr = []
        json.forEach(s => {
          arr.push(s.songname)
        });
        this.$refs.player.addMusic(arr)
      })
    }
  }
}
</script>

<style scoped>
.container{
  margin-bottom: 50px;
}
</style>
