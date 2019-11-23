import {
  delete_join,
  get_join_list,
  get_join_list_by_progress_Id,
  get_simple_join_list_by_group_id, review_join_in_progress,
  set_enter_state
} from '@/api/join'

export default {
  state: {
    join_for_edit: {},
    simple_join_list: [],
    refresh_flag: false
  },
  mutations: {
    setEditJoin (state, join) {
      state.join_for_edit = join
    },
    setSimpleJoinList (state, list) {
      state.simple_join_list = list
    },
    setRefreshFlag (state, flag) {
      state.refresh_flag = flag
    }
  },
  getters: {
    getEditJoin: state => state.join_for_edit,
    getSimpleJoinList: state => state.simple_join_list,
    getRefreshFlag: state => state.refresh_flag
  },
  actions: {
    handleDeleteJoin ({ commit }, { id }) {
      return new Promise((resolve) => {
        delete_join(id).then(res => {
          resolve(res.data.state === 'SUCCESS')
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
    handleSetJoinEnterState ({ commit }, { inProgressId, flag }) {
      return new Promise((resolve, reject) => {
        set_enter_state(inProgressId, flag).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetJoinListByProgressId ({ commit }, { pageNum, pageSize, progressId }) {
      return new Promise((resolve) => {
        get_join_list_by_progress_Id(pageNum, pageSize, progressId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handleReviewJoinInProgress ({ commit }, { inProgressId, reviewState, editState }) {
      return new Promise((resolve) => {
        review_join_in_progress(inProgressId, reviewState, editState).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
