import { get_teacher_group_log } from '@/api/groupLog'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetTeacherGroupLog ({ commit }, { groupId, pageNum, pageSize }) {
      return new Promise((resolve) => {
        get_teacher_group_log(groupId, pageNum, pageSize).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
