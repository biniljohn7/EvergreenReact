import axios from 'axios'
import { BASE_URL } from '../helper/constant'

export const acceptTerms = (obj) => {
  return axios
    .put(`${BASE_URL}/merchant/accept-terms`, obj)
    .then((response) => {
      return response.data
    })
}
