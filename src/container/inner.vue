<template>
  <div >
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
export default {
  mounted(){
    console.log("Attention! Inner Page!");
    var arr=[{id:-1,name:'Symphony'},{id:-1,name:'七里香'},{id:-1,name:'as if its your last'},{id:-1,name:'残酷月光'},{id:-1,name:'浪费'},{id:-1,name:'kill this love'}]
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
