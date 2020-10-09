import axios from '../../plugins/axios'

const state = {
  user: '',
  token: '',
}

const getters = {
  user: state => state.user,
  token: state => state.token,
}

const mutations = {
  SAVE_USER_INFO (state, payload) {
    state.user = payload.user
    state.token = payload.token
    localStorage.setItem('app_user', JSON.stringify(payload.user))
    localStorage.setItem('app_token', JSON.stringify(payload.token))
  },
  CLEAR_USER_INFO () {
    localStorage.removeItem('app_user')
    localStorage.removeItem('app_token')
  },
}

const actions = {
  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/user/login', { username, password })
      commit('SAVE_USER_INFO', data)
    } catch (error) {
      return error
    }
  },
  logout ({ commit }) {
    commit('CLEAR_USER_INFO')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
