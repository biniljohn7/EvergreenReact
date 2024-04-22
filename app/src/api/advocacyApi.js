import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const listAdvocacy = (body) => {
  setHeaders()
  return axios.post(`${BASE_URL}/advocacy/list`, body).then((response) => {
    return response.data
  })
}

export const viewAdvocacy = (id, type) => {
  setHeaders()
  return axios
    .get(`${BASE_URL}/advocacy?advocacyId=${id}&advocacyType=${type}`)
    .then((response) => {
      return response.data
    })
}

export const takeAction = (body, id) => {
  setHeaders()
  return axios
    .post(`${BASE_URL}/advocacy/approve?advocacyId=${id}`, body)
    .then((response) => {
      return response.data
    })
}
