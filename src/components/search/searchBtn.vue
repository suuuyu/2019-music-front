<style scoped>
.search {
  position: fixed;
  top: 8%;
  left: 30px;
}
.search-box {
  position: fixed;
  top: 8%;
  left: 30px;
  /* transform: translate(-100%, 0%); */
  background: #ffffff;
  /* height: 40px; */
  border-radius: 40px;
  padding: 10px;
  box-shadow: 0px 0px 1.5px #888888;
}
.search-btn {
  color: #605eee;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  text-decoration: none;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #605eee;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0;
}
.search-box:hover > .search-txt {
  width: 240px;
  /* padding: 0 6px; */
}
.search-box:hover > .search-btn {
  background: #dee8eb;
}

.active {
  width: 240px;
}
.search-list {
  position: relative;
  left: 0.8vw;
  top: 7vh;
  text-align: left;
  cursor: pointer;
  height: 4vh;
}
.search-res {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  height: 4vh;
  width: 25vw;
}
.highlight {
  color: rgb(255, 255, 255);
}
.ivu-message{
  z-index: 100;
}
</style>


<template>
  <div class="search">
    <div class="search-box">
      <a class="search-btn" href="#">
        <i class="ivu-icon ivu-icon-ios-search" style="font-size: 20px;"></i>
      </a>
      <input
        class="search-txt"
        type="text"
        placeholder="Type to search"
        v-model="inputValue"
        :class="{ 'active': active }"
      >
    </div>
    <div class="search-list">
      <ul>
        <li
          @mouseenter="highlightTxt"
          @mouseleave="highlightTxt"
          @click="addMusic(song)"
          class="search-res"
          v-for="song,index in searchList"
          :key="index"
        >{{song.SONGNAME + "-" + song.ARTIST}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import $axios from "axios";
import { async } from "q";
export default {
  data() {
    return {
      inputValue: "",
      active: false,
      searchList: [],
      idList: [],
      cancel: null,
      timer: []
    };
  },
  watch: {
    inputValue() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.inputValue !== "") {
        this.active = true;
        this.timer = setTimeout(() => {
          this.searchSongs(this.inputValue);
        }, 300);
      } else {
        this.active = false;
        if (this.cancel) {
          this.cancel();
        }
        this.searchList = [];
        this.idList = [];
      }
    }
  },
  methods: {
    async addMusic(song) {
      var music = await this.musicFactory.createMusic(song.MP3RID.slice(4, song.MP3RID.length), song.SONGNAME);
      for (var i in this.$parent.musicList)
        if (this.$parent.musicList[i].id == music.id) {
          this.$Message.info("已经存在该音乐！");
          return;
        }
      this.$parent.addMusic(music);
      this.$parent.tempSong=song
    },
    highlightTxt(event) {
      event.target.classList.toggle("highlight");
    },
    searchSongs(inputValue) {
      if (this.cancel) {
        this.cancel();
      }
      var _this = this;
      let CancelToken = $axios.CancelToken;
      try {
        $axios({
          method: "get",
          url:
            "https://v1.itooi.cn/kuwo/search?type=song&pageSize=100&page=0&keyword=" +
            inputValue,
          data: {},
          cancelToken: new CancelToken(c => {
            this.cancel = c;
          })
        })
          .then(function(response) {
            _this.searchList = [];
            _this.idList = [];
            _this.searchList = response.data.data.slice(0, 10);
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (err) {
        alert("服务器出错");
        console.log(err);
      }
    }
  }
};
</script>

