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
          if (res.data.state === 'SUCCESS') {
            switch (type) {
              case 'competition': commit('setCompetitionType', res.data.body)
                break
              case 'cost': commit('setCostType', res.data.body)
                break
              case 'join': commit('setJoinType', res.data.body)
                break
              case 'price': commit('setPriceType', res.data.body)
                break
            }
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
