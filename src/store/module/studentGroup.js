import {
  create_student_group,
  get_student_group_list,
  get_student_group_member_list,
  invite_student_member
} from '@/api/studentGroup'

export default {
  state: {
    student_group: {},
    student_group_list: [],
    /* 报名时 小组名字和小组成员 */
    group_name_for_enter: '',
    group_member_for_enter: {
      memberNum: 1,
      items: [
        {
          value: '',
          index: 1
        }
      ]
    }
  },
  mutations: {
    setStudentGroup (state, obj) {
      state.student_group = obj
    },
    setEnterGroupMember (state, obj) {
      state.group_member_for_enter = obj
    },
    setEnterGroupName (state, name) {
      state.group_name_for_enter = name
    },
    setStudentGroupList (state, list) {
      state.student_group_list = list
    }
  },
  getters: {
    getStudentGroup: state => state.student_group,
    getEnterGroupMember: state => state.group_member_for_enter,
    getEnterGroupName: state => state.group_name_for_enter,
    getStudentGroupList: state => state.student_group_list
  },
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
    handleGetStudentGroupList ({ commit }) {
      return new Promise((resolve) => {
        get_student_group_list().then(res => {
          commit('setStudentGroupList', res.data.body)
          commit('setStudentGroup', res.data.body[0])
          resolve(res.data.state === 'SUCCESS')
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
