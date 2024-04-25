import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const getHomeData = (scope) => {
  setHeaders()
  return axios
    .get(`${BASE_URL}/member/?method=home-screen&scope=${scope}`)
    .then((response) => {
      return response.data
    })
}
