<template>
  <div class="profile_cont">
    <vue-lazy-component  :timeout="1500">
      <div class="js_sub" style="display: block;" :bordered="false">
        <div class="mod_singer_list mod_singer_list--fans">
          <ul class="singer_list__list">
            <li class="singer_list__item" :key="index" v-for="(u, index) in thisUser">
              <Card class="singer_list__item_box">
                <a  class="singer_list__cover js_singer" @click="type != 1?openSingerDetail(user[index]):''">
                    <img class="singer_list__pic" :src="u.img" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000';this.error=null;">
                </a>
                <h3 class="singer_list__title">
                  <router-link class="js_singer" 
                  :to="type == 1?'/profile/' + u.id + '/mylike':'#'" v-text="u.name" :key="$route.path" @click="type != 1?openSingerDetail(user[index]):''"></router-link>
                </h3>
                <p class="singer_list__info"></p>
                  <Button :type="FollowArr[index] == 1? 'error':'primary'" :loading="loading[index]" @click="changeFollow(me, u.id, index)">
                    <Icon :type="FollowArr[index] == 1? 'md-close':'md-add'" :size=15 v-show="!loading[index]"/>
                    {{FollowArr[index] == 1? '取消关注':'添加关注'}}
                  </Button>
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
  <singer-detail ref="singerDetail"></singer-detail>
  </div>
</template>

<script>
import singerDetail from '@/components/detail/singerDetail'
import {AXIOS} from '@/http/http'
import { setTimeout } from 'timers'
import { fetchSingers } from '@/jsonp/fetchJSONP'
import { changeFollowUser, changeFollowSinger,  isFollowUser, isFollowSinger} from '@/request/follow'
export default {
  components: {
    'singer-detail': singerDetail
  },
  props: ['type', 'user'],
  name: 'showUser',
  mounted() {
    setTimeout(() => {
      this.user.forEach((u, index, input) => {
        let idType = this.type == 1? 'userid':'singerid'
        let nameType = this.type == 1? 'username':'singername'
        let img = this.type == 1? 'userimage':'singerimage'
        this.thisUser.push({
          id: u[idType],
          name: u[nameType],
          img: u[img]
        })
        this.isFollow(this.me, u[idType])
        this.loading.push(false)
      })
      if(this.type != 1) {
        //调用api请求歌手图片
         fetchSingers(this.thisUser)
      }
    }, 500)
  },
  data() {
    return {
      me: sessionStorage.getItem('userid'),
      thisUser: [],
      loading: [],
      FollowArr: []
    }
  },
  methods: {
    openSingerDetail(singer) {
			this.$refs.singerDetail.open(singer)
		},
    isFollow(userid, id) {
      if(this.type == 1) {
        isFollowUser(userid, id, (json) => {
         this.FollowArr.push(json?1:-1)
        })
      } else {
        isFollowSinger(userid, id, (json) => {
         this.FollowArr.push(json?1:-1)
        })
      }
    },
    changeFollow(userid, id, index) {
      this.$set(this.loading, index, true)
      if(this.type == 1) {
        changeFollowUser(userid, id, (json) => {
          this.$set(this.FollowArr, index, -this.FollowArr[index])
          this.$set(this.loading, index, false)
          this.$Notice.success({
							title: json
					})
        })
      } else {
        changeFollowSinger(userid, id, (json) => {
          this.$set(this.FollowArr, index, -this.FollowArr[index])
          this.$set(this.loading, index, false)
          this.$Notice.success({
							title: json
					})
        })
      }
    },
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


