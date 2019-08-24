import {
  get_enter_competition
} from '@/api/enter'

export default {
  state: {
    enter_competition: {}
  },
  mutations: {
    setEnterCompetition (state, cp) {
      state.enter_competition = cp
    }
  },
  getters: {
    getEnterCompetition: state => state.enter_competition
  },
  actions: {
    handleGetEnterCompetition ({ state }, { id }) {
      return new Promise((resolve, reject) => {
        get_enter_competition(id).then(res => {
          if (res.data.state === 'SUCCESS') {
            state.enter_competition = res.data.body
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
