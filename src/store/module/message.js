import { get_message, set_read_message } from '@/api/message'

export default {
  state: {
    system_message: [],
    invite_message: []
  },
  mutations: {
    setSystemMessage (state, list) {
      state.system_message = list
    },
    setInviteMessage (state, list) {
      state.invite_message = list
    }
  },
  getters: {
    getSystemMessage: state => state.system_message,
    getInviteMessage: state => state.invite_message
  },
  actions: {
    handleGetMessage ({ commit }) {
      return new Promise((resolve) => {
        get_message().then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          } else {
            resolve(false)
          }
        })
      })
    },
    handleSetReadMessage ({ commit }, { id }) {
      return new Promise((resolve) => {
        set_read_message(id).then(res => {
          resolve(res.data.state === 'SUCCESS')
        })
      })
    }
  }
}
