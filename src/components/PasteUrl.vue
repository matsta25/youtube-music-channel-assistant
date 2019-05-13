<template>
  <div class="pasteUrl">
    <b-row>
      <b-col cols="4">1. Paste your youtube music URL:</b-col>
      <b-col cols="6">
        <b-form-input :value="youtubeUrl.url" @change="changeYoutubeUrl" placeholder="Enter your URL" :required=true></b-form-input>
        <small class="text-muted">e.g. https://www.youtube.com/watch?v=Scn4Gzqy0n4</small>
      </b-col>
      <b-col cols="2">
        <b-badge pill :variant="youtubeUrlBadge.variantType">{{ youtubeUrlBadge.text }}</b-badge>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PasteUrl",
  computed: {
    youtubeUrl() {
      return this.$store.state.video.youtubeUrl;
    },
    youtubeUrlBadge() {
      return this.$store.state.video.youtubeUrlBadge;
    }
  },
  methods: {
    changeYoutubeUrl(value) {
      this.$store.dispatch("changeYoutubeUrlBadge", { data:{ code: -2 }});
      this.$store.dispatch("changeYoutubeUrl", value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
