import querystring from 'querystring'
import { AXIOS } from '@/http/http'

function changeFollowUser (userid, id, callback) {
  AXIOS.get('changeFollow?' + querystring.stringify({
    'uid': userid,
    'fid': id
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('改变关注用户失败: ' + error)
    })
}
function changeFollowSinger (userid, id, callback) {
  AXIOS.get('changeFollowSinger?' + querystring.stringify({
    'uid': userid,
    'sid': id
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('改变关注歌手失败: ' + error)
    })
}
function isFollowUser (userid, id, callback) {
  AXIOS.get('isFollowed?' + querystring.stringify({
    'uid': userid,
    'fid': id
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('查看关注失败: ' + error)
    })
}
function isFollowSinger (userid, id, callback) {
  AXIOS.get('isFollowedSinger?' + querystring.stringify({
    'uid': userid,
    'sid': id
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('查看关注失败: ' + error)
    })
}

export { changeFollowUser, changeFollowSinger, isFollowUser, isFollowSinger }
