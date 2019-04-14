import Api from '@/services/Api'

export default {
  sendBackgroundImage(fd) {
    return Api().post('/backgroundimage', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
