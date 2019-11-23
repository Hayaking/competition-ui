import {
  get_all_route,
  get_menu_by_role_id,
  get_route,
  save_menu,
  set_role_and_menu,
  set_role_and_menu1
} from '@/api/routers'
import { initRouterNode, removeToken } from '@/libs/util'
import theme from 'echarts/src/theme/dark'
import store from '@/store'

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
    handleGetAllMenu ({ commmit }) {
      return new Promise((resolve, reject) => {
        get_all_route().then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetMenuListByRoleId ({ commmit }, { roleId }) {
      return new Promise((resolve, reject) => {
        get_menu_by_role_id(roleId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
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
    },
    handleSetRoleAndMenu ({ commit }, { roleId, menu1Id, menu2Id, flag, tag }) {
      return new Promise((resolve) => {
        tag
          ? set_role_and_menu1(roleId, menu1Id, flag).then(res => {
            resolve(res.data.state === 'SUCCESS')
          })
          : set_role_and_menu(roleId, menu1Id, menu2Id, flag).then(res => {
            resolve(res.data.state === 'SUCCESS')
          })
      })
    }
  }
}
