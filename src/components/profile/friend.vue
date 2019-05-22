<template>
  <div>
    <show-user :type='1' :user='fans'></show-user>
  </div>
</template>

<script>
import showUser from '../panel/showUser'
export default {
  props: ['fans'],
  components: {
    'show-user': showUser,
  },
  name: 'friend',
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


