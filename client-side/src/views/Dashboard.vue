<template>
  <div class="dashboard">
    <b-container>
        <b-row>
          <b-col cols="4">
            1. Paste your youtube music URL:
            </b-col>
          <b-col cols="6">
            <b-form-input v-model="youtubeUrl" v-on:change="onChangeUrl" placeholder="Enter your name"></b-form-input>
            <small class="text-muted">e.g. https://www.youtube.com/watch?v=smqhSl0u_sI</small>
          </b-col>
          <b-col cols="2">
            <b-badge pill :variant="mp3BadgeStatus.variantType">{{ mp3BadgeStatus.text }}</b-badge>
          </b-col>
        </b-row>

        <b-row v-if="mp3BadgeStatus.err !== ''">
          <b-col cols="12">
            <b-alert show variant="danger" dismissible>
              {{ mp3BadgeStatus.err }}
            </b-alert>
          </b-col>
        </b-row>

        <b-row v-if="mp3BadgeStatus.stdout !== ''">
          <b-col cols="12">
            <b-alert show variant="success" dismissible>
              {{ mp3BadgeStatus.stdout }}
            </b-alert>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="4">
            2. Upload background photo:
            </b-col>
          <b-col cols="6">
            <b-form-file
              v-on:change="onChangeImageBackground"
              accept="image/*"
              v-model="backgroundImage"
              :state="Boolean(backgroundImage)"
              placeholder="Choose a file..."
              drop-placeholder="Drop image here..."
          ></b-form-file>
          </b-col>
          <b-col cols="2">
            <b-badge pill :variant="backgroundImageBadgeStatus.variantType">{{ backgroundImageBadgeStatus.text }}</b-badge>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="2">{{ mp3Filename }}</b-col>
          <b-col cols="2">+</b-col>
          <b-col cols="2">{{ backgroundImageString.originalFilename }}</b-col>
          <b-col cols="2">=</b-col>
          <b-col cols="2" v-if="videoUuid !== ''">
            <b-embed type="video" aspect="4by3" controls poster="poster.png">
              <source :src="'http://localhost:8081/output/' + videoUuid + '.mkv'">
            </b-embed>
          </b-col>
          <b-col cols="2">
            <b-badge pill :variant="makevideoBadgeStatus.variantType">{{ makevideoBadgeStatus.text }}</b-badge>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <b-button variant="outline-primary" @click="makeVideo">Make video</b-button>
          </b-col>
        </b-row>

    </b-container>
  </div>
</template>

<script>
import Mp3Service from '@/services/Mp3Service'
import ImageService from '@/services/ImageService'
import VideoService from '@/services/VideoService'
import io from 'socket.io-client'

export default {
  name: 'dashboard',
  data () {
    return {
      youtubeUrl: 'https://www.youtube.com/watch?v=34ZWp9aMcLs',
      socket: io('localhost:8081'),
      mp3BadgeStatus: {
        variantType: 'light',
        text: 'Waiting...',
        stdout: '',
        err: ''
      },
      backgroundImageBadgeStatus: {
        variantType: 'light',
        text: 'Waiting...',
        err: ''
      },
      makevideoBadgeStatus: {
        variantType: 'light',
        text: 'Waiting...',
        err: '',
      },
      backgroundImage: null,
      mp3Filename: '',
      backgroundImageString: {
        originalFilename: '',
        path: ''
      },
      videoUuid: ''
    }
  },
  mounted () {
    this.socket.on('downloadMp3', (data) => {
      let response = data.data
      if (response.code === 0) {
        this.mp3ChangeBadge('success', 'Mp3 downloaded.', response.stdout, '')
      } else {
        this.mp3ChangeBadge('danger', 'Downloading failed.', '', response.stderr)
      }
    }),
    this.socket.on('backgroundImage', (data) => {
      let response = data.data
      if (response.code === 0) {
        this.backgroundImageChangeBadge('success', 'Image uploaded.')
      } else {
        this.backgroundImageChangeBadge('danger', 'Uploding failed.')
      }
    }),
    this.socket.on('makevideo', (data) => {
      let response = data.data
      if (response.code === 0) {
        this.makevideoChangeBadge('success', 'Video created.')
        this.videoUuid = response.filename
      } else {
        this.makevideoChangeBadge('danger', 'Creating failed.')
      }
    })
  },
  methods: {
    mp3ChangeBadge (variant, text, stdout ,err) {
      this.mp3BadgeStatus.variantType = variant
      this.mp3BadgeStatus.text = text
      const top = "[ffmpeg] Destination: ./download/"
      const tail = "Deleting original file ./download/"
      let n = stdout.lastIndexOf(top);
      console.log("n = " + n);
      if( n !==-1 ){
        let x = stdout.indexOf(tail)
        console.log("x =" + x)
        this.mp3BadgeStatus.stdout = stdout.substring(n + top.length , x)
        this.mp3Filename = this.mp3BadgeStatus.stdout.substring(0, this.mp3BadgeStatus.stdout.length - 5)
      }else{
        this.mp3BadgeStatus.stdout = stdout
      }
      this.mp3BadgeStatus.err = err
  
    },
    backgroundImageChangeBadge (variant, text) {
      this.backgroundImageBadgeStatus.variantType = variant
      this.backgroundImageBadgeStatus.text = text
    },
    makevideoChangeBadge (variant, text) {
      this.makevideoBadgeStatus.variantType = variant
      this.makevideoBadgeStatus.text = text
    },
    onChangeUrl: async function (url) {
      if(url === ''){
        this.mp3ChangeBadge('danger', 'Failed.', '', 'Paste url.')
      }else{
        this.mp3ChangeBadge('primary', 'Downloading...', '', '')
        const response = await Mp3Service.sendUrl({ url: url })
        console.log(response.data);
      }
    },
    onChangeImageBackground: async function (image) {
      let imageData = image.target.files[0];
      console.log(imageData);
      const fd = new FormData();
      fd.append('image', imageData, imageData.name);
      const response = await ImageService.sendBackgroundImage(fd)
      console.log("done")
      this.backgroundImageString.path = response.data.data.path
      this.backgroundImageString.originalFilename = response.data.data.originalname
    },
    makeVideo: async function (){
      if( this.backgroundImageString.path && this.mp3Filename ){
        const res = await VideoService.makeVideo(this.mp3Filename,this.backgroundImageString.path);
        console.log(res);
      }
    }
  }
}
</script>
