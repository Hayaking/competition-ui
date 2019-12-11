import { get_enter_list, get_enter_list_by_competition_id, promotion } from '@/api/enter'
import { create_join } from '@/api/join'

export default {
  state: {
    enter_holder: {
      group: {
        name: ''
      },
      list: [],
      works: {
        worksName: '',
        des: ''
      },
      join: {
        competitionId: 0,
        teacherId1: 0,
        teacherId2: 0
      }
    }
  },
  mutations: {
    setEnterHolder (state, obj) {
      state.enter_holder = obj
    },
    setEnterHolderGroup (state, obj) {
      state.enter_holder.group = obj
    },
    setEnterHolderList (state, obj) {
      state.enter_holder.list = obj
    },
    setEnterHolderWorks (state, obj) {
      state.enter_holder.works = obj
    },
    setEnterHolderJoin (state, obj) {
      state.enter_holder.join = obj
    }
  },
  getters: {
    getEnterHolder: state => state.enter_holder
  },
  actions: {
    handleEnter ({ commit }, { group, list, works, join }) {
      return new Promise((resolve, reject) => {
        create_join(group, list, works, join).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetEnterListByCompetitionId ({ commit }, { pageNum, pageSize, competitionId }) {
      return new Promise((resolve, reject) => {
        get_enter_list_by_competition_id(pageNum, pageSize, competitionId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          } else {
            resolve(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetEnterList ({ commit }, { pageNum, pageSize, competitionId, progressId }) {
      return new Promise((resolve) => {
        get_enter_list(pageNum, pageSize, competitionId, progressId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handlePromotion ({ commit }, { joinInProgressId, flag }) {
      return new Promise((resolve) => {
        promotion(joinInProgressId, flag).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS'
          })
        })
      })
    }
  }
}
