import axios from '@/libs/api.request'

export const upload_pic = (formData) => {
  return axios.request({
    url: `pic`,
    data: formData,
    method: 'post'
  })
}
