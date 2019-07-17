import {
  get_all_student_by_page,
  update_student
} from '@/api/student'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetAllStudent ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_all_student_by_page(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleUpdate ({ commit }, { student }) {
      return new Promise((resolve, reject) => {
        update_student(student).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
