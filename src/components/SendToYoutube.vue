<template>
  <div class="sendToYoutube">
    <b-row class="my-3">
      <b-col cols="10 py-2">
        6: Upload video to Youtube:
        <b-button variant="outline-primary" @click="changeSendToYoutube">Send to YT</b-button>
      </b-col>
      <b-col cols="2 py-3">
        <b-badge pill :variant="sendToYoutubeBadge.variantType">
          {{
          sendToYoutubeBadge.text
          }}
        </b-badge>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "SendToYoutube",
  computed: {
    sendToYoutubeBadge() {
      return this.$store.state.video.sendToYoutubeBadge;
    }
  },
  methods: {
    changeSendToYoutube() {
      this.$store.dispatch("changeSendToYoutubeBadge", { data: { code: -2 } });
      this.$store.dispatch("changeSendToYoutube");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
