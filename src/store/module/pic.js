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
          resolve({ flag: false })
        })
      } else {
        return new Promise((resolve, reject) => {
          upload_pic(formData).then(res => {
            resolve({
              flag: res.data.state === 'SUCCESS',
              body: res.data.body
            })
          })
        })
      }
    }
  }
}
