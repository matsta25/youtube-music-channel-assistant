<template>
  <div class="setVideoDetails">
    <b-row>
      5: Set video details:

      <b-form-input :value="videoDetails.title" placeholder="Enter your title"></b-form-input>
       <b-form-textarea
      id="textarea"
      :value="videoDetails.descritpion"
      @change="changeVideoDetailsDescritpion"
      placeholder="Enter descritpion..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "SetVideoDetails",
  computed: {
    videoDetails() {
      return this.$store.state.video.videoDetails;
    }
  },
  methods: {
    changeVideoDetailsDescritpion(videoDetails) {
      this.$store.dispatch("changeVideoDetailsDescritpion", videoDetails);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
