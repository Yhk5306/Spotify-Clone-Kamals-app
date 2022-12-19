import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/play-list',
    name: 'playlist',
    component: () => import('../views/PlayList')
  },
  {
    path: '/play-list/:trackId',
    name: 'playlistDetail',
    component: () => import('../views/PlaylistsDetail')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreatePlaylist')
  },
  {
    path: '/search/:search',
    name: 'search',
    component: () => import('../views/SearchView'),
    params:true
  },
  {
    path: '/artist/:artist',
    name:'artist',
    component: () => import('../views/ArtistDetail')
  },
  {
    path: '/liked',
    name: 'liked',
    component: () => import('../views/Liked')
  },
  {
    path:'/que',
    name:'que',
    component: () => import('../components/Player/Queue')
  },
  {
    path: '/album/:albumId',
    name:'album',
    component: () => import('../views/AlbumDetail')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: "history",
  linkExactActiveClass: "active",
  routes
})

export default router
