import {
  get_type
} from '@/api/type'
import FunnelSeries from 'echarts/src/chart/funnel/FunnelSeries'

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
    handleGetType ({ commit }, { type }) {
      return new Promise((resolve, reject) => {
        get_type(type).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
