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

export const recentChatsApi = (body) => {
    setHeaders()
    return axios
        .get(
            `${BASE_URL}/member/?method=recent-chat`,
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

export const txtSendApi = (body) => {
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

export const imgSendApi = (body) => {
    setHeaders();
    return axios.post(
        BASE_URL + '/member/?method=message-file-upload',
        body
    ).then((response) => {
        return response.data;
    });
};

export const getProfile = (memberId) => {
    setHeaders()
    return axios
        .get(`${BASE_URL}/member/?method=member-profile&memberId=${memberId}`)
        .then((response) => {
            return response.data
        })
}
