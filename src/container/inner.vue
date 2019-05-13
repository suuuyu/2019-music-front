<template>
  <div class="container">
    <router-view></router-view>
    <menu-panel></menu-panel>
  </div>
</template>

<script>
import menuPanel from '../components/panel/navegatorPanel'
export default {
  mounted(){
    console.log("Attention! Inner Page!");
  },
  components: {
    'menu-panel': menuPanel
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
