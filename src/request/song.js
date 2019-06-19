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

function cancelKeepSongList (userid, songlistid, callback) {
  AXIOS.get('/cancelKeepSongList?' + querystring.stringify({
    'userid': userid,
    'songlistid': songlistid
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      callback('取消收藏歌单失败' + error)
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

function unkeepSong (songid, songlistid, callback) {
  AXIOS.get('/unKeepSong?' + querystring.stringify({
    'songlistid': songlistid,
    'songid': songid
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      callback(error)
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
      console.error(error)
      callback(false)
    })
}

function getSongList (songListId, callback) {
  AXIOS.get('/getSongListById?' + querystring.stringify({
    'id': songListId
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('获取歌单详细信息出错' + error)
    })
}

export function isBought (song, userid, callback) {
  if (song.free === '1') {
    callback('3')
  } else {
    AXIOS.get('/isSongBought', { params: { songid: song.songid, albumid: song.albumid, userid: userid } })
      .then((response) => {
        callback(response.data)
      })
      .catch(error => {
        console.error(error)
        callback(false)
      })
  }
}

export function recommend (userid, callback) {
  AXIOS.get('/recommend?userid=' + userid)
    .then((response) => {
      callback(response.data)
    })
    .catch(error => {
      console.error(error)
      callback(false)
    })
}
import axios from 'axios'
export function singerRecommend (userid, callback) {
  if (userid) {
    axios.get('http://localhost:8081/api/getUserRecommend?userID=' + userid)
      .then((response) => {
        if (response.data.recommend.length == 0) {
          callback([61144, 117586, 493864, 1887, 1416])
        } else {
          callback(response.data.recommend)
        }
        
      })
      .catch(error => {
        console.error(error)
        
      })
  } else {
    callback([61144, 117586, 493864, 1887, 1416])
  }
}

export function getSingerByID (singerid, callback) {
  AXIOS.get('/getSinger', {
    params: {
      singerid: singerid
    }
  }).then(response => {
    callback(response.data)
  }).catch(response => {
    console.error(response)
  })
}

export { cancelKeepSongList, unkeepSong, getSongList, likeSong, showCreatedSongList, keepSong, createSonglist, keepSonglist, getSong, getSongsInSonglist }
