import {
  save_competition
} from '@/api/competition'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    saveCompetition ({ state, commit }, { cp }) {
      return new Promise((resolve, reject) => {
        save_competition(cp).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
