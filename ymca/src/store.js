import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {},
    video: {
      youtubeUrl: {
        url: 'https://www.youtube.com/watch?v=Scn4Gzqy0n4',
        path: ''
      },
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
      makeVideoBadge: {
        text: 'Waiting...',
        variantType: 'light',
        code: ''
      },
      outputPath: '',
      sendToYoutubeBadge: {
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
      console.log("data AUDIo" +  JSON.stringify(data))
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

      // trim filename
      if(data.data.stdout){
      let stdout = data.data.stdout
      const top = "[ffmpeg] Destination: "
      const tail = "Deleting original file "
      let n = stdout.lastIndexOf(top);
      if( n !==-1 ){
        let x = stdout.indexOf(tail)
        let mp3BadgeStatus = stdout.substring(n + top.length , x - 1)
        state.video.youtubeUrl.path = mp3BadgeStatus
      }
    }

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
    SOCKET_makeVideo(state, data) {
      console.log("HERE")
      state.video.makeVideoBadge.code = data.data.code
      if (data.data.code === 0) {
        state.video.makeVideoBadge.text = 'Done.'
        state.video.makeVideoBadge.variantType = 'success'
      } else if (data.data.code === 2 || data.data.code === 1) {
        state.video.makeVideoBadge.text = 'Error.'
        state.video.makeVideoBadge.variantType = 'danger'
      } else if (data.data.code === -2) {
        state.video.makeVideoBadge.text = 'Creating...'
        state.video.makeVideoBadge.variantType = 'primary'
      }
      state.video.outputPath = data.data.outputPath
    },
    changeBackgroundPhoto(state, data) {
      state.video.backgroundPhoto = data
    },
    changeLogo(state, data) {
      state.video.logo = data.data
    },
    SOCKET_sendToYoutube(state, data) {
      state.video.sendToYoutubeBadge.code = data.data.code
      if (data.data.code === 0) {
        state.video.sendToYoutubeBadge.text = 'Done.'
        state.video.sendToYoutubeBadge.variantType = 'success'
      } else if (data.data.code === 2 || data.data.code === 1) {
        state.video.sendToYoutubeBadge.text = 'Error.'
        state.video.sendToYoutubeBadge.variantType = 'danger'
      } else if (data.data.code === -2) {
        state.video.sendToYoutubeBadge.text = 'Uploding...'
        state.video.sendToYoutubeBadge.variantType = 'primary'
      }
    },
    changeBackgroundPhoto(state, data) {
      state.video.backgroundPhoto = data
    },
    changeLogo(state, data) {
      state.video.logo = data.data
    },

  },
  actions: {
    getUser({
      commit
    }) {
      axios.get('/isauth').then(res => {
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
        commit('changeYoutubeUrl', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    changeBackgroundPhotoBadge({
      commit
    }, data) {
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
        commit('changeBackgroundPhoto', res.data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    changeLogoBadge({
      commit
    }, data) {
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
        commit('changeLogo', res.data)
      }).catch(err => {
        console.log(err)
      })
    },

    changeMakeVideoBadge({
      commit
    }, data) {
      commit('SOCKET_makeVideo', data)
    },
    changeMakeVideo({
      commit, state
    }) {
      console.log("audio" + state.video.youtubeUrl.path)
      console.log("logo" + state.video.logo.path)
      console.log("backgorund" + state.video.backgroundPhoto.path)
      axios.post('/create/makevideo', {
        data: {
          audio: state.video.youtubeUrl.path,
          video: state.video.backgroundPhoto.path,
          logo: state.video.logo.path
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err)
      })
    },
    changeSendToYoutubeBadge({
      commit
    }, data) {
      commit('SOCKET_sendToYoutube', data)
    },
    changeSendToYoutube({
      commit, state
    }) {
      axios.post('/create/sendToYoutube', {
        data: {
          path: state.video.outputPath,
          accessToken: state.user.accessToken
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err)
      })
    },
  }
})