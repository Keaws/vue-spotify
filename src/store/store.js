import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    token: null,
    userID: null,
    songs: []
  },
  mutations: {
    setToken (state) {
      try {
        state.token = window.location.hash.split('=')[1].split('&token')[0]
      } catch (e) {
        state.token = null
      }
    },
    setUserID (state, id) {
      state.userID = id
    }
  },
  actions: {
    setToken ({ commit }) {
      commit('setToken')
    },
    setUserID ({commit}, id) {
      commit('setUserID', id)
    }
  }
})
