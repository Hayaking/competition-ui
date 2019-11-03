import {
  get_type
} from '@/api/type'

export default {
  state: {
    type_competition: [],
    type_cost: [],
    type_join: [],
    type_price: []
  },
  mutations: {
    setCompetitionType (state, type) {
      state.type_competition = type
    },
    setCostType (state, type) {
      state.type_cost = type
    },
    setJoinType (state, type) {
      state.type_join = type
    },
    setPriceType (state, type) {
      state.type_price = type
    }
  },
  getters: {
    getCompetitionType: state => state.type_competition
  },
  actions: {
    handleGetType ({ commit, state }, { type }) {
      return new Promise((resolve, reject) => {
        let obj
        get_type(type).then(res => {
          obj = { flag: res.data.state === 'SUCCESS', body: res.data.body }
          resolve(obj)
        })
      })
    }
  }
}
