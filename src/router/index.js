import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../container/HelloWorld'
import inner from '../container/inner'

import login from '../components/login'
import register from '../components/register'
import songDetail from '../components/detail/songDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [
        {
          path: '/login',
          component: login
        },
        {
          path: '/register',
          component: register
        }
      ]
    },
    {
      path: '/inner',
      component: inner,
      children: [
        {
          path: '/song/:songid',
          component: songDetail
        }

      ]
    }

  ]
})
