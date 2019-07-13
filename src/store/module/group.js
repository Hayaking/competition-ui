import {
  get_teacher_group
} from '@/api/group'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetTeacherGroup ({ commit }) {
      return new Promise((resolve, reject) => {
        get_teacher_group().then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
