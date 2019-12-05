import {
  create_teacher_group,
  delete_teacher_group,
  exit_teacher_group,
  get_teacher_by_group_id,
  get_teacher_group_all,
  get_teacher_group_inviting,
  get_teacher_group_list,
  invite_teacher_member,
  remove_teacher_from_group, review_teacher_group_invite,
  search_teacher_group,
  set_teacher_group_state
} from '@/api/teacherGroup'

export default {
  state: {
    group_for_cards: {},
    group_list: [],
    group_for_competition_list: {}
  },
  mutations: {
    setGroupList (state, obj) {
      state.group_list = obj
    },
    setTeacherGroup (state, obj) {
      state.group_for_cards = obj
    },
    setTeacherGroupForCompetitionList (state, obj) {
      state.group_for_competition_list = obj
    }
  },
  getters: {
    getTeacherGroupList: state => state.group_list,
    getTeacherGroup: state => state.group_for_cards,
    getTeacherGroupForCompetitionList: state => state.group_for_competition_list
  },
  actions: {
    /**
     * 获取所在工作组
     * @param commit
     * @returns {Promise<unknown>}
     */
    handleGetTeacherGroupList ({ commit }) {
      return new Promise((resolve) => {
        get_teacher_group_list().then(res => {
          commit('setGroupList', res.data.body)
          resolve(res.data.body)
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
    handleInviteTeacherMember ({ commit }, { groupId, teacherId }) {
      return new Promise((resolve, reject) => {
        invite_teacher_member(groupId, teacherId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleCreateTeacherGroup ({ commit }, { group }) {
      return new Promise((resolve, reject) => {
        create_teacher_group(group).then(res => {
          resolve(res.data.state === 'SUCCESS')
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
    handleReviewTeacherGroupInvite ({ state }, { flag, groupId }) {
      return new Promise((resolve) => {
        review_teacher_group_invite(flag, groupId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        })
      })
    },
    // handleAgreeTeacherGroupInvite ({ state }, { groupId }) {
    //   return new Promise((resolve, reject) => {
    //     agree_teacher_group_invite(groupId).then(res => {
    //       if (res.data.state === 'SUCCESS') {
    //         resolve(true)
    //       }
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // handleRefuseTeacherGroupInvite ({ state }, { groupId }) {
    //   return new Promise((resolve, reject) => {
    //     refuse_teacher_group_invite(groupId).then(res => {
    //       if (res.data.state === 'SUCCESS') {
    //         resolve(true)
    //       }
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    handleSearchTeacherGroup ({ commit }, { key, pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        search_teacher_group(key, pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleExitTeacherGroup ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        exit_teacher_group(groupId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetTeacherByGroupId ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        if (groupId !== undefined) {
          get_teacher_by_group_id(groupId).then(res => {
            resolve({
              flag: res.data.state === 'SUCCESS',
              body: res.data.body
            })
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve({ flag: false })
        }
      })
    },
    handleRemoveTeacherFromGroup ({ commit }, { groupId, teacherId }) {
      return new Promise((resolve, reject) => {
        remove_teacher_from_group(groupId, teacherId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeleteTeacherGroup ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        delete_teacher_group(groupId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
