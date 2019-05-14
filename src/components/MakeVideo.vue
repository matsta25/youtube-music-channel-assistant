<template>
  <div class="pasteUrl">
    <b-row class="my-3">
      <b-col cols="10 py-2">4: Create a video: <b-button variant="outline-primary" @click="changeMakeVideo">Make video</b-button></b-col>
      <b-col cols="2 py-3">
        <b-badge pill :variant="makeVideoBadge.variantType">{{ makeVideoBadge.text }}</b-badge>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "PasteUrl",
  computed: {
    makeVideoBadge() {
      return this.$store.state.video.makeVideoBadge;
    }
  },
  methods: {
    changeMakeVideo() {
      this.$store.dispatch("changeMakeVideoBadge", { data:{ code: -2 }});
      this.$store.dispatch("changeMakeVideo");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
