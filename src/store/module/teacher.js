import {
  get_all_teacher,
  get_teacher_by_group_id,
  get_all_teacher_by_page
} from '@/api/teacher'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetAllTeacher ({ commit }) {
      return new Promise((resolve, reject) => {
        get_all_teacher().then(res => {
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
    handleGetTeacherByGroupId ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        get_teacher_by_group_id(groupId).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
