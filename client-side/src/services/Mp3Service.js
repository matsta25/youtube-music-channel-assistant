import Api from '@/services/Api'

export default {
  sendUrl (url) {
    return Api().post('/mp3', { url: url })
  }
}
