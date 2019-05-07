import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    getUser (state, data) {
      state.user = data
    },
    logout ( state ) {
      state.user = {}
    }
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
      }
  }
})
