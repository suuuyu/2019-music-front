<template>
  <div style="padding: 10px;">
    <div class="song-list">
      <span style="border-bottom: solid 1px rgba(101, 116, 130,0.3)">歌曲列表</span>
      <li
        v-for="song,index in this.$parent.musicList"
        @mouseenter="highlight"
        @mouseleave="noHighlight"
        class="songInfo"
      >
        <span
          ref="songInfo"
          style="padding-top:1vh;padding-bottom:1vh;"
          @click="playOne(index)"
        >{{song}}</span>
      </li>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {};
  },
  props: ["currentMusicIndex"],
  mounted() {
    setTimeout(() => {
      this.$refs.songInfo[this.currentMusicIndex].style.color = "#20a774";
      console.log(this.$refs.songInfo[this.currentMusicIndex].innerHTML);
      this.$refs.songInfo[this.currentMusicIndex].innerHTML =
        '<marquee scrolldelay="300">' +
        this.$refs.songInfo[this.currentMusicIndex].innerHTML +
        "</marquee>";
    }, 100);
  },
  watch: {
    currentMusicIndex(newVal, oldVal) {
      this.$refs.songInfo[oldVal].innerHTML = this.$parent.musicList[oldVal];
      this.$refs.songInfo[oldVal].style.color = "rgba(190, 190, 190)";
      this.$refs.songInfo[newVal].style.color = "#20a774";
      this.$refs.songInfo[newVal].innerHTML =
        '<marquee scrolldelay="300">' +
        this.$refs.songInfo[newVal].innerHTML +
        "</marquee>";
    }
  },
  methods: {
    highlight(event) {
      event.target.className = "highlight";
    },
    noHighlight(event) {
      event.target.className = "songInfo";
    },
    playOne(index) {
      this.$parent.changeMusic(index);
      this.$parent.currentMusicIndex = index;
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
}
.song-list li {
  text-align: left;
  cursor: pointer;
  height: 4vh;
}
.song-list .songInfo {
  border-bottom: solid 1px rgba(101, 116, 130, 0.3);
}
.highlight {
  color: rgb(255, 255, 255);
  border-bottom: solid 1px rgba(212, 226, 240, 0.8);
}
</style>
