import {
  get_all_teacher,
  get_teacher_by_group_id,
  get_all_teacher_by_page,
  get_lead_teacher_list,
  search_teacher_by_page
} from '@/api/teacher'

export default {
  state: {
    allTeacher: []
  },
  mutations: {
    setAllTeacher (state, all) {
      state.allTeacher = all
    }
  },
  getters: {
    getAllTeacher: state => state.allTeacher
  },
  actions: {
    handleGetAllTeacher ({ commit }) {
      return new Promise((resolve, reject) => {
        get_all_teacher().then(res => {
          commit('setAllTeacher', res.data.body)
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetAllTeacherByPage ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_all_teacher_by_page(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSearchTeacher ({ commit }, { key, pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        search_teacher_by_page(key, pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetTeacherByGroupId ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        get_teacher_by_group_id(groupId).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetLeadTeacherList ({ commit }) {
      return new Promise((resolve, reject) => {
        get_lead_teacher_list().then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
