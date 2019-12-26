import { get_user_info, login, logout, sign } from '@/api/user'
import { getInfo, getToken, removeInfo, removeToken, setInfo, setToken } from '@/libs/util'

export default {
  state: {
    user: getInfo(),
    token: getToken(),
    isStudent: true,
    access: []
  },
  mutations: {
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUser (state, user) {
      state.user = user
      setInfo(user)
    },
    setIsStudent (state, flag) {
      state.isStudent = flag
    }
  },
  getters: {
    getUserInfo: state => state.user,
    getUserId: state => state.user.id,
    getIsStudent: state => state.isStudent
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { token }) {
      return new Promise((resolve, reject) => {
        login(token).then(res => {
          commit('setToken', res.data.body)
          resolve(res.data.state === 'SUCCESS')
        })
      }).catch(err => {
        console.info(err)
      })
    },
    // 退出登录
    handleLogOut ({ commit }) {
      return new Promise((resolve) => {
        logout().then(res => {
          removeToken()
          removeInfo()
          resolve(res.data.body)
        })
      })
    },
    // 获取用户相关信息
    handleGetUserInfo ({ commit }) {
      return new Promise((resolve) => {
        // if (!getInfo()) {
        get_user_info().then(res => {
          commit('setUser', res.data.body[1])
          commit('setIsStudent', res.data.body[0] === 0)
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body.id
          })
        })
        // } else {
        //   resolve({
        //     flag: true,
        //     body: getInfo()
        //   })
        // }
      })
    },
    // 注册
    handleSign ({ state }, { student }) {
      return new Promise((resolve) => {
        sign(student).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
