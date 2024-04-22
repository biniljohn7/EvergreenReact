import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const listEvent = (body) => {
  setHeaders()
  return axios.post(`${BASE_URL}/event/list`, body).then((response) => {
    return response.data
  })
}

export const viewEvent = (id) => {
  setHeaders()
  return axios.get(`${BASE_URL}/event/view?eventId=${id}`).then((response) => {
    return response.data
  })
}

export const getDropdown = () => {
  setHeaders()
  return axios.get(`${BASE_URL}/event/dropdown`).then((response) => {
    return response.data
  })
}
