import axios from '@/libs/api.request'

export const create_price = (price, certificate) => {
  return axios.request({
    url: `price`,
    data: { price: price, certificate: certificate },
    method: 'post'
  })
}
