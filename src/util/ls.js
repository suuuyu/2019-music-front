const ls = window.sessionStorage
export default {
  getItem (key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (err) {
      return null
    }
  },
  setItem (key, val) {
    ls.setItem(key, JSON.stringify(val))
  },
  clear () {
    ls.clear()
  },
  keys (index) {
    return ls.key(index)
  },
  removeItem (key) {
    ls.removeItem(key)
  }
}
