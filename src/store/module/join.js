import { delete_join, get_join_list, get_simple_join_list_by_group_id, set_enter_state } from '@/api/join'

export default {
  state: {
    join_for_edit: {},
    simple_join_list: []
  },
  mutations: {
    setEditJoin (state, join) {
      state.join_for_edit = join
    },
    setSimpleJoinList (state, list) {
      state.simple_join_list = list
    }
  },
  getters: {
    getEditJoin: state => state.join_for_edit,
    getSimpleJoinList: state => state.simple_join_list
  },
  actions: {
    handleDeleteJoin ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        delete_join(id).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetJoinList ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_join_list(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetSimpleJoinList ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        if (groupId === undefined) {
          resolve({
            flag: false,
            body: '系统异常'
          })
        } else {
          get_simple_join_list_by_group_id(groupId).then(res => {
            commit('setSimpleJoinList', res.data.body)
            resolve(res.data.state === 'SUCCESS')
          }).catch(err => {
            reject(err)
          })
        }
      })
    },
    handleSetJoinEnterState ({ commit }, { joinId, flag }) {
      return new Promise((resolve, reject) => {
        set_enter_state(joinId, flag).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
