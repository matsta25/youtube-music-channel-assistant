<template>
  <div class="videoPreview">
    <b-row class="my-3">
      <b-col cols="12" v-if="outputPath">
          <b-embed type="video" aspect="16by9" controls>
            <source :src="outputPath" type="video/webm">
          </b-embed>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "VideoPreview",
  computed: {
    outputPath() {
      return this.$store.state.video.outputPath;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
