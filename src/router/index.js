import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../container/HelloWorld'
import login from '../components/login'
import register from '../components/register'

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
    }

  ]
})
