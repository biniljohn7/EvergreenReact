import axios from 'axios'
import { BASE_URL } from '../helper/constant'
import { setHeaders } from './apiHelpers'

export const listAdvocacy = (body) => {
    setHeaders()
    return axios.post(`${BASE_URL}/member/?method=advocacy-list`, body).then((response) => {
        return response.data
    })
}

export const viewAdvocacy = (id, type) => {
    setHeaders()
    return axios
        .get(`${BASE_URL}/member/?method=advocacy-details&id=${id}&type=${type}`)
        .then((response) => {
            return response.data
        })
}

export const takeAction = (body, id) => {
    setHeaders()
    return axios
        .post(`${BASE_URL}/member/?method=advocacy-approve&id=${id}`, body)
        .then((response) => {
            return response.data
        })
}
