import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

$axios.interceptors.request.use(config => {
  if (localStorage.getItem('app_user') && localStorage.getItem('app_token')) {
    config.headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('app_token'))}` }
  }
  return config
})

export default $axios
