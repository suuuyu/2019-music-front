import querystring from 'querystring'
import { AXIOS } from '@/http/http'

function getSingerDetail (singerid, userid, callback) {
  AXIOS.get('/getSongAndAlbumOfSinger?' + querystring.stringify({
    'singerid': singerid,
    'userid': userid
  }))
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error('获取歌曲详情失败' + error)
    })
}

export { getSingerDetail }
