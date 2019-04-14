import Api from '@/services/Api'

export default {
  makeVideo (audio, video) {
    return Api().post('/makevideo', { 
      data: {
        audio: audio,
        video: video
      } 
    })
  }
}
