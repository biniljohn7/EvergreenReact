import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const getContacts = (body) => {
    setHeaders()
    return axios
        .get(
            `${BASE_URL}/member/?method=contact-list&filter=${body.filter}&pageId=${body.pageId}&search=${body.search}`,
        )
        .then((response) => {
            return response.data
        })
}

export const msgLoadApi = (body) => {
    setHeaders()
    return axios
        .get(
            `${BASE_URL}/member/?method=messages-load&id=${body.id}&pgn=${body.pgn}`,
        )
        .then((response) => {
            return response.data
        })
}

export const msgSendApi = (body) => {
    setHeaders()
    return axios
        .post(
            `${BASE_URL}/member/?method=message-send`,
            body
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
