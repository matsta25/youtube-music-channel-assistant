<template>
  <div class="dashboard">
    <b-container>
        <b-row>
          <b-col cols="4">
            1. Paste your youtube music URL:
            </b-col>
          <b-col cols="6">
            <b-form-input v-model="youtubeUrl" placeholder="Enter your name"></b-form-input>
            <small class="text-muted">e.g. https://www.youtube.com/watch?v=smqhSl0u_sI</small>
          </b-col>
          <b-col cols="2">
            <b-badge pill :variant="badgeStatus.variantType">{{ badgeStatus.text }}</b-badge>
          </b-col>
        </b-row>

        <b-row v-if="badgeStatus.err !== ''">
          <b-col cols="12">
              {{ badgeStatus.err }}
          </b-col>
        </b-row>

    </b-container>
  </div>
</template>

<script>
import _ from 'lodash'
import Mp3Service from '@/services/Mp3Service'
import io from 'socket.io-client';

const debounceTime = 1000

export default {
  name: 'dashboard',
  data () {
    return {
      youtubeUrl: 'https://www.youtube.com/watch?v=34ZWp9aMcLs',
      // youtubeUrl: 'https://www.youtube.com/watch?v=smqhSl0u_sI',
      socket : io('localhost:8081'),
      badgeStatus: {
        variantType: "light",
        text: 'Waiting...',
        err: ''
      }
    }
  },
  watch: {
    youtubeUrl: _.debounce(async (url) => {
      // todo:
      // this.changeBadge("primary","Downloading.","")
      const response = await Mp3Service.sendUrl({ url: url })
    }, debounceTime)
  },
  mounted() {
    this.socket.on('downloadMp3', (data) => {
      let response = data.data;
      if(response.code == 0){
        this.changeBadge("success","Mp3 downloaded.","")
      }else{
        this.changeBadge("danger","Downloading failed.", response.stderr)
      }
    })
  },
  methods: {
    changeBadge(variant, text, err){
      this.badgeStatus.variantType = variant
      this.badgeStatus.text = text
      if(err !== 'undefined'){
        let n = err.lastIndexOf("ERROR");
        let str = err.substr(n, err.length)
        this.badgeStatus.err = str
      }

    }
  }
}
</script>
