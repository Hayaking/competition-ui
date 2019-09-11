import {
  get_role_list,
  get_student_role,
  add_student_role,
  delete_student_role,
  get_teacher_role,
  add_teacher_role,
  delete_teacher_role
} from '@/api/role'

export default {
  state: {
    all_role: [],
    user_roles: []
  },
  mutations: {
    setAllRole (state, all) {
      state.all_role = all
    },
    setUserRoles (state, all) {
      state.user_roles = all
    }
  },
  getters: {
    getAllRole: state => state.all_role,
    getUserRoles: state => state.user_roles
  },
  actions: {
    handleGetRoleList ({ commit }) {
      return new Promise((resolve, reject) => {
        get_role_list().then(res => {
          if (res.data.state === 'SUCCESS') {
            commit('setAllRole', res.data.body)
            resolve(res.data.body)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetStudentRole ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        get_student_role(id).then(res => {
          commit('setUserRoles', res.data.body)
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetTeacherRole ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        get_teacher_role(id).then(res => {
          commit('setUserRoles', res.data.body)
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAddStudentRole ({ commit }, { id, roleId }) {
      return new Promise((resolve, reject) => {
        add_student_role(id, roleId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAddTeacherRole ({ commit }, { id, roleId }) {
      return new Promise((resolve, reject) => {
        add_teacher_role(id, roleId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeleteStudentRole ({ commit }, { id, roleId }) {
      return new Promise((resolve, reject) => {
        delete_student_role(id, roleId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeleteTeacherRole ({ commit }, { id, roleId }) {
      return new Promise((resolve, reject) => {
        delete_teacher_role(id, roleId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
