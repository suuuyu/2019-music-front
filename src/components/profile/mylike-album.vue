<template>
 <div class="profile_cont">
    <vue-lazy-component  :timeout="1500">
      <div class="js_sub" style="display: block;" :bordered="false">
        <div class="mod_singer_list mod_singer_list--fans">
          <ul class="singer_list__list">
            <li class="singer_list__item" :key="index" v-for="(u, index) in albums">
              <Card class="singer_list__item_box">
                <a href="#" class="singer_list__cover js_singer" >
                    <img class="singer_list__pic" :src="albumimage.length == 0 ? u.albumimage : albumimage[index]" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000';this.error=null;">
                </a>
                <h3 class="singer_list__title">
                  <router-link class="js_singer" 
                  :to="'/profile/' + u.id + '/mylike'" v-text="u.albumname" :key="$route.path"></router-link>
                </h3>
              </Card>
            </li>
          </ul>
        </div>
      </div>
      <div class="demo-spin-col" slot="skeleton">
      <Spin fix>
          <Icon type="ios-loading" size=25 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
      </Spin>
    </div>
  </vue-lazy-component>
  </div>
</template>

<script>
import {fetchAlbums} from '@/jsonp/fetchJSONP'
import { setTimeout } from 'timers';
export default {
    name: 'mylike-album',
		props: ['albums'],
		data() {
			return {
				albumimage: []
			}
    },
    mounted() {
			setTimeout(() => {
				fetchAlbums(this.albums)
			}, 1000)
		},
    watch: {
      albums() {
        fetchAlbums(this.albums)
        this.albumimage = new Array(this.albums.length)
        setTimeout(() => {
          this.albums.forEach((element, index) => {
          this.$set(this.albumimage, index, element.albumimage );
          console.log(this.albumimage)
        });
        }, 1000);
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
  margin-top: 30px;
	height: 300px;
	position: relative;
	border: 1px solid #eee;
}
a {
    color: #000;
    text-decoration: none;
}
.singer_list__info {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 22px;
    height: 22px;
    color: #999;
}
.singer_list__title {
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 20px 30px 4px;
}
.singer_list__cover, .singer_list__pic {
    display: block;
    width: 140px;
    height: 140px;
    border-radius: 126px;
}
.singer_list__cover {
    margin-left: auto;
    margin-right: auto;
}
.singer_list__item_box {
    position: relative;
    margin-right: 20px;
    background-color: #fbfbfd;
    min-height: 195px;
    padding: 25px 0;
    overflow: hidden;
}
.singer_list__item {
    float: left;
    width: 20%;
    margin-bottom: 20px;
    overflow: hidden;
}
.singer_list__list {
    margin-right: -20px;
    overflow: hidden;
    margin-bottom: -24px;
}
.mod_singer_list {
    padding-top: 50px;
    padding-bottom: 40px;
    overflow: hidden;
    text-align: center;
}
.operate_btn {
    height: 16px;
    position: relative;
    bottom: 1px;
    right: 3px;
}
.btn_focus_fan {
    position: absolute;
    right: 0;
    top: 15px;
    margin-right: 0;
    width: 200px;
}
.mod_btn {
    border: 1px solid #c9c9c9;
    background-color: #FFFFFF;
    color: #000;
}
.mod_btn, .mod_btn_blue {
    border-radius: 2px;
    font-size: 14px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    width: 120px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
}
</style>


