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
      },
      backgroundPhoto: null,
      backgroundPhotoBadge: {
        text: 'Waiting...',
        variantType: 'light',
        code: ''
      },
      logo: null,
      logoBadge: {
        text: 'Waiting...',
        variantType: 'light',
        code: ''
      },

    },
  },
  mutations: {
    getUser(state, data) {
      state.user = data
    },
    logout(state) {
      state.user = {}
    },
    changeYoutubeUrl(state, data) {
      state.video.youtubeUrl = data
    },
    SOCKET_downloadMp3(state, data) {
      state.video.youtubeUrlBadge.code = data.data.code
      if (data.data.code === 0) {
        state.video.youtubeUrlBadge.text = 'Done.'
        state.video.youtubeUrlBadge.variantType = 'success'
      } else if (data.data.code === 2 || data.data.code === 1) {
        state.video.youtubeUrlBadge.text = 'Error.'
        state.video.youtubeUrlBadge.variantType = 'danger'
      } else if (data.data.code === -2) {
        state.video.youtubeUrlBadge.text = 'Downloading...'
        state.video.youtubeUrlBadge.variantType = 'primary'
      }
      state.video.youtubeUrlBadge.stdout = data.data.stdout
      state.video.youtubeUrlBadge.stderr = data.data.stderr
    },
    SOCKET_backgroundImage(state, data) {
      state.video.backgroundPhotoBadge.code = data.data.code
      if (data.data.code === 0) {
        state.video.backgroundPhotoBadge.text = 'Done.'
        state.video.backgroundPhotoBadge.variantType = 'success'
      } else if (data.data.code === 2 || data.data.code === 1) {
        state.video.backgroundPhotoBadge.text = 'Error.'
        state.video.backgroundPhotoBadge.variantType = 'danger'
      } else if (data.data.code === -2) {
        state.video.backgroundPhotoBadge.text = 'Downloading...'
        state.video.backgroundPhotoBadge.variantType = 'primary'
      }
    },
    SOCKET_logo(state, data) {
      state.video.logoBadge.code = data.data.code
      if (data.data.code === 0) {
        state.video.logoBadge.text = 'Done.'
        state.video.logoBadge.variantType = 'success'
      } else if (data.data.code === 2 || data.data.code === 1) {
        state.video.logoBadge.text = 'Error.'
        state.video.logoBadge.variantType = 'danger'
      } else if (data.data.code === -2) {
        state.video.logoBadge.text = 'Downloading...'
        state.video.logoBadge.variantType = 'primary'
      }
    },
    changeBackgroundPhoto(state, data) {
      state.video.backgroundPhoto = data
    },
    changeLogo(state, data) {
      state.video.logo = data
    },

  },
  actions: {
    getUser({
      commit
    }) {
      axios.get('/isauth').then(res => {
        console.log("USER DATA: " + JSON.stringify(res.data))
        commit('getUser', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    logout({
      commit
    }) {
      commit('logout')
    },
    changeYoutubeUrlBadge({
      commit
    }, data) {
      commit('SOCKET_downloadMp3', data)
    },
    changeYoutubeUrl({
      commit
    }, data) {
      axios.post('/create/mp3', {
        url: data
      }).then(res => {
        console.log(res);
        commit('changeYoutubeUrl', data)
      }).catch(err => {
        console.log(err)
      })
    },
    changeBackgroundPhotoBadge({commit }, data) {
      commit('SOCKET_backgroundImage', data)
    },
    changeBackgroundPhoto({
      commit
    }, data) {
      axios.post('/create/backgroundphoto', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res);
        commit('changeBackgroundPhoto', data)
      }).catch(err => {
        console.log(err)
      })
    },
    changeLogoBadge({commit }, data) {
      commit('SOCKET_logo', data)
    },
    changeLogo({
      commit
    }, data) {
      axios.post('/create/logo', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res);
        commit('changeLogo', data)
      }).catch(err => {
        console.log(err)
      })
    },
  }
})