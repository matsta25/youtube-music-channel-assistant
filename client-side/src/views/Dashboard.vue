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

    </b-container>
  </div>
</template>

<script>
import Mp3Service from '@/services/Mp3Service'
import ImageService from '@/services/ImageService'
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
        err: ''
      },
      backgroundImageBadgeStatus: {
        variantType: 'light',
        text: 'Waiting...',
        err: ''
      },
      backgroundImage: null
    }
  },
  mounted () {
    this.socket.on('downloadMp3', (data) => {
      let response = data.data
      if (response.code === 0) {
        this.mp3ChangeBadge('success', 'Mp3 downloaded.', '')
      } else {
        this.mp3ChangeBadge('danger', 'Downloading failed.', response.stderr)
      }
    }),
    this.socket.on('backgroundImage', (data) => {
      let response = data.data
      if (response.code === 0) {
        this.backgroundImageChangeBadge('success', 'Image uploaded.')
      } else {
        this.backgroundImageChangeBadge('danger', 'Uploding failed.')
      }
    })
  },
  methods: {
    mp3ChangeBadge (variant, text, err) {
      this.mp3BadgeStatus.variantType = variant
      this.mp3BadgeStatus.text = text
      if (err !== 'undefined') {
        let n = err.lastIndexOf('ERROR')
        let str = err.substr(n, err.length)
        this.mp3BadgeStatus.err = str
      }
    },
    backgroundImageChangeBadge (variant, text) {
      this.backgroundImageBadgeStatus.variantType = variant
      this.backgroundImageBadgeStatus.text = text
    },
    onChangeUrl: async function (url) {
      this.mp3ChangeBadge('primary', 'Downloading...', '')
      const response = await Mp3Service.sendUrl({ url: url })
      console.log(response.data);
    },
    onChangeImageBackground: async function (image) {
      let imageData = image.target.files[0];
      console.log(imageData);
      const fd = new FormData();
      fd.append('image', imageData, imageData.name);
      const response = await ImageService.sendBackgroundImage(fd)
      console.log(response.data);
    }
  }
}
</script>
