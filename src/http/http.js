import Axios from 'axios'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'
export const AXIOS = Axios.create({
  baseURL: 'http://localhost:8081/api'
})
