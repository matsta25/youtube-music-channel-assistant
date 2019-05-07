import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    video: {}
  },
  mutations: {
    getUser (state, data) {
      state.user = data
    },
    logout ( state ) {
      state.user = {}
    },
    changeVideoDetails ( state, data ) {
      state.video = data
    },
  },
  actions: {
      getUser ({ commit }) {
        axios.get('/isauth').then( res => {
          console.log("USER DATA: " + JSON.stringify(res.data))
          commit('getUser', res.data)
        }).catch( err => {
          console.log(err)
        })
      },
      logout ({ commit }) { 
        commit('logout')
      },
      changeVideoDetails ({ commit }, data) {
        fetch(`/api/video`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ video: data })
        })
        .then(res => res.json())
        .then(data => commit('changeVideoDetails', data))
      },
      getVideoDetails ({ commit }) {
        fetch(`/api/video`, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(data => commit('changeVideoDetails', data))
      }
  }
})
