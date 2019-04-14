import Api from '@/services/Api'

export default {
  makeVideo (audio, video, logo) {
    return Api().post('/makevideo', { 
      data: {
        audio: audio,
        video: video,
        logo: logo
      } 
    })
  }
}
