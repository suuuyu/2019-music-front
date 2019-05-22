<template>
  <div class="created-panel">
    <Songlist :songlist=createdSonglist></Songlist>
  </div>
</template>

<script>
import mylikesonglist from './mylike-songlist'
import {showCreatedSongList} from '@/request/song'
export default {
  name: 'myCreated',
  components: {
    'Songlist': mylikesonglist,
  },
  props: ['userid'],
  mounted() {
    this.getSonglist(this.userid)
  },
  data() {
    return {
      createdSonglist: []
    }
  },
  methods: {
    getSonglist(userid) {
      showCreatedSongList(userid, json=> {
        this.createdSonglist = json
      })
    }
  }
}
</script>

<style scoped>
.created-panel {
  margin-top: 30px;
}
</style>

