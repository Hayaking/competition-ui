import {
  create_student_group,
  get_student_group,
  get_student_group_member_list,
  invite_student_member
} from '@/api/studentGroup'

export default {
  state: {},
  mutations: {},
  getters: {},
  actions: {
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
    handleGetStudentGroup ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_student_group(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetStudentGroupMemberList ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        if (groupId === undefined) {
          resolve({
            flag: false,
            body: '系统异常'
          })
        } else {
          get_student_group_member_list(groupId).then(res => {
            resolve({
              flag: res.data.state === 'SUCCESS',
              body: res.data.body
            })
          }).catch(err => {
            reject(err)
          })
        }
      })
    }
  }
}
