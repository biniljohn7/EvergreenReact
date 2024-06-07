import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export let EvApi = axios.create({
    baseURL: BASE_URL,
    headers: {}
});


export const signUp = (body) => {
    return axios.post(
        BASE_URL + '/public/?method=signup',
        body
    ).then((response) => {
        return response.data
    })
}

export const logInViaSMedia = (body) => {
    return axios.post(
        BASE_URL + '/public/?method=login-via-smedia',
        body
    ).then((response) => {
        return response.data
    })
}

export const login = (body) => {
    return axios.post(
        BASE_URL + '/public/?method=login',
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
        .post(`${BASE_URL}/public/?method=otp-send`, body)
        .then((response) => {
            return response.data
        })
}

export const verifyOTP = (body) => {
    return axios.post(`${BASE_URL}/public/?method=otp-verify`, body).then((response) => {
        return response.data
    })
}

export const resetPassword = (body) => {
    return axios
        .post(`${BASE_URL}/public/?method=password-reset`, body)
        .then((response) => {
            return response.data
        })
}

export const contactUs = (body) => {
    return axios
        .post(`${BASE_URL}/public/?method=enquiry`, body)
        .then((response) => {
            return response.data
        })
}

export const changePassword = (body) => {
    //setHeaders()
    return axios
        .post(`${BASE_URL}/member/?method=change-password`, body)
        .then((response) => {
            return response.data
        })
}
