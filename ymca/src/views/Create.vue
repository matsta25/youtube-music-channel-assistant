<template>
  <div class="create">
    <div v-if="this.$store.state.user.displayName">
      <h3>User: {{ this.$store.state.user.displayName }}</h3>
      <!-- <h3 v-if="!(typeof this.$store.state.video.video.description === 'undefined')">
        Description: {{ this.$store.state.video.video.description }}
      </h3> -->
      <input type="text" v-model="video.description" v-on:change="changeVideoDetails">
    </div>
    <div v-else>
        To create video <router-link to="/signin">Sign in</router-link> first.
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      video: {
        description: null
      }
    }
  },
  mounted() {
    this.$store.dispatch('getVideoDetails')
    this.$store.dispatch('getUser')
  },
  methods: {
    changeVideoDetails(){
      this.$store.dispatch('changeVideoDetails', this.video)
    }
  }
}
</script>
