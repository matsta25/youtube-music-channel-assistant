<template>
  <div class="dashboard">
    <b-container>
        <b-row>
          <b-col cols="4">
            1. Paste your youtube music URL:
            </b-col>
          <b-col cols="8">
            <b-form-input v-model="youtubeUrl" placeholder="Enter your name"></b-form-input>
            <small class="text-muted">e.g. https://www.youtube.com/watch?v=smqhSl0u_sI</small>
          </b-col>
        </b-row>

    </b-container>
  </div>
</template>

<script>
import _ from 'lodash'

const debounceTime = 1000 

export default {
  name: 'dashboard',
  data () {
    return {
      youtubeUrl: ''
    }
  },
  watch: {
    youtubeUrl: _.debounce((val) => {
      console.log('Val: ' + val)
    }, debounceTime)
  }
}
</script>
