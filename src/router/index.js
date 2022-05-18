import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
const prototypePush = VueRouter.prototype.push
const prototypeReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    prototypePush.call(this, location, onComplete, onAbort)
  } else {
    prototypePush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    prototypeReplace.call(this, location, onComplete, onAbort)
  } else {
    prototypeReplace.call(this, location, () => {}, () => {})
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/MainViews'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/MainViews/HomeView'),
        redirect: '/',
        children: [
          {
            path: '/',
            name: 'homePage',
            component: () => import('../views/MainViews/HomeView/HomePage')
          },
          {
            path: 'artist',
            name: 'artist',
            component: () => import('../views/MainViews/HomeView/Artist')
          },
          {
            path: 'rankingList',
            name: 'rankingList',
            component: () => import('../views/MainViews/HomeView/RankingList')
          },
          {
            path: 'songList',
            name: 'songList',
            component: () => import('../views/MainViews/HomeView/SongList')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})

router.afterEach((to, from) => {
  nprogress.done()
})
export default router
