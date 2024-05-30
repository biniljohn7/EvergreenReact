import axios from 'axios'
import { BASE_URL } from '../helper/constant'

const getPage = (pageId) => {
    return axios
        .get(`${BASE_URL}/public/?method=cms-content&pageId=${pageId}`)
        .then((response) => {
            return response.data
        })
}
export { getPage }
