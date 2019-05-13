<template>
  <div class="profile_cont">
    <div class="js_sub" id="focus_singer_box" style="display: block;">
      <div class="mod_singer_list mod_singer_list--fans">
        <ul class="singer_list__list">
          <li class="singer_list__item" :key="index" v-for="(u, index) in thisUser">
            <div class="singer_list__item_box">
              <a href="#" class="singer_list__cover js_singer" >
                  <img class="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000001Y2Gbc2Xt1hU.jpg?max_age=2592000" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000';this.error=null;">
              </a>
              <h3 class="singer_list__title">
                <a href="https://y.qq.com/n/yqq/singer/001Y2Gbc2Xt1hU.html" class="js_singer" v-text="u.name"></a>
              </h3>
              <p class="singer_list__info"  th:data-focusnum="${FollowNum.get(iterStat.index)}" th:text="${FollowNum.get(iterStat.index)}+'人已关注'"></p>
                <Button type="primary" :loading="loading[index]" @click="changeFollow(100001, u.id, index)"><Icon type="md-add" :size=15 v-show="!loading[index]"/>添加关注</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: ['type', 'user'],
  name: 'showUser',
  mounted() {
    setTimeout(() => {
      this.user.forEach(u => {
        let idType = this.type == 1? 'userid':'singerid'
        let nameType = this.type == 1? 'username':'singername'
        this.thisUser.push({
          id: u[idType],
          name: u[nameType]
        })
        this.loading.push(false)
      });
    }, 500)
  },
  data() {
    return {
      thisUser: [],
      loading: []
    }
  },
  methods: {
    isFollow(userid, id) {
      if(this.type == 1) {
        this.isFollowUser(userid, id)
      } else {
        this.isFollowSinger(userid, id)
      }
    },
    changeFollow(userid, id, index) {
      this.$set(this.loading, index, true)
      console.log(this.loading)
      if(this.type == 1) {
        this.changeFollowUser(userid, id)
      } else {
        this.changeFollowSinger(userid, id)
      }
    },
    changeFollowUser(userid, id) {

    },
    changeFollowSinger(userid, id) {

    },
    isFollowUser(userid, id) {

    },
    isFollowSinger(userid, id) {

    }
  }
}
</script>

<style scoped>
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


