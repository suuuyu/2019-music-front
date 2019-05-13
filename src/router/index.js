import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../container/HelloWorld'
import inner from '../container/inner'
import userDetail from '../components/userDetail'
import login from '../components/login'
import register from '../components/register'
import songDetail from '../components/detail/songDetail'
import mylike from '../components/profile/mylike'
import search from '../container/search'
import searchAlbum from '../components/searchAlbum'
import searchSong from '../components/searchSong'
import searchSongList from '../components/searchSongList'
import searchUser from '../components/searchUser'

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
        },
        // {
        //   path: '/songList/:songid',
        //   component: songListDetail
        // },
        // {
        //   path: '/singer/:songid',
        //   component: singerDetail
        // },
        {
          path: '/profile/:userid',
          component: userDetail,
          children: [
            {
              path: '/profile/:userid/mylike',
              component: mylike
            }
          ]
        },

      ]
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: '/search/Song',
          component:searchSong
        },
        {
          path: '/search/SongList',
          component:searchSongList
        },
        {
          path: 'search/User',
          component:searchUser
        },
        {
          path: 'search/Album',
          component: searchAlbum
        }
      ]
    }

  ]
})
