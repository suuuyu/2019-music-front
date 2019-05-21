import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import querystring from 'querystring'
import VueLazyComponent from '@xunlei/vue-lazy-component'
import $ from "jquery";
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './assets/bootstrap-3.3.7-dist/js/bootstrap.min.js'

Vue.use(VueLazyComponent)

Vue.prototype.$qs = querystring
Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  render: h => h(App),
  router: router,
  $,
}).$mount('#app')
