import { store } from '../redux/store'
import axios from 'axios'

export const setHeaders = () => {
  axios.defaults.headers.common[
    'access-token'
  ] = store.getState().auth.accessToken
}

export const setContentType = (type) => {
  axios.defaults.headers.common['Content-Type'] = type
}

export const ErrorHandler = (err) => {
  console.error(err)
  if (err?.response?.status === 401) {
    store.dispatch({
      type: 'LOGOUT',
    })

    return { status: 0, message: err.message, isError: 1 }
  }
  return { status: 0, message: err.message, isError: 1 }
}
