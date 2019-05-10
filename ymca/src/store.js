import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {},
    video: {
      youtubeUrl: 'https://www.youtube.com/watch?v=Scn4Gzqy0n4',
      youtubeUrlBadge: {
        text: 'Waiting...',
        variantType: 'light',
        code: '',
        stdout: '',
        err: ''
      }
    },
  },
  mutations: {
    getUser (state, data) {
      state.user = data
    },
    logout ( state ) {
      state.user = {}
    },
    changeYoutubeUrl (state, data) {
      state.video.youtubeUrl = data
    },
    SOCKET_downloadMp3 (state, data) {
      state.video.youtubeUrlBadge.code = data.data.code
      if (data.data.code === 0) {
        state.video.youtubeUrlBadge.text = 'Done.'
        state.video.youtubeUrlBadge.variantType = 'success'
      }else if(data.data.code === 2 || data.data.code === 1){
        state.video.youtubeUrlBadge.text = 'Error.'
        state.video.youtubeUrlBadge.variantType = 'danger'
      }else if (data.data.code === -2) {
        state.video.youtubeUrlBadge.text = 'Downloading...'
        state.video.youtubeUrlBadge.variantType = 'primary'
      }
      state.video.youtubeUrlBadge.stdout = data.data.stdout
      state.video.youtubeUrlBadge.stderr = data.data.stderr
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
      changeYoutubeUrl ({commit}, data ) {
        axios.post('/create/mp3', { url: data }).then( res => {
          console.log(data);
          commit('changeYoutubeUrl', data)
        }).catch( err => {
          console.log(err)
        })
      },
      changeYoutubeUrlBadge ({ commit }, data) {
        commit('SOCKET_downloadMp3', data)
      }
  }
})
