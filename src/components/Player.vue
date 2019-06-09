<template>
  <div
    ref="main"
    style="position:fixed; left:3vw; bottom:0vh; width:100%; height:6vh; z-index:1099;"
  >
    <div style="position:absolute;">
      <search-btn style="z-index:10;"></search-btn>
      <div v-if="isMax" class="arrowDown">
        <img
          ref="arrowDown"
          src="arrowDown.png"
          width="50vw"
          height="50vw"
          @click="changeMini"
          @mouseenter="highlightArrDown"
          @mouseleave="noLightArrDown"
        >
        <img
          ref="addMusicBtn"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYwMDEzMjA0NDg1IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU1OTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEwLjIxODI0IDBDMjI4LjkwNDk2IDAgMCAyMjkuMTA5NzYgMCA1MTAuNTc2NjQgMCA3OTIuMDY0IDIyOC45MDQ5NiAxMDIxLjA4MTYgNTEwLjIxODI0IDEwMjEuMDgxNmMyODEuMzAzMDQgMCA1MTAuMTU2OC0yMjkuMDE3NiA1MTAuMTU2OC01MTAuNTA0OTZDMTAyMC4zNzUwNCAyMjkuMTA5NzYgNzkxLjUyMTI4IDAgNTEwLjIxODI0IDB6IG0xOTIuMzk5MzYgNTQ1LjYxNzkySDU0Ni40ODgzMnYxNTcuNTkzNmMwIDE0Ljc0NTYtMjEuMDEyNDggMjYuOTAwNDgtMzUuODYwNDggMjYuOTAwNDgtMTQuODQ4IDAtMzUuODI5NzYtMTIuMTU0ODgtMzUuODI5NzYtMjYuOTAwNDh2LTE1Ny41OTM2aC0xNTcuMDgxNmMtMTQuNzk2OCAwLTI2Ljg2OTc2LTIxLjAzMjk2LTI2Ljg2OTc2LTM1Ljg3MDcyIDAtMTQuODM3NzYgMTIuMDYyNzItMzUuOTExNjggMjYuODY5NzYtMzUuOTExNjhoMTU3LjA4MTZWMzE4LjAxMzQ0YzAtMTQuOTI5OTIgMjAuOTgxNzYtMjYuOTUxNjggMzUuODI5NzYtMjYuOTUxNjggMTQuODQ4IDAgMzUuODYwNDggMTIuMDIxNzYgMzUuODYwNDggMjYuOTUxNjh2MTU1LjgzMjMyaDE1Ni4xMjkyOGMxNC45ODExMiAwIDI2LjkyMDk2IDIxLjA3MzkyIDI2LjkyMDk2IDM1LjkxMTY4IDAgMTQuODI3NTItMTIuMDIxNzYgMzUuODYwNDgtMjYuOTIwOTYgMzUuODYwNDh6IiBmaWxsPSIjZjY2ZjQ5IiBwLWlkPSI1NTk0Ij48L3BhdGg+PC9zdmc+"
          width="50vw"
          height="50vw"
          @click="addsong"
        >
      </div>
      <div class="bg" v-show="isMax">
        <img ref="bg">
      </div>
      <div class="lrc" ref="lrc" v-show="isMax">
        <ul ref="gc" class="gc">
          <li v-for="one,index in lrcList" ref="oneLrc">{{one}}</li>
        </ul>
      </div>
      <div class="audio green-audio-player" ref="audioPlayer" @mousedown="tryDragging">
        <div class="miniBg" v-show="!isMax">
          <img ref="miniBg">
        </div>
        <div class="lastSong">
          <img
            ref="lastSong"
            @click="playLast"
            @mouseenter="highlightLast"
            @mouseleave="noLightLast"
            width="30"
            height="30"
            src="last.png"
          >
        </div>
        <div class="loading" v-show="!hasMusic">
          <img class="spinner" width="2vw" height="2vw" src="loading.png">
        </div>
        <div class="play-pause-btn" v-show="hasMusic">
          <img
            @click="togglePlay"
            @mouseenter="highlightPlay"
            @mouseleave="noLightPlay"
            width="30"
            height="30"
            src="play.png"
            class="play-pause-icon"
            ref="playPause"
          >
        </div>
        <div class="nextSong">
          <img
            ref="nextSong"
            @click="playNext"
            @mouseenter="highlightNext"
            @mouseleave="noLightNext"
            width="30"
            height="30"
            src="next.png"
          >
        </div>
        <div class="controls">
          <span ref="currentTime" class="current-time" style="color:#D6D8D4">0:00</span>
          <div class="slider" data-direction="horizontal">
            <div class="progress" ref="progress">
              <div class="pin" id="progress-pin" data-method="rewind"></div>
            </div>
          </div>
          <span ref="totalTime" class="total-time" style="color:#D6D8D4">0:00</span>
        </div>
        <div id="playMode" class="playMode">
          <img
            ref="playModeIcon"
            width="30"
            height="30"
            :src="playModeSrc[playMode]"
            @click="changeMode"
            @mouseenter="highlightMode"
            @mouseleave="noLightMode"
          >
        </div>
        <div id="like" class="like">
          <img
            data-state="0"
            id="likeIcon"
            onclick="favoriteSong(player.dataset.id)"
            width="30"
            height="30"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDk0MDkzMTk3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjgxMCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik03MjguMTc3Nzc4IDExMy43Nzc3NzhjLTEzMC44NDQ0NDQgMC0yMTAuNDg4ODg5IDEwMi40LTIxMC40ODg4ODkgMTAyLjRTNDQ5LjQyMjIyMiAxMTMuNzc3Nzc4IDMwNy4yIDExMy43Nzc3NzggNTYuODg4ODg5IDE5My40MjIyMjIgNTYuODg4ODg5IDM4Ni44NDQ0NDRjMCAyNzMuMDY2NjY3IDQ2MC44IDU2OC44ODg4ODkgNDYwLjggNTY4Ljg4ODg4OVM5NjcuMTExMTExIDY0Mi44NDQ0NDQgOTY3LjExMTExMSAzOTIuNTMzMzMzQzk2Ny4xMTExMTEgMTg3LjczMzMzMyA4MzYuMjY2NjY3IDExMy43Nzc3NzggNzI4LjE3Nzc3OCAxMTMuNzc3Nzc4TTUxNy42ODg4ODkgODg3LjQ2NjY2N1MxMTMuNzc3Nzc4IDYwOC43MTExMTEgMTEzLjc3Nzc3OCAzODYuODQ0NDQ0YzAtMTQyLjIyMjIyMiA5Ni43MTExMTEtMjIxLjg2NjY2NyAyMDQuOC0yMjEuODY2NjY2QzQyNi42NjY2NjcgMTY0Ljk3Nzc3OCA1MTcuNjg4ODg5IDI4NC40NDQ0NDQgNTE3LjY4ODg4OSAyODQuNDQ0NDQ0czEwOC4wODg4ODktMTE5LjQ2NjY2NyAyMDQuOC0xMTkuNDY2NjY2Yzk2LjcxMTExMSAwIDE5My40MjIyMjIgNzMuOTU1NTU2IDE5My40MjIyMjIgMjI3LjU1NTU1NS01LjY4ODg4OSAyMTYuMTc3Nzc4LTM5OC4yMjIyMjIgNDk0LjkzMzMzMy0zOTguMjIyMjIyIDQ5NC45MzMzMzQiIGZpbGw9IiNENkQ4RDQiIHAtaWQ9IjgxMSI+PC9wYXRoPjwvc3ZnPg=="
          >
        </div>
        <div class="volume">
          <div class="volume-controls hidden" ref="volumeControls">
            <div class="slider" data-direction="vertical">
              <div class="progress" ref="volumeProgress">
                <div class="pin" id="volume-pin" data-method="changeVolume"></div>
              </div>
            </div>
          </div>
          <div
            class="volume-btn"
            ref="volumeBtn"
            @click="volumeBtnClick"
            @mouseenter="highlightVolume"
            @mouseleave="noLightVolume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#DBDBDB"
                fill-rule="evenodd"
                d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z"
                ref="speaker"
              ></path>
            </svg>
          </div>
        </div>
        <div style="position:absolute">
          <songlist
            ref="songList"
            v-if="hasList"
            class="songlist"
            :currentMusicIndex="currentMusicIndex"
          ></songlist>
        </div>
        <div id="lisyBtn" class="listBtn">
          <img
            ref="listIcon"
            @mouseenter="highlightList"
            @mouseleave="noLightList"
            @click="showList"
            width="33"
            height="33"
            src="musicList.png"
          >
        </div>
        <audio
          crossorigin="anonymous"
          ref="audio"
          @timeupdate="updateProgress"
          @canplay="makePlay"
          @volumechange="updateVolume"
          @loadedmetadata="loadMusic"
          @ended="playNext"
          @error="loadErr"
        >
          <source :src="currentSrc" type="audio/mpeg">
        </audio>
        <div v-if="!isMax" style="margin-left:2.2vw;" class="arrowUp">
          <img
            ref="arrowUp"
            src="arrowUp.png"
            width="35vw"
            height="35vw"
            @click="changeMini"
            @mouseenter="highlightArrUp"
            @mouseleave="noLightArrUp"
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { AXIOS } from "@/http/http";
import $axios from "axios";
import songlist from "./songList";
import { setTimeout } from "timers";
import { truncate } from "fs";
import searchBtn from "../components/search/searchBtn";
import { constants } from "crypto";
export default {
  data() {
    return {
      tempSong: null,
      isMax: true,
      hasList: false,
      musicList: [],
      singerList: [],
      currentMusicID: 0,
      currentMusicIndex: -1,
      currentSrc: "",
      hasMusic: 1,
      player: NaN,
      playPause: NaN,
      volumeBtn: NaN,
      volumeControls: NaN,
      volumeProgress: NaN,
      speaker: NaN,
      currentlyDragged: null,
      draggableClasses: ["pin"],
      lrcList: [],
      playMode: 0,
      playModeSrc: [
        "oneByOne.png",
        "oneByOneH.png",
        "random.png",
        "randomH.png",
        "onlyOne.png",
        "onlyOneH.png"
      ],
      cancel: null,
      randomList: [],
      randomIndex: -1
    };
  },
  //props:['musicList'],
  created() {},
  components: {
    songlist,
    "search-btn": searchBtn
  },
  mounted() {
    var _this = this;
    this.currentMusicIndex = -1;
    this.player = this.$refs.audio;
    this.playPause = this.$refs.playPause;
    this.volumeBtn = this.$refs.volumeBtn;
    this.volumeControls = this.$refs.volumeControls;
    this.volumeProgress = this.$refs.volumeProgress;
    this.speaker = this.$refs.speaker;
    window["rewind"] = this.rewind;
    window["changeVolume"] = this.changeVolume;
    //this.musicList=this.$route.query.musicList
    if (this.musicList.length > 0) {
      this.changeMusic(0);
    } else {
      this.$refs.bg.src = "logo.png";
      this.$refs.miniBg.src = "logo.png";
    }
    this.changeMini();
    //this.changeMini();
  },
  watch: {
    musicList(newVal, oldVal) {
      if (this.playMode == 2 || this.playMode == 3) {
        if (newVal.length > oldVal.length) {
          //新增操作
          var newArr;
          if (this.randomIndex + 1 < this.randomList.length) {
            newArr = newVal
              .concat(oldVal)
              .filter(v => newVal.includes(v) && !oldVal.includes(v))
              .concat(
                this.randomList.slice(
                  this.randomIndex + 1,
                  this.randomList.length
                )
              );
            this.randomList.splice(this.randomIndex + 1);
          } else
            newArr = newVal
              .concat(oldVal)
              .filter(v => newVal.includes(v) && !oldVal.includes(v));
          this.randomList = this.randomList.concat(this.shuffer(newArr));
          for (var i in this.randomList) console.log(this.randomList[i].name);
        } else {
          //随机列表移除操作
          var removedSong = oldVal
            .concat(newVal)
            .filter(v => oldVal.includes(v) && !newVal.includes(v))[0];
          var removedIndex = this.randomList.indexOf(removedSong);
          //从随机列表中移除
          this.randomList = this.randomList
            .concat([removedSong])
            .filter(
              v => this.randomList.includes(v) && ![removedSong].includes(v)
            );
          if (this.currentMusicIndex == oldVal.indexOf(removedSong)) {
            if (this.randomIndex == this.randomList.length) {
              //如果恰好是随机列表最后一首
              this.randomIndex = 0;
              this.changeMusic(
                this.musicList.indexOf(this.randomList[this.randomIndex])
              );
              if (this.currentMusicIndex > -1)
                //防止传-1过去
                this.$refs.songList.musicGo(this.currentMusicIndex);
              return;
            }
            //让下一首播放
            if (this.musicList.length != 0) {
              this.changeMusic(
                this.musicList.indexOf(this.randomList[this.randomIndex])
              );
              this.$refs.songList.musicGo(this.currentMusicIndex);
            } else {
              this.playNext();
            }
          } else if (this.randomIndex > removedIndex) {
            this.randomIndex -= 1;
            if (this.currentMusicIndex > oldVal.indexOf(removedSong)) {
              this.$refs.songList.flag = 1; //不许watch函数触发
              this.currentMusicIndex -= 1;
            }
          } else if (this.randomIndex < removedIndex) {
            if (this.currentMusicIndex > oldVal.indexOf(removedSong)) {
              this.$refs.songList.flag = 1; //不许watch函数触发
              this.currentMusicIndex -= 1;
            }
          }
        }
      } else {
        //顺序列表移除操作
        if (newVal.length < oldVal.length) {
          var removedSong = oldVal
            .concat(newVal)
            .filter(v => oldVal.includes(v) && !newVal.includes(v))[0];
          if (this.currentMusicIndex == oldVal.indexOf(removedSong)) {
            if (this.currentMusicIndex == this.musicList.length) {
              //如果恰好是顺序列表最后一首
              this.changeMusic(0);
              return;
            }
            //让下一首播放
            if (this.musicList.length != 0) {
              this.changeMusic(this.currentMusicIndex);
              this.$refs.songList.musicGo(this.currentMusicIndex);
            } else {
              this.playNext();
            }
          } else if (this.currentMusicIndex > oldVal.indexOf(removedSong)) {
            this.$refs.songList.flag = 1; //不许watch函数触发
            this.currentMusicIndex -= 1;
          }
        }
      }
    }
  },
  methods: {
    addsong() {
      if (this.tempSong != null) {
        AXIOS.post(
          "/addSearchSong",
          this.$qs.stringify({
            "songID":this.tempSong.MP3RID.slice(4, this.tempSong.MP3RID.length),
            "path":
              "https://v1.itooi.cn/kuwo/url?quality=128&id=" +
              this.tempSong.MP3RID.slice(4, this.tempSong.MP3RID.length),
            "name": this.tempSong.SONGNAME,
            "image": "https://v1.itooi.cn/kuwo/pic?id="+this.tempSong.MP3RID.slice(4, this.tempSong.MP3RID.length),
            "length": this.tempSong.DURATION,
            "albumID":this.tempSong.ALBUMID,
            "albumName":this.tempSong.ALBUM,
            "singer": this.tempSong.ARTIST,
            "lrc":"https://v1.itooi.cn/kuwo/lrc?id="+this.tempSong.MP3RID.slice(4, this.tempSong.MP3RID.length),
            "singerID":this.tempSong.ARTISTID
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
          .then(response => {
            console.log(response);
            }
          )
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$Message.info("出问题了");
      }
    },
    addMusic(arr) {
      if (this.musicList.length == 0) {
        this.musicList = this.musicList.concat(arr);
        if (this.musicList.length > 0) this.changeMusic(0);
      } else {
        this.musicList = this.musicList.concat(arr);
      }
    },
    changeMini() {
      if (this.isMax) {
        this.isMax = false;
        this.$refs.main.style =
          "position:fixed; left:3vw; bottom:0vh; width:100%; height:6vh; z-index:1099;";
      } else {
        this.isMax = true;
        this.$refs.main.style =
          "position:fixed; left:3vw; top:-5vh; width:100%; height:117vh; z-index:1099;";
      }
    },
    loadMusic() {
      var _this = this;
      _this.hasMusic = 1;
      this.$refs.totalTime.textContent = this.formatTime(this.player.duration);
      this.togglePlay();
      this.$refs.playPause.src = "pause.png";
      this.$refs.bg.src =
        "https://v1.itooi.cn/kuwo/pic?id=" + this.currentMusicID;
      this.$refs.miniBg.src =
        "https://v1.itooi.cn/kuwo/pic?id=" + this.currentMusicID;
      $axios({
        method: "get",
        url: "https://v1.itooi.cn/kuwo/lrc?id=" + this.currentMusicID,
        data: {}
      })
        .then(function(response) {
          var lrc = response.data;
          var str = _this.parseLyric(lrc);
          _this.lrcList = [""];
          for (var i = 0, li; i < str.length; i++) {
            _this.lrcList.push(str[i][1]);
          }
          _this.$refs.lrc.scrollTop = 0;

          _this.player.ontimeupdate = function() {
            var i = 0;
            var l;
            for (
              i, l = str.length;
              i < l;
              i++ //判断到第i句歌词 对应下标为i的li标签
            ) {
              if (_this.player.currentTime < str[i][0]) break;
            }
            for (var j = 0, k = _this.$refs.oneLrc.length; j < k; j++)
              if (_this.$refs.oneLrc[j] != null)
                _this.$refs.oneLrc[j].style.color = "#D6D8D4";
            if (_this.$refs.oneLrc[i] != null)
              _this.$refs.oneLrc[i].style.color = "#20A774";
            if (i > 8) {
              _this.$refs.lrc.scrollTop = _this.$refs.oneLrc[i].offsetTop - 216;
            }
          };
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeMode() {
      this.playMode += 2;
      if (this.playMode >= this.playModeSrc.length) this.playMode = 1;
      if (this.playMode == 2 || this.playMode == 3) {
        //如果是随机播放
        this.randomList = this.shuffer(this.musicList);
        this.randomIndex = this.randomList.indexOf(
          this.musicList[this.currentMusicIndex]
        );
        for (var i in this.randomList) console.log(this.randomList[i].name);
      }
    },
    highlightMode() {
      this.playMode += 1;
    },
    noLightMode() {
      this.playMode -= 1;
    },
    loadErr() {
      if (this.musicList.length != 0) this.hasMusic = 0;
    },
    highlightLast() {
      this.$refs.lastSong.src = "lastH.png";
    },
    noLightLast() {
      this.$refs.lastSong.src = "last.png";
    },
    highlightNext() {
      this.$refs.nextSong.src = "nextH.png";
    },
    noLightNext() {
      this.$refs.nextSong.src = "next.png";
    },
    highlightPlay() {
      if (this.player.paused) this.$refs.playPause.src = "playH.png";
      else this.$refs.playPause.src = "pauseH.png";
    },
    noLightPlay() {
      if (this.player.paused) this.$refs.playPause.src = "play.png";
      else this.$refs.playPause.src = "pause.png";
    },
    highlightList() {
      if (!this.hasList) this.$refs.listIcon.src = "musicListH.png";
    },
    noLightList() {
      if (!this.hasList) this.$refs.listIcon.src = "musicList.png";
    },
    highlightVolume() {
      if (this.speaker.style.fill != "#8a8a8a") {
        this.speaker.style.fill = "#8a8a8a";
      }
    },
    highlightArrUp() {
      this.$refs.arrowUp.src = "arrowUpH.png";
    },
    noLightArrUp() {
      console.log(this.$refs.arrowUp.src);
      this.$refs.arrowUp.src = "arrowUp.png";
    },
    highlightArrDown() {
      this.$refs.arrowDown.src = "arrowDownH.png";
    },
    noLightArrDown() {
      this.$refs.arrowDown.src = "arrowDown.png";
    },
    noLightVolume() {
      if (this.volumeControls.className.indexOf("hidden") != -1) {
        this.speaker.style.fill = "#DBDBDB";
      }
    },
    playNext() {
      if (this.playMode == 4 || this.playMode == 5) {
        this.changeMusic(this.currentMusicIndex);
        return;
      }
      if (this.playMode == 2 || this.playMode == 3) {
        //如果是随机播放
        if (this.randomIndex + 1 < this.randomList.length) this.randomIndex++;
        else this.randomIndex = 0;
        this.changeMusic(
          this.musicList.indexOf(this.randomList[this.randomIndex])
        );
        return;
      }
      if (this.currentMusicIndex < this.musicList.length - 1)
        ++this.currentMusicIndex;
      else this.currentMusicIndex = 0;
      this.changeMusic(this.currentMusicIndex);
    },
    playLast() {
      if (this.playMode == 4 || this.playMode == 5) {
        this.changeMusic(this.currentMusicIndex);
        return;
      }
      if (this.playMode == 2 || this.playMode == 3) {
        if (this.randomIndex == 0)
          this.randomIndex = this.randomList.length - 1;
        else this.randomIndex--;
        this.changeMusic(
          this.musicList.indexOf(this.randomList[this.randomIndex])
        );
        return;
      }
      if (this.currentMusicIndex > 0) --this.currentMusicIndex;
      else this.currentMusicIndex = this.musicList.length - 1;
      this.changeMusic(this.currentMusicIndex);
    },
    showList() {
      if (!this.hasList) {
        this.hasList = true;
        this.$refs.listIcon.src = "musicListH.png";
      } else {
        this.hasList = false;
        this.$refs.listIcon.src = "musicList.png";
      }
    },
    changeMusic(index) {
      if (index == -1) index = 0;
      var _this = this;
      if (this.cancel) {
        this.cancel();
      }
      let CancelToken = $axios.CancelToken;
      _this.currentMusicIndex = index;
      if (this.playMode == 2 || this.playMode == 3) {
        this.randomIndex = this.randomList.indexOf(
          this.musicList[this.currentMusicIndex]
        );
      }
      if (
        index < _this.musicList.length &&
        _this.musicList[index].id < 0 &&
        _this.musicList[index].name.length > 0
      ) {
        $axios({
          method: "get",
          url:
            "https://v1.itooi.cn/kuwo/search?type=song&pageSize=100&page=0&keyword=" +
            _this.musicList[index].name,
          data: {},
          cancelToken: new CancelToken(c => {
            this.cancel = c;
          })
        })
          .then(function(response) {
            var id = response.data.data[0].MP3RID;
            _this.player.src =
              "https://v1.itooi.cn/kuwo/url?quality=128&id=" +
              id.slice(4, id.length);
            _this.currentMusicID = id.slice(4, id.length);
            _this.musicList[index].id = _this.currentMusicID;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (
        index < _this.musicList.length &&
        _this.musicList[index].id > 0
      ) {
        _this.player.src =
          "https://v1.itooi.cn/kuwo/url?quality=128&id=" +
          _this.musicList[index].id;
        _this.currentMusicID = _this.musicList[index].id;
      } else {
        _this.player.src = "";
        _this.hasMusic = 1;
        this.$refs.bg.src = "logo.png";
        this.$refs.miniBg.src = "logo.png";
        _this.lrcList = [""];
        _this.currentMusicIndex = -1;
      }
      console.log(_this.player.src);
    },
    updateProgress() {
      var current = this.player.currentTime;
      var percent = (current / this.player.duration) * 100;
      this.$refs.progress.style.width = percent + "%";
      this.$refs.currentTime.textContent = this.formatTime(current);
      this.$refs.totalTime.textContent = this.formatTime(
        this.player.duration - current
      );
      if (isNaN(this.player.duration))
        this.$refs.totalTime.textContent = this.formatTime(0);
    },
    formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      return min + ":" + (sec < 10 ? "0" + sec : sec);
    },
    togglePlay() {
      if (this.musicList.length == 0) return;
      if (this.player.paused) {
        this.playPause.src = "pauseH.png";
        this.player.play();
      } else {
        this.playPause.src = "playH.png";
        this.player.pause();
      }
    },
    makePlay() {
      this.hasMusic = 1;
    },
    volumeBtnClick() {
      if (this.volumeControls.className.indexOf("hidden") != -1)
        this.speaker.style.fill = "#8a8a8a";
      else this.speaker.style.fill = "#DBDBDB";
      this.volumeControls.classList.toggle("hidden"); //在类名中移除 若不存在则添加
    },
    updateVolume() {
      this.volumeProgress.style.height = this.player.volume * 100 + "%";
      if (this.player.volume >= 0.5) {
        this.speaker.attributes.d.value =
          "M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z";
      } else if (this.player.volume < 0.5 && this.player.volume > 0.05) {
        this.speaker.attributes.d.value =
          "M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z";
      } else if (this.player.volume <= 0.05) {
        this.speaker.attributes.d.value =
          "M0 7.667v8h5.333L12 22.333V1L5.333 7.667";
      }
    },
    directionAware() {
      if (window.innerHeight < 250) {
        this.volumeControls.style.bottom = "-6.6vh";
        this.volumeControls.style.left = "3vw";
      } else if (this.$refs.audioPlayer.offsetTop < 154) {
        this.volumeControls.style.bottom = "-53vh";
        this.volumeControls.style.left = "-0.17vw";
      } else {
        this.volumeControls.style.bottom = "6.3vh";
        this.volumeControls.style.left = "-0.17vw";
      }
    },
    tryDragging(event) {
      if (!this.isDraggable(event.target)) return false;

      this.currentlyDragged = event.target;
      var handleMethod = this.currentlyDragged.dataset.method;
      window.addEventListener("mousemove", window[handleMethod], false);

      window.addEventListener(
        "mouseup",
        function() {
          this.currentlyDragged = false;
          window.removeEventListener("mousemove", window[handleMethod], false);
        },
        false
      );
    },
    inRange(event) {
      var rangeBox = this.getRangeBox(event);
      var rect = rangeBox.getBoundingClientRect();
      var direction = rangeBox.dataset.direction;
      if (direction == "horizontal") {
        var min = rect.x;
        var max = min + rangeBox.offsetWidth;
        if (event.clientX < min || event.clientX > max) return false;
      } else {
        var min = rect.top;
        var max = min + rangeBox.offsetHeight;
        if (event.clientY < min || event.clientY > max) return false;
      }
      return true;
    },
    getRangeBox(event) {
      var rangeBox = event.target;
      var el = this.currentlyDragged;
      //点击进度条 获取其范围
      if (event.type == "click" && this.isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
      }
      //拖动进度条的范围
      if (event.type == "mousemove") {
        rangeBox = el.parentElement.parentElement;
      }
      return rangeBox;
    },
    isDraggable(el) {
      var canDrag = false;
      var classes = Array.from(el.classList); //获取传入的元素类名
      this.draggableClasses.forEach(function(draggable) {
        if (classes.indexOf(draggable) !== -1) canDrag = true; //检查标签列表是否包含可拖动标签
      });
      return canDrag;
    },
    rewind(event) {
      //判断是否在进度条可点击范围
      if (this.inRange(event)) {
        this.player.currentTime =
          this.player.duration * this.getCoefficient(event);
      } else console.log("ss");
    },
    changeVolume(event) {
      if (this.inRange(event)) {
        this.player.volume = this.getCoefficient(event);
      }
    },
    getCoefficient(event) {
      var slider = this.getRangeBox(event);
      var rect = slider.getBoundingClientRect();
      var K = 0;
      if (slider.dataset.direction == "horizontal") {
        var offsetX = event.clientX - slider.getBoundingClientRect().x;
        var width = slider.clientWidth;
        K = offsetX / width;
      } else if (slider.dataset.direction == "vertical") {
        var height = slider.clientHeight;
        var offsetY = event.clientY - rect.top;
        K = 1 - offsetY / height;
      }
      return K;
    },
    shuffer(array) {
      var arr = [];
      arr = arr.concat(array);
      for (var i = 0; i < arr.length; i++) {
        var randomNum = this.getRandomNum(arr.length);
        var temp = arr[i];
        arr[i] = arr[randomNum];
        arr[randomNum] = temp;
      }
      return arr;
    },
    getRandomNum(max) {
      return Math.floor(Math.random() * max);
    },
    parseLyric(text) {
      var lines = text.split("\n"), //将文本分隔成一行一行，存入数组
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g, //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern1 = /\[\d{2}:\d{2}.\d{3}\]/g,
        result = []; //保存最终结果的数组
      if (pattern1.test(lines[0])) {
        result.push([0, "暂无歌词"]);
        return result;
      }
      while (!pattern.test(lines[0])) {
        //去掉不含时间的行
        lines = lines.slice(1);
      }
      lines[lines.length - 1].length === 0 && lines.pop(); //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
      lines.forEach(function(v, i, a /*数组本身*/ /*数组元素值*/ /*元素索引*/) {
        var time = v.match(pattern), //提取出时间[xx:xx.xx]
          value = v.replace(pattern, ""); //提取歌词
        time.forEach(function(v1, i1, a1) {
          //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
          var t = v1.slice(1, -1).split(":"); //去掉时间里的中括号得到xx:xx.xx
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]); //将结果压入最终数组
        });
      });
      result.sort(function(a, b) {
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词

        return a[0] - b[0];
      });
      return result;
    }
  }
};
</script>
<style>
.ivu-message {
  z-index: 1200;
}
li {
  list-style: none;
}
.songlist {
  position: absolute;
  width: 8vw;
  bottom: 2vh;
  left: 75.5vw;
  overflow-y: auto;
  max-height: 50vh;
}
.songlist::-webkit-scrollbar {
  display: none;
}
.audio.green-audio-player {
  position: relative;
  min-width: 17.6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 5.9vw;
  bottom: 4vh;
  border-radius: 4px;
  user-select: none;
  -webkit-user-select: none;
  -webkit-filter: blur(0px); /* Chrome, Safari, Opera */
  filter: blur(0px);
}
.audio.green-audio-player .lastSong {
  width: 4.1vw;
  cursor: pointer;
}
.audio.green-audio-player .nextSong {
  width: 3vw;
  padding-left: 1vw;
  cursor: pointer;
}
.audio.green-audio-player .playMode {
  width: 3vw;
  cursor: pointer;
}
.audio.green-audio-player .like {
  width: 3vw;
  cursor: pointer;
}
.audio.green-audio-player .listBtn {
  padding-top: 0.2vh;
  padding-left: 2vw;
  width: 3vw;
  cursor: pointer;
}
.audio.green-audio-player .play-pause-btn {
  width: 5.3vw;
  cursor: pointer;
}
.audio.green-audio-player .spinner {
  width: 1.5vw;
  height: 1.5vw;
  -webkit-transform: rotate(360deg);
  animation: rotation 2s linear infinite;
  -moz-animation: rotation 2s linear infinite;
  -webkit-animation: rotation 2s linear infinite;
  -o-animation: rotation 2s linear infinite;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.audio.green-audio-player .slider {
  width: 45vw;
  background-color: #d8d8d8;
  cursor: pointer;
  position: relative;
  left: 1px;
}
.audio.green-audio-player .slider .progress {
  position: relative;
  background-color: #44bfa3;
  border-radius: inherit;
  pointer-events: none;
  overflow: visible;
}
.audio.green-audio-player .slider .progress .pin {
  height: 2vh;
  width: 2vh;
  border-radius: 8px;
  background-color: #307fbf;
  position: absolute;
  pointer-events: all;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.32);
}
.audio.green-audio-player .controls {
  font-family: "Roboto", sans-serif;
  font-size: 1vw;
  line-height: 3vh;
  color: #55606e;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.4vw;
  margin-right: 1.4vw;
}
.audio.green-audio-player .controls .slider {
  margin-left: 1vw;
  margin-right: 1vw;
  border-radius: 2px;
  height: 4px;
}
.audio.green-audio-player .controls .slider .progress {
  width: 0;
  height: 100%;
}
.audio.green-audio-player .controls .slider .progress .pin {
  right: -0.5vw;
  bottom: -0.7vh;
}
.audio.green-audio-player .controls span {
  cursor: default;
}
.audio.green-audio-player .volume {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  left: 0.8vw;
  top: 0.4vh;
}
.audio.green-audio-player .volume .volume-btn {
  cursor: pointer;
}
.audio.green-audio-player .volume .volume-controls {
  width: 1.6vw;
  height: 17vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.62);
  border-radius: 7px;
  left: -3px;
  top: -18vh;
  flex-direction: column;
  align-items: center;
  display: flex;
}
.audio.green-audio-player .volume .volume-controls.hidden {
  display: none;
}
.audio.green-audio-player .volume .volume-controls .slider {
  top: 0.5vh;
  position: relative;
  width: 0.4vw;
  border-radius: 3px;
  height: 16vh;
}
.audio.green-audio-player .volume .volume-controls .slider .progress {
  position: absolute;
  bottom: -2.4vh;
  height: 100%;
  width: 0.4vw;
}
.audio.green-audio-player .volume .volume-controls .slider .progress .pin {
  left: -0.3vw;
  top: -0.5vh;
}
.current-time {
  width: 3rem;
}
.total-time {
  width: 3rem;
}
.bg {
  position: relative;
  left: -5.8vw;
  height: 100vh;
  width: 130%;
}
.miniBg {
  position: absolute;
  height: 6vh;
  width: 3vw;
  left: -2.5vw;
}
.bg img {
  left: -11.7vw;
  background-size: cover;
  width: 110%;
  height: 110%;
  background-position: center;
  -webkit-filter: contrast(30%) saturate(400%) blur(30px);
}
.miniBg img {
  width: 3vw;
  height: 3vw;
}
.lrc {
  z-index: 100;
  position: absolute;
  left: 26vw;
  top: 20vh;
  width: 37vw;
  height: 62vh;
  overflow-x: hidden;
  overflow-y: auto;
}

/*兼容IE*/
.lrc {
  scrollbar-face-color: #20a774; /*移动滑块颜色*/
  scrollbar-shadow-color: #20a774; /*移动滑块边框颜色*/
  scrollbar-track-color: #ccc; /*背景颜色*/
  scrollbar-arrow-color: #ddd; /*箭头颜色*/
}
.lrc::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc;
} /* 滚动条的滑轨背景颜色 */
.lrc::-webkit-scrollbar {
  width: 0.4vw;
  background-color: #ccc;
}

.lrc::-webkit-scrollbar-thumb {
  background-color: #20a774;
} /* 滑块颜色 */
.lrc .gc {
  margin: 10px;
  font-size: 1.5vw;
  color: #d6d8d4;
  font-family: wawati;
  list-style-type: none;
  position: absolute;
  height: 62vh;
  width: 35.3vw;
}
.arrowDown {
  z-index: 1;
  cursor: pointer;
  position: absolute;
  width: 0.58vw;
  height: 1vh;
  right: -3vw;
  top: 12vh;
}
.arrowUp {
  cursor: pointer;
  z-index: 1;
  position: relative;
  height: 6vh;
  top: 1.1vh;
}
</style>