<template>
  <div class="backgroundPhoto">
    <b-row class="my-3">
      <b-col cols="4 py-2">2. Upload background photo:</b-col>
      <b-col cols="6">
        <b-form-file
          @change="changeBackgroundPhoto"
          accept=".jpg"
          backgroundPhoto="backgroundPhoto"
          :state="Boolean(backgroundPhoto)"
          placeholder="Choose a image..."
          drop-placeholder="Drop image here..."
        ></b-form-file>
      </b-col>
      <b-col cols="2 py-1">
        <b-badge pill :variant="backgroundPhotoBadge.variantType">
          {{
          backgroundPhotoBadge.text
          }}
        </b-badge>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "BackgroundPhoto",
  computed: {
    backgroundPhoto() {
      return this.$store.state.video.backgroundPhoto;
    },
    backgroundPhotoBadge() {
      return this.$store.state.video.backgroundPhotoBadge;
    }
  },
  methods: {
    changeBackgroundPhoto(value) {
      this.$store.dispatch("changeBackgroundPhotoBadge", {
        data: { code: -2 }
      });
      let imageData = value.target.files[0];
      let fd = new FormData();
      fd.append("image", imageData, imageData.name);
      this.$store.dispatch("changeBackgroundPhoto", fd);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
