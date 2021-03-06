import {
  getBreadCrumbList,
  getHomeRoute,
  getMenuByRouter,
  getNextRoute,
  getRouteTitleHandled,
  getTagNavListFromLocalstorage, initRouterNode,
  localRead,
  localSave, removeToken,
  routeEqual,
  routeHasExist,
  setTagNavListInLocalstorage
} from '@/libs/util'
import { saveErrorLogger } from '@/api/data'
import router from '@/router'
import otherRouters from '@/router/routers'
import config from '@/config'
import { get_route } from '@/api/routers'

const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false,
    routers: []
  },
  getters: {
    menuList: (state, getters, rootState) => {
      otherRouters.forEach(item => {
        state.routers.push(item)
      })
      return getMenuByRouter(state.routers, rootState.user.access)
    },
    errorCount: state => state.errorList.length,
    getRoutes: state => state.routers
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    },
    // 动态添加主界面路由，需要缓存
    updateAppRouter (state, routes) {
      state.routers.push(...routes)
      router.addRoutes(routes)
    },
    // 动态添加全局路由，不需要缓存
    updateDefaultRouter (state, routes) {
      router.addRoutes(routes)
    },
    // 接受前台数组，刷新菜单
    updateMenulist (state, routes) {
      state.menuList = routes
    }
  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    },
    handleGetRoute ({ commit }) {
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
      return new Promise((resolve) => {
        get_route().then(res => {
          if (res.data.state === 'SUCCESS') {
            menuData = menuData.concat(res.data.body)
            initRouterNode(constRoutes, menuData)
            commit('setHomeRoute', menuData)
            commit('updateAppRouter', constRoutes)
            resolve({
              flag: false,
              body: res.data.body
            })
          } else {
            removeToken()
            resolve({ flag: false })
          }
        })
      })
    }
  }
}
