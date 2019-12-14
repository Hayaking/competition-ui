import { create_works, get_works_by_id, get_works_list_by_group_id } from '@/api/work'
import { get_self_workload } from '@/api/workload'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleGetSelfWorkLoad ({ commit }, { pageNum,pageSize }) {
      return new Promise((resolve) => {
        get_self_workload( pageNum,pageSize).then(res => {
          resolve({
            state: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
