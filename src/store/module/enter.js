import { export_enter_excel, get_enter_list_by_competition_id } from '@/api/enter'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
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
    handleExportEnterExcel ({ commit }, { competitionId }) {
      return new Promise((resolve, reject) => {
        export_enter_excel(competitionId).then(res => {
          let val = res.headers['content-disposition'] + ''
          const blob = new Blob([res.data])
          const fileName = val.substring(val.indexOf('filename=') + 'filename='.length, val.length)
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
