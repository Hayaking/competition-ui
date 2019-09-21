import {
  get_teacher_group,
  invite_teacher_member,
  invite_student_member,
  agree_teacher_group_invite,
  refuse_teacher_group_invite,
  create_teacher_group,
  create_student_group,
  get_teacher_group_all,
  set_teacher_group_state,
  get_teacher_group_inviting,
  get_student_group, search_teacher_group
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
    },
    handleGetAllTeacherGroup ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_teacher_group_all(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetTeacherGroupInviting ({ commit }) {
      return new Promise((resolve, reject) => {
        get_teacher_group_inviting().then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleInviteTeacherMember ({ commit }, { groupId, account }) {
      return new Promise((resolve, reject) => {
        invite_teacher_member(groupId, account).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleInviteStudentMember ({ commit }, { groupId, list }) {
      return new Promise((resolve, reject) => {
        invite_student_member(groupId, list).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleCreateTeacherGroup ({ commit }, { groupName }) {
      return new Promise((resolve, reject) => {
        create_teacher_group(groupName).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleCreateStudentGroup ({ commit }, { groupName }) {
      return new Promise((resolve, reject) => {
        create_student_group(groupName).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSetTeacherGroupState ({ commit }, { id, flag }) {
      return new Promise((resolve, reject) => {
        set_teacher_group_state(id, flag).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAgreeTeacherGroupInvite ({ state }, { groupId }) {
      return new Promise((resolve, reject) => {
        agree_teacher_group_invite(groupId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleRefuseTeacherGroupInvite ({ state }, { groupId }) {
      return new Promise((resolve, reject) => {
        refuse_teacher_group_invite(groupId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetStudentGroup ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_student_group(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSearchTeacherGroup ({ commit }, { key, pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        search_teacher_group(key, pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
