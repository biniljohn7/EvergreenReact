import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const getBenefitCategory = () => {
  setHeaders()
  return axios.get(`${BASE_URL}/member/?method=benefit-category`).then((response) => {
    return response.data
  })
}

export const listBenefit = (body) => {
  setHeaders()
  return axios.post(`${BASE_URL}/member/?method=benefit-list`, body).then((response) => {
    return response.data
  })
}

export const viewBenefit = (body) => {
  setHeaders()
  return axios.post(`${BASE_URL}/member/?method=benefit-view`, body).then((response) => {
    return response.data
  })
}

export const searchBenefit = (body) => {
  setHeaders()
  return axios.post(`${BASE_URL}/member/?method=benefit-search`, body).then((response) => {
    return response.data
  })
}
