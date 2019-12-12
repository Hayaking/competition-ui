import {
  get_role_list,
  get_student_role,
  add_student_role,
  delete_student_role,
  get_teacher_role,
  add_teacher_role,
  delete_teacher_role, get_self_role_list, get_user_page_by_role
} from '@/api/role'

export default {
  state: {
    all_role: [],
    user_roles: [],
    self_role_list: []
  },
  mutations: {
    setAllRole (state, all) {
      state.all_role = all
    },
    setUserRoles (state, all) {
      state.user_roles = all
    },
    setSelfRoleList (state, all) {
      state.self_role_list = all
    }
  },
  getters: {
    getAllRole: state => state.all_role,
    getUserRoles: state => state.user_roles,
    getSelfRoleList: state => state.self_role_list
  },
  actions: {
    handleGetSelfRoleList ({ commit }) {
      return new Promise((resolve) => {
        get_self_role_list().then(res => {
          commit('setSelfRoleList', res.data.body)
          resolve(res.data.state === 'SUCCESS')
        })
      })
    },
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
    },
    handleGetUserPageByRole ({ commit }, { id, pageNum, pageSize }) {
      return new Promise((resolve) => {
        get_user_page_by_role(id, pageNum, pageSize).then(res => {
          resolve({
            state: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
