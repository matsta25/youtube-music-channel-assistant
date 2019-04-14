import Api from '@/services/Api'

export default {
  sendBackgroundImage(fd) {
    return Api().post('/backgroundimage', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  sendLogo(fd) {
    return Api().post('/logo', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
