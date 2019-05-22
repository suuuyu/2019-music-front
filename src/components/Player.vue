<template>
  <div ref="main" style="position:fixed; left:50px; bottom:20px; width:100%; height:50px; z-index:9999;">
    <div style="position:absolute;">
    <div v-if="isMax" class="arrowDown">
      <img
        src="arrowDown.png"
        width="50px"
        height="50px"
        @click="changeMini"
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
      <div id="lastSong" class="lastSong">
        <img
          @click="playLast"
          id="lastSongIcon"
          width="30"
          height="30"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDk0MDQ2MTE5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjI1LjUgNTEzVjIxNi4xYzAtMTMuNSAyLjUtMjguOS0xMi45LTM1LjktMTQuMi02LjQtMjYuMyAxLjUtMzcuNyA5LjVDNDM0LjUgMjg4IDI5NCAzODYuMSAxNTMuOCA0ODQuN2MtMzIuMiAyMi43LTMxLjcgMzMuNyAwLjkgNTYuNkMyOTIuOSA2MzguMiA0MzEuMiA3MzUgNTY5LjUgODMxLjhjNC4yIDIuOSA4LjQgNS45IDEyLjggOC40IDI3IDE0LjcgNDMgNS43IDQzLjEtMjUuMSAwLjQtNzUuOSAwLjEtMTUxLjggMC4xLTIyNy44VjUxM3pNNzI3LjkgNTEyLjhjMCA5Mi4xLTAuMSAxODQuMSAwIDI3Ni4yIDAgMzcuNyAxOS4xIDYwLjggNTAuMSA2MS40IDMyIDAuNyA1Mi4yLTIzIDUyLjItNjEuOCAwLjEtMTg0LjEgMC4xLTM2OC4yIDAtNTUyLjMgMC0zNy41LTE5LjMtNjAuOS01MC4xLTYxLjUtMzEuOC0wLjYtNTIuMiAyMy4zLTUyLjIgNjEuOS0wLjEgOTIgMCAxODQgMCAyNzYuMXoiIHAtaWQ9IjIxMDkiIGZpbGw9IiNENkQ4RDQiPjwvcGF0aD48L3N2Zz4="
        >
      </div>
      <div class="loading" v-show="!hasMusic">
        <img class="spinner" width="30" height="30" src="../image/loading.png">
      </div>
      <div class="play-pause-btn" v-show="hasMusic">
        <img
          @click="togglePlay"
          width="30"
          height="30"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDkzOTQxMjU2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3NjYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTAyLjQyNTc0MiAxMDIuMzkzNTY1djgxOS4xNDg1MTZsNjE0LjM2MTM4Ny00MDkuNTc0MjU4eiIgZmlsbD0iI0Q2RDhENCIgcC1pZD0iMTc2NyI+PC9wYXRoPjxwYXRoIGQ9Ik0xNTMuNjIyNTI0IDEwMi4zOTM1NjV2ODE5LjE0ODUxNmw2MTQuMzYxMzg3LTQwOS41NzQyNTh6IiBmaWxsPSIjRDZEOEQ0IiBwLWlkPSIxNzY4Ij48L3BhdGg+PHBhdGggZD0iTTI1OS41OTk4NjMgMTUuODcxMDAzVjgzNC41MDc1NTFsNjE5LjQ4MTA2Ni00MDUuNDc4NTE1eiIgZmlsbD0iI0Q2RDhENCIgcC1pZD0iMTc2OSI+PC9wYXRoPjxwYXRoIGQ9Ik0yNjEuMTM1NzY3IDE4OS40MjgwOTRsLTEuNTM1OTA0IDgxOC42MzY1NDlMODc1LjQ5NzE1NCA1OTkuMDAyMzUzeiIgZmlsbD0iI0Q2RDhENCIgcC1pZD0iMTc3MCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMDQuODE5MzA2IDEwMi4zOTM1NjVtLTEwMi4zOTM1NjQgMGExMDIuMzkzNTY1IDEwMi4zOTM1NjUgMCAxIDAgMjA0Ljc4NzEyOSAwIDEwMi4zOTM1NjUgMTAyLjM5MzU2NSAwIDEgMC0yMDQuNzg3MTI5IDBaIiBmaWxsPSIjRDZEOEQ0IiBwLWlkPSIxNzcxIj48L3BhdGg+PHBhdGggZD0iTTgxOS4xODA2OTQgNDA5LjU3NDI1OGMtNTYuMzE2NDYxIDAtMTAyLjM5MzU2NSA0Ni4wNzcxMDQtMTAyLjM5MzU2NSAxMDIuMzkzNTY1czQ2LjA3NzEwNCAxMDAuMzQ1NjkzIDEwMi4zOTM1NjUgMTAyLjM5MzU2NGM1Ny44NTIzNjQgMi4wNDc4NzEgMTAyLjkwNTUzMi00NS4wNTMxNjggMTAyLjM5MzU2NC0xMDIuMzkzNTY0LTAuNTExOTY4LTU2LjMxNjQ2MS00Ni4wNzcxMDQtMTAyLjM5MzU2NS0xMDIuMzkzNTY0LTEwMi4zOTM1NjV6TTIwNC44MTkzMDYgODE5LjE0ODUxN2MtNTYuMzE2NDYxIDAtMTAyLjM5MzU2NSA0Ni4wNzcxMDQtMTAyLjM5MzU2NCAxMDIuMzkzNTY0czQ2LjA3NzEwNCAxMDAuMzQ1NjkzIDEwMi4zOTM1NjQgMTAyLjM5MzU2NWM1My43NTY2MjEgMi4wNDc4NzEgMTAwLjg1NzY2MS00NS4wNTMxNjggMTAyLjM5MzU2NS0xMDIuMzkzNTY1IDEuNTM1OTAzLTU2LjMxNjQ2MS00Ni4wNzcxMDQtMTAyLjM5MzU2NS0xMDIuMzkzNTY1LTEwMi4zOTM1NjR6IiBmaWxsPSIjRDZEOEQ0IiBwLWlkPSIxNzcyIj48L3BhdGg+PC9zdmc+"
          class="play-pause-icon"
          ref="playPause"
        >
      </div>
      <div id="nextSong" class="nextSong">
        <img
          @click="playNext"
          id="nextSongIcon"
          width="30"
          height="30"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDk0MDU4Nzg3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyNzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDAyLjkgNTEzVjIxNi4xYzAtMTMuNS0yLjUtMjguOSAxMi45LTM1LjkgMTQuMi02LjQgMjYuMyAxLjUgMzcuNyA5LjUgMTQwLjUgOTguMyAyODEgMTk2LjQgNDIxLjIgMjk1IDMyLjIgMjIuNyAzMS43IDMzLjctMC45IDU2LjZDNzM1LjYgNjM4LjIgNTk3LjMgNzM0LjkgNDU5IDgzMS43Yy00LjIgMi45LTguNCA1LjktMTIuOCA4LjQtMjcgMTQuNy00MyA1LjctNDMuMS0yNS4xLTAuNC03NS45LTAuMS0xNTEuOC0wLjEtMjI3LjgtMC4xLTI0LjgtMC4xLTQ5LjUtMC4xLTc0LjJ6TTMwMC41IDUxMi44YzAgOTIuMSAwLjEgMTg0LjEgMCAyNzYuMiAwIDM3LjctMTkuMSA2MC44LTUwLjEgNjEuNC0zMiAwLjctNTIuMi0yMy01Mi4yLTYxLjgtMC4xLTE4NC4xLTAuMS0zNjguMiAwLTU1Mi4zIDAtMzcuNSAxOS4zLTYwLjkgNTAuMS02MS41IDMxLjgtMC42IDUyLjIgMjMuMyA1Mi4yIDYxLjl2Mjc2LjF6IiBwLWlkPSIyMjgwIiBmaWxsPSIjRDZEOEQ0Ij48L3BhdGg+PC9zdmc+"
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
          data-mode="0"
          id="playModeIcon"
          width="30"
          height="30"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDk0MTE5OTI5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTQ2LjQ4MzUzMiA0NjcuMjE4MDc0IDc5OS41MzM2OTIgNjE2LjQ3NDQ0NmMtNy45OTgxNjEgOC4xMjE5ODEtMTguOTE4ODg1IDEyLjY5NzE4My0zMC4zMTg1MTYgMTIuNjk3MTgzLTExLjM5OTYzMSAwLTIyLjMyMDM1NS00LjU3NTIwMi0zMC4zMTg1MTYtMTIuNjk3MTgzTDU5MS45NDU3OTcgNDY3LjIxODA3NGMtMTYuNDgzNDE2LTE2Ljc0NDM1OS0xNi4yNzA1NjktNDMuNjc2NzU1IDAuNDcxNzQ0LTYwLjE2NTI4OCAxNi43MzkyNDMtMTYuNDgzNDE2IDQzLjY2NTQ5OS0xNi4yNzU2ODUgNjAuMTY1Mjg4IDAuNDcxNzQ0bDgyLjEzNDY0OSA4My40MjYwNjFjLTEwLjY1MzY0MS0xNTQuNDE1ODgyLTEzNy4zOTIxNi0yNzYuNzU3MjU1LTI5MS43NTg5MjMtMjc2Ljc1NzI1NS0xNjEuMzMxMzg1IDAtMjkyLjU4MTY2MiAxMzMuNTkyNjI0LTI5Mi41ODE2NjIgMjk3LjgwNjY2M1MyODEuNjI4MTkyIDgwOS44MDU2NCA0NDIuOTU5NTc3IDgwOS44MDU2NGM1OS4zODA0MTIgMCAxMTYuNTIyODU0LTE3Ljk3OTQ5IDE2NS4yNDE0MzgtNTIuMDAxMzUxIDE5LjI3MTkyNi0xMy40NDUyMiA0NS43OTQ5OTktOC43MzM5MTggNTkuMjQwMjE5IDEwLjUyNzc3NCAxMy40NTEzNiAxOS4yNjY4MDkgOC43MzQ5NDIgNDUuNzg5ODgyLTEwLjUyNjc1MSA1OS4yNDAyMTktNjMuMDc4NjQxIDQ0LjAzOTAwNi0xMzcuMDYxNjMyIDY3LjMyMTI2OC0yMTMuOTU0OTA3IDY3LjMyMTI2OC0yMDguMjQ2OTA1IDAtMzc3LjY2OTU3Mi0xNzEuNzYzOTkyLTM3Ny42Njk1NzItMzgyLjg5MzU1czE2OS40MjE2NDQtMzgyLjg5MzU1IDM3Ny42Njk1NzItMzgyLjg5MzU1YzE5Ni4xMTU2MSAwIDM1Ny43NDE3MDcgMTUyLjM2MDA2IDM3NS45MDQzNjkgMzQ2LjQ1NDY0bDY2Ljk4MTUzMS02OC4wMzU1MzZjMTYuNDk5Nzg5LTE2Ljc1MjU0NiA0My40MzczMDItMTYuOTUwMDQ0IDYwLjE2NTI4OC0wLjQ3MTc0NEM5NjIuNzU1MTI0IDQyMy41NDEzMTkgOTYyLjk2Nzk3MiA0NTAuNDczNzE1IDk0Ni40ODM1MzIgNDY3LjIxODA3NHoiIHAtaWQ9IjEzMjUiIGZpbGw9IiNENkQ4RDQiPjwvcGF0aD48L3N2Zz4="
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
        <div class="volume-btn" ref="volumeBtn" @click="volumeBtnClick">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#566574"
              fill-rule="evenodd"
              d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z"
              ref="speaker"
            ></path>
          </svg>
        </div>
      </div>
      <audio
        crossorigin
        ref="audio"
        @timeupdate="updateProgress"
        @canplay="makePlay"
        @volumechange="updateVolume"
        @loadedmetadata="loadMusic"
        @ended="playNext"
      >
        <source :src="currentSrc" type="audio/mpeg">
      </audio>
      <div v-if="!isMax" style="padding-left:80px;">
        <img src="../image/arrowUp.png" width="35px" height="35px" @click="changeMini">
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import $axios from 'axios' 
export default {
  data() {
    return {
      isMax: true,
      musicList: [],
      currentMusicID: 0,
      currentMusicIndex: 0,
      currentSrc: "",
      hasMusic: 0,
      player: NaN,
      playPause: NaN,
      volumeBtn: NaN,
      volumeControls: NaN,
      volumeProgress: NaN,
      speaker: NaN,
      currentlyDragged: null,
      draggableClasses: ["pin"],
      lrcList: []
    };
  },
  //props:['musicList'],
  created() {},
  mounted() {
    var _this = this;
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
      this.hasMusic = 1;
      this.changeMusic(0);
    }
    this.changeMini();
  },
  methods: {
    addMusic(arr) {
      this.musicList = this.musicList.concat(arr);
      if (this.musicList.length > 0 && !this.hasMusic) {
        console.log(this.musicList);
        this.hasMusic = 1;
        this.changeMusic(0);
      }
    },
    changeMini() {
      if (this.isMax) {
        this.isMax = false;
        this.$refs.main.style = "position:fixed; left:50px; bottom:20px; width:100%; height:50px; z-index:9999;";
      } else {
        this.isMax = true;
        this.$refs.main.style = "position:fixed; left:-50px; bottom:-50px; width:100%; height:950px; z-index:9999;";
      }
    },
    loadMusic() {
      var _this = this;
      this.$refs.totalTime.textContent = this.formatTime(this.player.duration);
      this.togglePlay();
      this.$refs.bg.src =
        "https://v1.itooi.cn/kuwo/pic?id=" + this.currentMusicID;
      this.$refs.miniBg.src ="https://v1.itooi.cn/kuwo/pic?id=" + this.currentMusicID;
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
              _this.$refs.oneLrc[j].style.color = "#D6D8D4";
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
    playNext() {
      if (this.currentMusicIndex < this.musicList.length - 1)
        ++this.currentMusicIndex;
      else this.currentMusicIndex = 0;
      this.changeMusic(this.currentMusicIndex);
    },
    playLast() {
      if (this.currentMusicIndex > 0) --this.currentMusicIndex;
      else this.currentMusicIndex = this.musicList.length - 1;
      this.changeMusic(this.currentMusicIndex);
    },
    changeMusic(index) {
      var _this = this;
      $axios({
        method: "get",
        url:
          "https://v1.itooi.cn/kuwo/search?type=song&pageSize=100&page=0&keyword=" +
          _this.musicList[index],
        data: {}
      })
        .then(function(response) {
          var id = response.data.data[0].MP3RID;
          _this.player.src =
            "https://v1.itooi.cn/kuwo/url?quality=128&id=" +
            id.slice(4, id.length);
          _this.currentMusicID = id.slice(4, id.length);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateProgress() {
      var current = this.player.currentTime;
      var percent = (current / this.player.duration) * 100;
      this.$refs.progress.style.width = percent + "%";
      this.$refs.currentTime.textContent = this.formatTime(current);
      this.$refs.totalTime.textContent = this.formatTime(
        this.player.duration - current
      );
    },
    formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      return min + ":" + (sec < 10 ? "0" + sec : sec);
    },
    togglePlay() {
      if (this.player.paused) {
        this.playPause.src =
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDk0MTI2MzY5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjA5LjQxNyA2MmgxNTAuMDA4djkwMGgtMTUwLjAwOHYtOTAweiIgcC1pZD0iMTY0NiIgZmlsbD0iI0Q2RDhENCI+PC9wYXRoPjxwYXRoIGQ9Ik02NTkuNDE3IDYyaDE0OS45ODV2OTAwaC0xNDkuOTg1di05MDB6IiBwLWlkPSIxNjQ3IiBmaWxsPSIjRDZEOEQ0Ij48L3BhdGg+PC9zdmc+";
        this.player.play();
      } else {
        this.playPause.src =
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDkzOTQxMjU2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3NjYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTAyLjQyNTc0MiAxMDIuMzkzNTY1djgxOS4xNDg1MTZsNjE0LjM2MTM4Ny00MDkuNTc0MjU4eiIgZmlsbD0iI0Q2RDhENCIgcC1pZD0iMTc2NyI+PC9wYXRoPjxwYXRoIGQ9Ik0xNTMuNjIyNTI0IDEwMi4zOTM1NjV2ODE5LjE0ODUxNmw2MTQuMzYxMzg3LTQwOS41NzQyNTh6IiBmaWxsPSIjRDZEOEQ0IiBwLWlkPSIxNzY4Ij48L3BhdGg+PHBhdGggZD0iTTI1OS41OTk4NjMgMTUuODcxMDAzVjgzNC41MDc1NTFsNjE5LjQ4MTA2Ni00MDUuNDc4NTE1eiIgZmlsbD0iI0Q2RDhENCIgcC1pZD0iMTc2OSI+PC9wYXRoPjxwYXRoIGQ9Ik0yNjEuMTM1NzY3IDE4OS40MjgwOTRsLTEuNTM1OTA0IDgxOC42MzY1NDlMODc1LjQ5NzE1NCA1OTkuMDAyMzUzeiIgZmlsbD0iI0Q2RDhENCIgcC1pZD0iMTc3MCI+PC9wYXRoPjxwYXRoIGQ9Ik0yMDQuODE5MzA2IDEwMi4zOTM1NjVtLTEwMi4zOTM1NjQgMGExMDIuMzkzNTY1IDEwMi4zOTM1NjUgMCAxIDAgMjA0Ljc4NzEyOSAwIDEwMi4zOTM1NjUgMTAyLjM5MzU2NSAwIDEgMC0yMDQuNzg3MTI5IDBaIiBmaWxsPSIjRDZEOEQ0IiBwLWlkPSIxNzcxIj48L3BhdGg+PHBhdGggZD0iTTgxOS4xODA2OTQgNDA5LjU3NDI1OGMtNTYuMzE2NDYxIDAtMTAyLjM5MzU2NSA0Ni4wNzcxMDQtMTAyLjM5MzU2NSAxMDIuMzkzNTY1czQ2LjA3NzEwNCAxMDAuMzQ1NjkzIDEwMi4zOTM1NjUgMTAyLjM5MzU2NGM1Ny44NTIzNjQgMi4wNDc4NzEgMTAyLjkwNTUzMi00NS4wNTMxNjggMTAyLjM5MzU2NC0xMDIuMzkzNTY0LTAuNTExOTY4LTU2LjMxNjQ2MS00Ni4wNzcxMDQtMTAyLjM5MzU2NS0xMDIuMzkzNTY0LTEwMi4zOTM1NjV6TTIwNC44MTkzMDYgODE5LjE0ODUxN2MtNTYuMzE2NDYxIDAtMTAyLjM5MzU2NSA0Ni4wNzcxMDQtMTAyLjM5MzU2NCAxMDIuMzkzNTY0czQ2LjA3NzEwNCAxMDAuMzQ1NjkzIDEwMi4zOTM1NjQgMTAyLjM5MzU2NWM1My43NTY2MjEgMi4wNDc4NzEgMTAwLjg1NzY2MS00NS4wNTMxNjggMTAyLjM5MzU2NS0xMDIuMzkzNTY1IDEuNTM1OTAzLTU2LjMxNjQ2MS00Ni4wNzcxMDQtMTAyLjM5MzU2NS0xMDIuMzkzNTY1LTEwMi4zOTM1NjR6IiBmaWxsPSIjRDZEOEQ0IiBwLWlkPSIxNzcyIj48L3BhdGg+PC9zdmc+";
        this.player.pause();
      }
    },
    makePlay() {
      this.hasMusic = 1;
    },
    volumeBtnClick() {
      this.volumeBtn.classList.toggle("open"); //在类名中移除 若不存在则添加
      this.volumeControls.classList.toggle("hidden");
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
        this.volumeControls.style.bottom = "-54px";
        this.volumeControls.style.left = "54px";
      } else if (this.$refs.audioPlayer.offsetTop < 154) {
        this.volumeControls.style.bottom = "-164px";
        this.volumeControls.style.left = "-3px";
      } else {
        this.volumeControls.style.bottom = "52px";
        this.volumeControls.style.left = "-3px";
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
        var min = rangeBox.offsetLeft;
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
      }
    },
    changeVolume(event) {
      if (this.inRange(event)) {
        this.player.volume = this.getCoefficient(event);
        console.log(this.getCoefficient(event));
      }
    },
    getCoefficient(event) {
      var slider = this.getRangeBox(event);
      var rect = slider.getBoundingClientRect();
      var K = 0;
      if (slider.dataset.direction == "horizontal") {
        var offsetX = event.clientX - slider.offsetLeft;
        var width = slider.clientWidth;
        K = offsetX / width;
      } else if (slider.dataset.direction == "vertical") {
        var height = slider.clientHeight;
        var offsetY = event.clientY - rect.top;
        K = 1 - offsetY / height;
      }
      return K;
    },
    parseLyric(text) {
      var lines = text.split("\n"), //将文本分隔成一行一行，存入数组
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g, //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        result = []; //保存最终结果的数组
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
<style scoped>
li {
  list-style: none;
}
.audio.green-audio-player {
  position: relative;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 100px;
  bottom: 30px;
  border-radius: 4px;
  user-select: none;
  -webkit-user-select: none;
  -webkit-filter: blur(0px); /* Chrome, Safari, Opera */
  filter: blur(0px);
}
.audio.green-audio-player .lastSong {
  width: 70px;
}
.audio.green-audio-player .nextSong {
  width: 50px;
}
.audio.green-audio-player .playMode {
  width: 50px;
}
.audio.green-audio-player .like {
  width: 50px;
}
.audio.green-audio-player .play-pause-btn {
  width: 90px;
  cursor: pointer;
}
.audio.green-audio-player .spinner {
  width: 25px;
  height: 25px;
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
  width: 720px;
  background-color: #d8d8d8;
  cursor: pointer;
  position: relative;
  left: 1px;
}
.audio.green-audio-player .slider .progress {
  background-color: #44bfa3;
  border-radius: inherit;
  position: absolute;
  pointer-events: none;
}
.audio.green-audio-player .slider .progress .pin {
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background-color: #307fbf;
  position: absolute;
  pointer-events: all;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.32);
}
.audio.green-audio-player .controls {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 18px;
  color: #55606e;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  margin-left: 24px;
  margin-right: 24px;
}
.audio.green-audio-player .controls .slider {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 2px;
  height: 4px;
}
.audio.green-audio-player .controls .slider .progress {
  width: 0;
  height: 100%;
}
.audio.green-audio-player .controls .slider .progress .pin {
  right: -8px;
  top: -6px;
}
.audio.green-audio-player .controls span {
  cursor: default;
}
.audio.green-audio-player .volume {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
}
.audio.green-audio-player .volume .volume-btn {
  cursor: pointer;
}
.audio.green-audio-player .volume .volume-btn.open path {
  fill: #44bfa3;
}
.audio.green-audio-player .volume .volume-controls {
  width: 30px;
  height: 135px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.62);
  border-radius: 7px;
  left: -3px;
  top: -150px;
  flex-direction: column;
  align-items: center;
  display: flex;
}
.audio.green-audio-player .volume .volume-controls.hidden {
  display: none;
}
.audio.green-audio-player .volume .volume-controls .slider {
  margin-top: 12px;
  margin-bottom: 12px;
  width: 6px;
  border-radius: 3px;
  height: 120px;
}
.audio.green-audio-player .volume .volume-controls .slider .progress {
  bottom: 0;
  height: 100%;
  width: 6px;
}
.audio.green-audio-player .volume .volume-controls .slider .progress .pin {
  left: -5px;
  top: -8px;
}
.current-time {
  width: 3rem;
}
.total-time {
  width: 3rem;
}
.bg {
  left: -20px;
  height: 840px;
  width: 140%;
}
.miniBg {
  position: relative;
  height: 50px;
  width: 50px;
  padding-right: 20px;
}
.bg img {
  background-size: cover;
  width: 110%;
  height: 110%;
  background-position: center;
  -webkit-filter: blur(30px);
  -ms-filter: blur(30px);
  filter: blur(30px);
}
.miniBg img {
  width: 50px;
  height: 50px;
}
.lrc {
  z-index: 100;
  position: absolute;
  left: 380px;
  top: 200px;
  width: 600px;
  height: 500px;
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
  width: 6px;
  background-color: #ccc;
}

.lrc::-webkit-scrollbar-thumb {
  background-color: #20a774;
} /* 滑块颜色 */
.lrc .gc {
  margin: 10px;
  font-size: 25px;
  color: #d6d8d4;
  font-family: Wawati SC;
  list-style-type: none;
  position: absolute;
  height: 500px;
  width: 600px;
}
.arrowDown {
  z-index: 1;
  cursor: pointer;
  position: relative;
  width: 10px;
  height: 10px;
  left: 1600px;
  top: 60px;
}
.arrowUp {
  cursor: pointer;
  z-index: 1;
  position: relative;
  width: 50px;
  height: 50px;
}
</style>