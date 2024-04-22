import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const getContacts = (body) => {
  setHeaders()
  return axios
    .get(
      `${BASE_URL}/chat/contact?filter=${body.filter}&pageId=${body.pageId}&search=${body.search}`,
    )
    .then((response) => {
      return response.data
    })
}

export const getProfile = (memberId) => {
  setHeaders()
  return axios
    .get(`${BASE_URL}/member/chatProfile?memberId=${memberId}`)
    .then((response) => {
      return response.data
    })
}
