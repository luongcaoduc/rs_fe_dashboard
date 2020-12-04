import axios from '../../plugins/axios'

const state = {

}

const mutations = {
  RETURN_REPORT () {},
  RETURN_LIST_GAME () {},
  RETURN_REPORT_WEEK () {},
  RETURN_REPORT_MONTH () {},
  RETURN_REPORT_QUARTER () {},
  RETURN_YEAR () {},
  RETURN_ALL_REPORT () {},
}

const actions = {
  async getAllReport ({ commit }, { game }) {
    try {
      const { data } = await axios.get(`reports/get-all-report?game=${game}`)
      commit('RETURN_ALL_REPORT', data)
    } catch (error) {
      Promise.resolve(error)
    }
  },
  async getReports ({ commit }, { startDate, endDate, game, page, pageSize }) {
    try {
      if (game === 'Tất cả') game = ''
      const { data } = await axios.post(`/reports?page=${page}&pageSize=${pageSize}`,
        {
          startDate: startDate || '',
          endDate: endDate || '',
          game: game || '',
        },
      )
      commit('RETURN_REPORT', data)
    } catch (error) {
      return error
    }
  },
  async getListGame ({ commit }) {
    try {
      const { data } = await axios.get('/get-game')
      commit('RETURN_LIST_GAME', data)
    } catch (error) {
      return error
    }
  },
  async getReportsWeek ({ commit }) {
    try {
      const { data } = await axios.get('reports/get-report-week')
      commit('RETURN_REPORT_WEEK', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getReportsWeekByGame ({ commit }, inputData) {
    try {
      const { game } = inputData
      const { data } = await axios.post('reports/get-report-week-by-game', { game: game })
      commit('RETURN_REPORT_WEEK', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getReportsMonth ({ commit }) {
    try {
      const { data } = await axios.get('reports/get-report-month')
      commit('RETURN_REPORT_MONTH', data)
    } catch (error) {
      return error
    }
  },
  async getReportsMonthByGame ({ commit }, inputData) {
    try {
      const { game } = inputData
      const { data } = await axios.post('reports/get-report-month-by-game', { game: game })
      commit('RETURN_REPORT_MONTH', data)
    } catch (error) {
      return error
    }
  },
  async getReportsQuarter ({ commit }) {
    try {
      const { data } = await axios.get('reports/get-report-quarter')
      commit('RETURN_REPORT_QUARTER', data)
    } catch (error) {
      return error
    }
  },
  async getReportsQuarterByGame ({ commit }, inputData) {
    try {
      const { game } = inputData
      const { data } = await axios.post('reports/get-report-quarter-by-game', { game: game })
      commit('RETURN_REPORT_QUARTER', data)
    } catch (error) {
      return error
    }
  },
  async getAllYear ({ commit }) {
    try {
      const { data } = await axios.get('reports/get-all-year')
      commit('RETURN_YEAR', data)
    } catch (error) {
      return error
    }
  },
  async findReportByWeek ({ commit }, { startWeek, endWeek, year, game }) {
    try {
      const bodyObject = { year }
      if (game) {
        bodyObject.game = game
      }
      const { data } = await axios.post(`reports/find-report-by-week?startWeek=${startWeek || '0'}&endWeek=${endWeek || '0'}`, bodyObject)
      commit('RETURN_REPORT_WEEK', data)
    } catch (error) {
      return error
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
