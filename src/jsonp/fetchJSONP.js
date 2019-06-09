const config = {
  callback: 'callback'
}

function generateCB () {
  return `jsonp${Math.ceil(Math.random() * 1000000)}`
}

function removeCB (_name) {
  try {
    delete window.callback
  } catch (e) {
    window.callback = undefined
  }
}

function createScript (_url, _id) {
  const script = document.createElement('script')
  script.setAttribute('src', _url)
  script.id = _id
  document.getElementsByTagName('head')[0].appendChild(script)
}

function removeScipt (_id) {
  const script = document.getElementById(_id)
  document.getElementsByTagName('head')[0].removeChild(script)
}

function fetchJsonp (_url, params = {}, options = {}) {
  return new Promise((resolve, reject) => {
    const jsonp = options.callback || config.callback
    const cb = generateCB() // get callback function name
    const scriptId = cb
    createScript(_url, scriptId)

    let query = []
    Object.keys(params).forEach(key => {
      query.push(`${key}=${params[key]}`)
    })
    _url += (query.elngth === 0) ? '?' : `?${query.join('&')}`
    _url += `&${jsonp}=${cb}`

    // register the callback function
    window.callback = (res) => {
      resolve(res)
      removeScipt(scriptId)
      removeCB(cb)
    }
  })
}

function fetchSingers (singers, index = 0) {
  let img = singers[index].singerimage || singers[index].img
  if (img) {
    singers[index].singerimage = img
    singers[index].img = singers[index].singerimage
    index++
    if (index < singers.length) {
      fetchSingers(singers, index)
    }
  } else {
    fetchJsonp('https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=1&w=' + singers[index].name)
      .then(data => {
        let singerMid = data.data.song.list[0].singer[0].mid
        console.log(singers[index].name + ' ' + singerMid)
        singers[index].img = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + singerMid + '.jpg?max_age=2592000'
        singers[index].singerimage = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + singerMid + '.jpg?max_age=2592000'
        index++
        console.error(singers[index].name + '没有头像，已自动补齐')
        if (index < singers.length) {
          fetchSingers(singers, index)
        }
      })
      .catch(error => {
        console.error(error || '未知错误')
      })
  }
}

function fetchAlbums (albums, index = 0) {
  fetchJsonp('https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=1&w=' + albums[index].albumname)
    .then(data => {
      let albumid = data.data.song.list[0].albumid
      albums[index].albumimage = 'http://imgcache.qq.com/music/photo/album_300/' + albumid % 100 + '/300_albumpic_' + albumid + '_0.jpg'
      console.log(albums[index].albumname + albums[index].albumimage)
      index++
      console.log(index)
      if (index < albums.length) {
        fetchAlbums(albums, index)
      }
    })
    .catch(error => {
      console.error(error || '未知错误')
    })
}

export { fetchSingers, fetchJsonp, fetchAlbums }
