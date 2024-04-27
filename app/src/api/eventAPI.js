import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const listEvent = (body) => {
  setHeaders()
  return axios.post(`${BASE_URL}/member/?method=event-list`, body).then((response) => {
    return response.data
  })
}

export const viewEvent = (id) => {
  setHeaders()
  return axios.get(`${BASE_URL}/member/?method=event-view&id=${id}`).then((response) => {
    return response.data
  })
}

export const getDropdown = () => {
  setHeaders()
  return axios.get(`${BASE_URL}/member/?method=event-dropdown`).then((response) => {
    return response.data
  })
}
