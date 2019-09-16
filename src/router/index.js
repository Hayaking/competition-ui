import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
// eslint-disable-next-line no-unused-vars
import { getToken, initRouterNode, setTitle } from '@/libs/util'
import config from '@/config'

const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()

  if (store.getters.getRoutes.length === 0 && store.getters.getToken) {
    let constRoutes = []
    let menuData = [
      {
        'path': '/',
        'name': '_home',
        'redirect': '/home',
        'component': 'Main',
        'meta': {
          'hideInMenu': 'false'
        },
        'children': [
          {
            'path': '/home',
            'name': 'home',
            'meta': {
              'hideInMenu': 'false',
              'title': '首页',
              'icon': 'md-home'
            },
            'component': 'home'
          }
        ]
      }
    ]
    store.dispatch('handleGetRoute').then(res => {
      if (!res) {
        next({
          name: LOGIN_PAGE_NAME // 跳转到登录页
        })
      } else {
        menuData = menuData.concat(res)
        initRouterNode(constRoutes, menuData)
        store.commit('setHomeRoute', menuData)
        store.commit('updateAppRouter', constRoutes)
      }
    })
  }

  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    console.info('未登录且要跳转的页面不是登录页')
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    console.info('未登陆且要跳转的页面是登录页')
    next() // 跳转
  } else if (token && to.name === homeName) {
    // 已登录且要跳转的页面是登录页
    console.info('已登录且要跳转的页面是登录页')
    next()
  } else {
    console.info('else')
    next()
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
