import {
  get_route,
  get_all_route,
  save_menu
} from '@/api/routers'
import { removeToken, setToken } from '@/libs/util'

export default {
  state: {
    edit_menu: {
      meta: {}
    }
  },
  mutations: {
    setEditMenu (state, menu) {
      state.edit_menu = menu
    }
  },
  getters: {
    getEditMenu: state => state.edit_menu
  },
  actions: {
    handleGetRoute ({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        get_route().then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          } else {
            removeToken()
            resolve(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetAllRoute ({ commmit }) {
      return new Promise((resolve, reject) => {
        get_all_route().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSaveMenu ({ commit }, { menu }) {
      return new Promise((resolve, reject) => {
        save_menu(menu).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
