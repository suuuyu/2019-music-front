<template>
  <Modal v-model="show" :styles="{top: '20px'}">
    <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>选择想加入的歌单</span>
    </p>
    <div style="text-align:center" class="content">
        <Card :key="index" v-for="(s, index) in mySonglist">
            <div style="text-align:center" @click="keepSong(songid, s.songlistid)">
              <p>{{s.songlistname}}</p>
            </div>
        </Card>
    </div>
    <div slot="footer">
        <Button type="success" size="large" long @click="toEdit=true" v-if="!toEdit">新建歌单</Button>
        <Row v-if="toEdit">
          <Col span="18"><Input v-model="songlistName" v-if="toEdit" placeholder="请输入新歌单的名字"></Input></Col>
          <Col span="3"><Button type="success" @click="createSonglist" ><span>确定</span></Button></Col>
          <Col span="3"><Button @click="cancelEdit">取消</Button></Col>
        </Row>
    </div>
  </Modal>
</template>

<script>
import {showCreatedSongList, keepSong, createSonglist} from '@/request/song'
export default {
  name: 'songlistChoose',
  props:['chooseList', 'songid', 'mySonglist'],
  data() {
    return {
      toEdit: false,
      songlistName: '',
      show: false
    }
  },
  methods: {
    toShow() {
      this.show = true
    },
    createSonglist() {
				createSonglist(sessionStorage.getItem('userid'), this.songlistName, json => {
					this.$Notice.success({
						title: json
					})
					this.cancelEdit()
					this.toChoose(this.songid)
				})
			},
			cancelEdit() {
				this.songlistName = ''
				this.toEdit = false
			},
			keepSong(songid, songlistid){
				keepSong(songid, songlistid, json => {
					if(json.success){
						this.$Notice.success({
							title: json.errorMsg
						})
						this.chooseList = false
					} else {
						this.$Notice.error({
							title: json.errorMsg
						})
					}
					
				})
			},
			toChoose(id) {
				showCreatedSongList(sessionStorage.getItem('userid'), json => {
					this.mySonglist = json
				})
			}
  }
}
</script>

<style scoped>
.content {
  max-height: 500px;
  overflow:scroll;
}
</style>


