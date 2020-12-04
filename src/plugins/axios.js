import axios from 'axios'
import store from '../store/store'

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
})

class APIError extends Error {
  constructor (response) {
    super()
    this.response = response
  }
}

$axios.interceptors.response.use(
  response => {
    if (response) {
      return Promise.resolve(response)
    } else {
      throw new APIError(response)
    }
  },
)

$axios.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers = { Authorization: `Bearer ${store.state.user.token}` }
  }
  return config
})

export default $axios
