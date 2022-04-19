import _ from 'lodash'
import request from '@/utils/request'
import allChartData from '@/views/flowchart/my_flowcharts/data'

// initial state
const state = () => ({
  my_flowcharts: [],
  errorNodeList: [],
  errorEdgeList: []
})

// getters
const getters = {
  my_flowcharts: (state, getters, rootState) => {
    return state.my_flowcharts
  },

  errorNodeList: (state, getters, rootState) => {
    return state.errorNodeList
  },
  errorEdgeList: (state, getters, rootState) => {
    return state.errorEdgeList
  }
}

// actions
const actions = {
  getMyFlowcharts ({ commit, state }) {

    // commit('setMyFlowcharts', allChartData)
    // request.get(`/api/task/flowchart`, {
    request.get(`http://10.214.211.208:8002/flowchart/queryFlowchart`, {
    })
      .then((response) => {
        const flowcharts = response.data.data;
        console.log('get my flowcharts')
        commit('setMyFlowcharts', flowcharts)
      })
      .catch((errors) => {
        console.log("error", errors)
        commit('setMyFlowcharts', [])
        // commit('setErrors', errors)
      })
  }
}

// mutations
const mutations = {
  setMyFlowcharts (state, flowcharts) {
    state.my_flowcharts = _.cloneDeep(flowcharts)
  },

  updateErrorList (state, payload) {
    const { nodeList, edgeList } = payload
    state.errorNodeList = _.cloneDeep(nodeList)
    state.errorEdgeList = _.cloneDeep(edgeList)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
