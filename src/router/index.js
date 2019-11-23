import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
// import iView from 'iview'
import ViewUI from 'view-design'
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
const HOME_PAGE_NAME = '_home'

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  const token = getToken()
  if (store.getters.getRoutes.length === 0) {
    store.dispatch('handleGetRoute').then(res => {
      // 跳转到登录页
      if (!res.flag) { next({ name: LOGIN_PAGE_NAME }) }
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
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    console.info('已登录且要跳转的页面是登录页')
    next({
      name: HOME_PAGE_NAME
    })
  } else {
    console.info('else')
    next()
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
  store.dispatch('handleGetUserInfo')
})

export default router
