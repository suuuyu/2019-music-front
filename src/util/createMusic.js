import $axios from 'axios'
async function createMusic (id, name) {
  var music = new Object();
  if (id > 0 && name.length === 0) {
    music.id = id
    var response = await $axios.get('https://v1.itooi.cn/kuwo/song?id=' + id)
    music.name = response.data.data.songName
  }
  if (name !== '' && id < 0) {
    var res = await $axios.get('https://v1.itooi.cn/kuwo/search?type=song&pageSize=100&page=0&keyword=' + name)
    id = res.data.data[0].MP3RID
    music.id = id
  }
  music.id = id
  music.name = name
  return music
}
export default {
  createMusic
}
