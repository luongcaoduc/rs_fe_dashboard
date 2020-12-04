import axios from '../../plugins/axios'
// import fs from 'fs'
 // import Exceljs from 'exceljs'
// import moment from 'moment'

// const workbook = new Exceljs.Workbook()
const state = {
  user: {},
  token: '',
}

const getters = {
  user: state => state.user,
  token: state => state.token,
}

const mutations = {
  SAVE_USER_INFO () {},
  CLEAR_USER_INFO (state) {
    localStorage.removeItem('app_user')
    localStorage.removeItem('app_token')
    state.user = {}
    state.token = ''
  },
  RETURN_USERS () {},

  RETURN_USER () {},

  DELETE_USER () {},

  CHANGE_PASSWORD () {},

  GET_LOCAL_USER_INFO (state) {
    state.user = JSON.parse(localStorage.getItem('app_user'))
    state.token = localStorage.getItem('app_token')
  },

  REFRESH_USER () {},

  ADD_PERMISSION () {},

  DELETE_PERMISSION () {},

  IMPORT_DATA () {},
  EXPORT_DATA () {},
}

const actions = {
  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/user/login', { username, password })
      localStorage.setItem('app_user', JSON.stringify(data.user))
      localStorage.setItem('app_token', data.token)
      commit('SAVE_USER_INFO', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // getLocalUserInfo ({ commit }) {
  //   commit('GET_LOCAL_USER_INFO')
  // },
  logout ({ commit }) {
    commit('CLEAR_USER_INFO')
  },
  async getAllUser ({ commit }) {
    try {
      const { data } = await axios.get('/user')
      // console.log(data)
      commit('RETURN_USERS', data)
    } catch (error) {
      Promise.reject(error)
    }
  },

  async getUser ({ commit }, { userId }) {
    try {
      const { data } = await axios.get(`/user/${userId}`)
      commit('RETURN_USER', data)
    } catch (error) {
      Promise.reject(error)
    }
  },

  async createUser ({ commit }, { username }) {
    try {
      const { data } = await axios.post('/user', { username: username })
      commit('RETURN_USER', data)
    } catch (error) {
      console.log('hello')
      return Promise.reject(error)
    }
  },

  async deleteUser ({ commit }, { userId }) {
    try {
      const data = await axios.delete(`/user/${userId}`)
      commit('DELETE_USER', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async changePass ({ commit }, { userId, password }) {
    try {
      const { data } = await axios.put(`/user/${userId}`, { password: password, active: true, active_code: null })
      commit('CHANGE_PASSWORD', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async changePass2 ({ commit }, { password, newPassword }) {
    try {
      const { data } = await axios.post('/user/changePass', { password: password, newPassword: newPassword })
      commit('CHANGE_PASSWORD', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async refreshUser ({ commit }, { userId }) {
    try {
      const { data } = await axios.post(`/user/refreshUser/${userId}`)
      commit('REFRESH_USER', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async addPermission ({ commit }, { permission, userId }) {
    try {
      const { data } = await axios.post(`/user/permissions/${userId}`, { permission: permission })
      commit('ADD_PERMISSION', data)
    } catch (error) {
      Promise.reject(error)
    }
  },

  async deletePermission ({ commit }, { permission, userId }) {
    try {
      const { data } = await axios.post(`/user/delete-permissions/${userId}`, { permission: permission })
      commit('DELETE_PERMISSION', data)
    } catch (error) {
      Promise.reject(error)
    }
  },
  async importData ({ commit }, { files }) {
    try {
      const formData = new FormData()
      formData.append('datafile', files[0])
      const { data } = await axios.post('/import-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(data)
      commit('IMPORT_DATA', data)
    } catch (error) {
      Promise.reject(error)
    }
  },
  async importData2 ({ commit }, { files }) {
    try {
      const formData = new FormData()
      formData.append('datafile', files[0])
      const { data } = await axios.post('/import-data2', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      commit('IMPORT_DATA', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async exportData ({ commit }, reports) {
    try {
      const data = await axios.post('/export-data', { data: reports }, {
        responseType: 'blob',
        timeout: 50000,
    })
      const url = window.URL.createObjectURL(new Blob([data.data], {
        type: 'application/vnd.ms-excel',
    }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'test.xlsx')
      document.body.appendChild(link)
      link.click()// Mostly the same, I was just experimenting with different approaches, tried link.click, iframe and other solutions
      commit('EXPORT_DATA')
    } catch (error) {
      Promise.reject(error)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
