import querystring from 'querystring'
import { AXIOS } from '@/http/http'

function getSong (songid, callback) {
  AXIOS.get('/getSong?' + querystring.stringify({
    'songid': songid
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('查找歌曲失败' + error)
    })
}

function getSongsInSonglist (songlistid, callback) {
  AXIOS.get('/getSongsOfSongList?songlistid=' + songlistid)
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('查找歌曲失败' + error)
    })
}

function likeSong (userid, songid, callback) {
  AXIOS.get('/favoriteSong?' + querystring.stringify({
    'userid': userid,
    'songid': songid
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('喜欢歌曲出错' + error)
    })
}

function keepSonglist (userid, songlistid, callback) {
  AXIOS.get('/KeepSongList?' + querystring.stringify({
    'userid': userid,
    'songlistid': songlistid
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('收藏歌单失败' + error)
    })
}

function showCreatedSongList (userid, callback) {
  AXIOS.get('/showCreatedSongList?id=' + userid)
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('获取我的歌单出错：' + error)
    })
}

function keepSong (songid, songlistid, callback) {
  AXIOS.get('/KeepSong?' + querystring.stringify({
    'songlistid': songlistid,
    'songid': songid
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('获取我的歌单出错：' + error)
    })
}

function createSonglist (userid, name, callback) {
  AXIOS.get('/createNewSonglist?' + querystring.stringify({
    'userid': userid,
    'name': name
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('获取我的歌单出错：' + error)
    })
}

export { likeSong, showCreatedSongList, keepSong, createSonglist, keepSonglist, getSong, getSongsInSonglist }
