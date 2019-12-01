import {
  download_competition_budget_word,
  download_competition_word,
  download_enter_list_excel,
  download_result_word
} from '@/api/download'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleDownloadCompetitionWord ({ commit }, { competitionId }) {
      return new Promise((resolve) => {
        download_competition_word(competitionId).then(res => {
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
        })
      })
    },
    handleDownloadCompetitionBudgetWord ({ commit }, { competitionId }) {
      return new Promise((resolve) => {
        download_competition_budget_word(competitionId).then(res => {
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
        })
      })
    },
    handleDownloadEnterListExcel ({ commit }, { competitionId, progressId }) {
      return new Promise((resolve) => {
        download_enter_list_excel(competitionId, progressId).then(res => {
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
          resolve(true)
        })
      })
    },
    handleDownloadResultWord ({ commit }, { progressId }) {
      return new Promise((resolve) => {
        download_result_word(progressId).then(res => {
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
          resolve(true)
        })
      })
    }
  }
}
