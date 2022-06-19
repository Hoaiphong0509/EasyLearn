import axios from 'axios'
import store from 'services/store'
import { AUTHS } from 'constants/AppConstants'

const api = axios.create({
  baseURL: 'https://easy-learn.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: AUTHS.LOGOUT })
    }
    return Promise.reject(err)
  }
)

export default api
