import { upload_pic } from '@/api/pic'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleUploadPic ({ commit }, { formData }) {
      if (!formData.get('file')) {
        return new Promise((resolve) => {
          resolve(0)
        })
      } else {
        return new Promise((resolve, reject) => {
          upload_pic(formData).then(res => {
            if (res.data.state === 'SUCCESS') {
              resolve(res.data.body)
            }
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  }
}
