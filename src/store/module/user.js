import { get_user_info, login, logout, sign } from '@/api/user'
import { getToken, setToken } from '@/libs/util'

export default {
  state: {
    user: {
      account: ''
    },
    hasGetInfo: false,
    token: getToken(),
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
    }
  },
  getters: {
    getToken: state => state.token,
    getUserInfo: state => state.user
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { token }) {
      return new Promise((resolve, reject) => {
        login(token).then(res => {
          if (res.data.state === 'SUCCESS') {
            commit('setToken', res.data.body)
          }
          resolve(res.data.state)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit('setToken', '')
          commit('setAccess', [])
          localStorage.removeItem('tagNaveList')
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    handleGetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        get_user_info().then(res => {
          if (res.data.state === 'SUCCESS') {
            commit('setUser', res.data.body)
          }
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 注册
    handleSign ({ state }, { student }) {
      return new Promise((resolve, reject) => {
        sign(student).then(res => {
          resolve({
            'flag': res.data.state === 'SUCCESS',
            'body': res.data.body
          })
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
