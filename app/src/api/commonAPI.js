import axios from 'axios'
import { BASE_URL, ISLOCAL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const signUp = (body) => {
  console.log(ISLOCAL);
  return axios.post(
    `${BASE_URL}${ISLOCAL ? '/public/' : '/member/signup'}`,
    body
  ).then((response) => {
    return response.data
  })
}

export const login = (body) => {
  return axios.post(`${BASE_URL}/member/login`, body).then((response) => {
    return response.data
  })
}

export const logout = () => {
  setHeaders()
  return axios.get(`${BASE_URL}/member/logout`).then((response) => {
    return response.data
  })
}

export const forgotPassword = (body) => {
  return axios
    .post(`${BASE_URL}/member/forgotpassword`, body)
    .then((response) => {
      return response.data
    })
}

export const verifyOTP = (body) => {
  return axios.post(`${BASE_URL}/member/verifyotp`, body).then((response) => {
    return response.data
  })
}

export const resetPassword = (body) => {
  return axios
    .post(`${BASE_URL}/member/resetpassword`, body)
    .then((response) => {
      return response.data
    })
}

export const contactUs = (body) => {
  return axios
    .post(`${BASE_URL}/contactus/normal/add`, body)
    .then((response) => {
      return response.data
    })
}

export const changePassword = (body) => {
  setHeaders()
  return axios
    .post(`${BASE_URL}/member/changepassword`, body)
    .then((response) => {
      return response.data
    })
}
