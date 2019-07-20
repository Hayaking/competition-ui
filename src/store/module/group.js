import {
  get_teacher_group,
  invite_teacher_member
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
    }
  }
}
