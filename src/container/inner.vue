<template>
  <div >
    <router-view></router-view>
    <menu-panel></menu-panel>
    <search-btn></search-btn>
    <player style="top:10px;" ref="player"></player>
  </div>
</template>

<script>
import menuPanel from '../components/panel/navegatorPanel'
import searchBtn from '../components/search/searchBtn'
import player from "../components/Player"
export default {
  mounted(){
    console.log("Attention! Inner Page!");
    var arr=['素颜','七里香']
    this.$refs.player.addMusic(arr)
  },
  components: {
    'menu-panel': menuPanel,
    'search-btn': searchBtn,
    'player': player
  },
  name: 'inner',
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.container{
  height:100%;
}
</style>
