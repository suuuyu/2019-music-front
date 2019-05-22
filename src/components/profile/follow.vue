<template>
  <div>
    <Tabs value="user" @on-click="handle">
      <TabPane label="用户" name="user"><show-user :type='1' :user='friends'></show-user> </TabPane>
      <TabPane label="歌手" name="singer" class="real-panel"><show-user :type='2' :user='followSingers'></show-user></TabPane>
    </Tabs>
  </div>
</template>

<script>
import showUser from '../panel/showUser'
export default {
  props: ['fans', 'friends', 'followSingers'],
  components: {
    'show-user': showUser,
  },
  name: 'follow',
  data() {
    return {
    }
  },
  methods: {
    handle() {

    }
  }
}
</script>

<style scoped>
.real-panel {
	margin-bottom: 30px;
}
</style>


