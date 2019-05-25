<template>
  <div style="padding: 10px;">
    <div class="song-list">
      <li style="border-bottom: solid 1px rgba(101, 116, 130,0.3)">歌曲列表</li>
      <li
        v-for="song,index in this.$parent.musicList"
        @mouseenter="highlight"
        @mouseleave="noHighlight"
        class="songInfo"
        :key="song"
      >
        <span
          ref="songInfo"
          style="padding-top:1vh;padding-bottom:1vh;"
          @click="playOne(index)"
        >{{song}}</span>
        <img src="remove.png" width="15vw" height="15vw" @click="remove(index)">
      </li>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      flag: 0
    };
  },
  props: ["currentMusicIndex"],
  mounted() {
    setTimeout(() => {
      this.$refs.songInfo[this.currentMusicIndex].classList.toggle("playing");
      this.$refs.songInfo[this.currentMusicIndex].innerHTML =
        '<marquee scrolldelay="300">' +
        this.$refs.songInfo[this.currentMusicIndex].innerHTML +
        "</marquee>";
    }, 100);
  },
  watch: {
    currentMusicIndex(newVal, oldVal) {
      if (this.flag == 0) {
        this.$refs.songInfo[oldVal].innerHTML = this.$parent.musicList[oldVal];
        this.$refs.songInfo[oldVal].classList.toggle("playing");
        this.$refs.songInfo[newVal].classList.toggle("playing");
        this.$refs.songInfo[newVal].innerHTML =
          '<marquee scrolldelay="300">' +
          this.$refs.songInfo[newVal].innerHTML +
          "</marquee>";
      } else this.flag = 0;
    }
  },
  methods: {
    highlight(event) {
      event.target.className = "highlight";
      event.target.getElementsByTagName("img")[0].style.visibility = "visible";
    },
    noHighlight(event) {
      event.target.className = "songInfo";
      event.target.getElementsByTagName("img")[0].style.visibility = "hidden";
    },
    playOne(index) {
      this.$parent.changeMusic(index);
      this.$parent.currentMusicIndex = index;
    },
    remove(index) {
      this.$parent.musicList.splice(index, 1);
      setTimeout(() => {
        if (this.currentMusicIndex == index) {
          this.$parent.changeMusic(index);
          this.$refs.songInfo[index].classList.toggle("playing");
          this.$refs.songInfo[index].innerHTML =
            '<marquee scrolldelay="300">' +
            this.$refs.songInfo[index].innerHTML +
            "</marquee>";
        } else if (this.currentMusicIndex > index) {
          this.flag = 1;
          this.$parent.currentMusicIndex -= 1;
        }
      });
    }
  }
};
</script>
<style>
.song-list {
  color: rgba(190, 190, 190);
  font-size: 0.8vw;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", "sans-serif";
  vertical-align: center;
}
.song-list span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  height: 4vh;
  width: 6vw;
}
.song-list li {
  text-align: left;
  cursor: pointer;
  height: 4vh;
}
.song-list .songInfo {
  border-bottom: solid 1px rgba(101, 116, 130, 0.3);
}
.song-list img {
  visibility: hidden;
  position: relative;
  left: 6.2vw;
  bottom: 3.2vh;
  cursor: pointer;
}
.highlight {
  color: rgb(255, 255, 255);
  border-bottom: solid 1px rgba(255, 255, 255, 0.8);
}
.playing {
  color: #20a774;
  height: 4vh;
}
marquee {
  height: 2.125vh;
}
</style>
