<template>
  <div>
    <div class="detail-contain">
    <vue-lazy-component :timeout="3000">
      <Table stripe  :columns="columns" :data="songlist">
          <template slot-scope="{ row }" slot="songlistname">
              <strong><a class="panel-word">{{ row.songlistname }}</a></strong>
          </template>
          <template slot-scope="{ row }" slot="menuBar">
              <strong>
                  <songPanel :songid="row.songlistid" class="panel"></songPanel>
              </strong>
          </template>
          <template slot-scope="{ row }" slot="songnum">
              <strong><a class="panel-word">{{  }}</a></strong>
          </template>
          <template slot-scope="{ row }" slot="username">
              <strong><a class="panel-word">{{  }}</a></strong>
          </template>
          <template slot-scope="{ row }" slot="keepnum">
              <strong><span class="panel-word">{{  }}</span></strong>
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
import songPanel from '../panel/songPanel'
export default {
  components: {
      'songPanel': songPanel
    },
  props: ['songlist'],
  name: 'mylike-songlist',
  data() {
    return {
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
  },
  methods: {

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
</style>


