import axios from 'axios'
import { BASE_URL, ISLOCAL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export let EvApi = axios.create({
  baseURL: BASE_URL,
  headers: {}
});


export const signUp = (body) => {
  return axios.post(
    BASE_URL + (ISLOCAL ? '/public/' : '/member/signup'),
    body
  ).then((response) => {
    return response.data
  })
}

export const login = (body) => {
  // return EvApi.post(
  //   ISLOCAL ? '/public/' : '/member/login',
  //   body
  // ).then((response) => {
  //   console.log(response.data);
  //   return response.data
  // })
  return axios.post(
    BASE_URL + (ISLOCAL ? '/public/' : '/member/login'),
    body
  ).then((response) => {
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
