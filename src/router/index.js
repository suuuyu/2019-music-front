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
import balance from '../components/profile/balance'
import myBought from '../components/profile/myBought'
import alogin from '../components/alogin'
import admin from '../container/admin'
import MyData from '../components/admin/MyData'
import ManageSong from '../components/admin/ManageSong'
import ManageAlbum from '../components/admin/ManageAlbum'
import ManageSinger from '../components/admin/ManageSinger'
import BanUser from '../components/admin/BanUser'
import myCreated from '../components/profile/myCreated'
import songListDetail from '../components/detail/songListDetail'
import player from '../components/Player'
import recorder from '../components/recorder'
import albumDetail from '../components/detail/albumDetail'
Vue.use(Router)

export default new Router({
  routes: [
    // For Development
    {
      path: '/hello/',
      component: HelloWorld,
      children: [
        {
          path: '/login',
          component: login
        },
        {
          path: '/register',
          component: register
        },
        {
          path: '/alogin',
          component: alogin
        }
      ]
    },
    {
      path: '/admin',
      component: admin
    },
    {
      path: '/player',
      component: player
    },
    {
      path: '/recorder',
      component: recorder
    },
    {
      path: '/',
      component: inner,
      children: [
        {
          path: '/',
          component: () => import('@/components/index')
        },
        {
          path: '/song/:songid',
          component: songDetail
        },
        {
          path: '/songList/:songListID',
          component: songListDetail
        },
        {
          path: '/album/:albumId',
          component: albumDetail
        },
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
            },
            {
              path: 'myCreated',
              component: myCreated
            },
            {
              path: 'balance',
              component: balance
            },
            {
              path: 'myBought',
              component: myBought
            }
          ]
        },
        {
          path: '/search',
          component: search,
          children: [
            {
              path: 'Song',
              component: searchSong
            },
            {
              path: 'SongList',
              component: searchSongList
            },
            {
              path: 'User',
              component: searchUser
            },
            {
              path: 'Album',
              component: searchAlbum
            }
          ]
        }

      ]
    },
    {
      path: '/admin',
      component: admin,
      children: [
        {
          path: 'MyData',
          component: MyData
        },
        {
          path: 'ManageSong',
          component: ManageSong
        },
        {
          path: 'ManageAlbum',
          component: ManageAlbum
        },
        {
          path: 'ManageSinger',
          component: ManageSinger
        },
        {
          path: 'BanUser',
          component: BanUser
        }
      ]
    }

  ]
})
