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
import searchAlbum from '../components/search/searchAlbum'
import searchSong from '../components/search/searchSong'
import searchSongList from '../components/search/searchSongList'
import searchUser from '../components/search/searchUser'
import follow from '../components/profile/follow'
import friend from '../components/profile/friend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [
        {
          path: 'login',
          component: login
        },
        {
          path: 'register',
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
              path: 'mylike',
              component: mylike
            },
            {
              path: 'follow',
              component: follow
            },
            {
              path: 'friend',
              component: friend
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
          path: 'Song',
          component:searchSong
        },
        {
          path: 'SongList',
          component:searchSongList
        },
        {
          path: 'User',
          component:searchUser
        },
        {
          path: 'Album',
          component: searchAlbum
        }
      ]
    }

  ]
})
