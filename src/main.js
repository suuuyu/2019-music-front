import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import querystring from 'querystring'
import VueLazyComponent from '@xunlei/vue-lazy-component'
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(VueLazyComponent)

Vue.prototype.$qs = querystring
Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  render: h => h(App),
  router: router,
  $,
}).$mount('#app')
