import {
  get_role_list,
  get_student_role,
  add_student_role,
  delete_student_role
} from '@/api/role'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetRoleList ({ commit }) {
      return new Promise((resolve, reject) => {
        get_role_list().then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetStudentRole ({ commit }, { account }) {
      return new Promise((resolve, reject) => {
        get_student_role(account).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAddStudentRole ({ commit }, { account, roleId }) {
      return new Promise((resolve, reject) => {
        add_student_role(account, roleId).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeleteStudentRole ({ commit }, { account, roleId }) {
      return new Promise((resolve, reject) => {
        delete_student_role(account, roleId).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
