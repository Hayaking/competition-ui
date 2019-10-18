import { get_lead_apply, search_lead, set_lead_apply_state } from '@/api/lead'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetLeadApplyPage ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_lead_apply(pageNum, pageSize).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          }
          resolve(false)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSetLeadApplyState ({ commit }, { flag, joinId }) {
      return new Promise((resolve, reject) => {
        set_lead_apply_state(flag, joinId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSearchLead ({ commit }, { pageNum, pageSize, key }) {
      return new Promise((resolve, reject) => {
        search_lead(pageNum, pageSize, key).then(res => {
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
