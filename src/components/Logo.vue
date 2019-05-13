<template>
  <div class="logo">
    <b-row>
      <b-col cols="4">3. Upload logo image: </b-col>
      <b-col cols="6">
        <b-form-file
          @change="changeLogo"
          accept=".png"
          logo="logo"
          :state="Boolean(logo)"
          placeholder="Choose a logo..."
          drop-placeholder="Drop logo here..."
        ></b-form-file>
      </b-col>
      <b-col cols="2">
        <b-badge pill :variant="logoBadge.variantType">{{ logoBadge.text }}</b-badge>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Logo",
  computed: {
    logo() {
      return this.$store.state.video.logo;
    },
    logoBadge() {
      return this.$store.state.video.logoBadge;
    }
  },
  methods: {
    changeLogo(value) {
      this.$store.dispatch("changeLogoBadge", { data: { code: -2 } })
      let logoData = value.target.files[0];
      const fd = new FormData();
      fd.append('logo', logoData, logoData.name);
      this.$store.dispatch("changeLogo", fd);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
