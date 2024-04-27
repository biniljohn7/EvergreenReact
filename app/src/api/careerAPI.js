import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const listCareer = (body) => {
  setHeaders()
  return axios
    .post(`${BASE_URL}/member/?method=career-list`, body)
    .then((response) => {
      return response.data
    })
}

export const viewCareer = (id) => {
  setHeaders()
  return axios
    .get(`${BASE_URL}/member/?method=career-view&careerid=${id}`)
    .then((response) => {
      return response.data
    })
}
