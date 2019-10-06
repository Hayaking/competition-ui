import { get_user_info, login, logout, sign } from '@/api/user'
import { getToken, getType, setToken, setType } from '@/libs/util'

export default {
  state: {
    user: {
      account: ''
    },
    hasGetInfo: false,
    // 当前用户类型;将type存入localstage
    type: getType(),
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
    setStudentInfo (state, obj) {
      state.student = obj
    },
    setUser (state, user) {
      state.user = user
    },
    setType (state, type) {
      state.type = type
      setType(type)
    }
  },
  getters: {
    getToken: state => state.token,
    getUserInfo: state => state.user
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { type, account, password }) {
      account = account.trim()
      return new Promise((resolve, reject) => {
        login(type, account, password).then(res => {
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
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          localStorage.removeItem('tagNaveList')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    handleGetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        get_user_info().then(res => {
          let data = res.data
          if (data.state === 'SUCCESS') {
            commit('setUser', data.body)
          }
          resolve(data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 注册
    handleSign ({ state }, { account, password }) {
      console.info('handle')
      console.info(account + ',' + password)
      return new Promise((resolve, reject) => {
        sign(account, password).then(res => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
