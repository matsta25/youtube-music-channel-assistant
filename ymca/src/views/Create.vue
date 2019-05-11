<template>
  <div class="create">
    <b-container>
      <div v-if="!this.$store.state.user.displayName">
        <h3>User: {{ this.$store.state.user.displayName }}</h3>
        <PasteUrl/>
        <BackgroundPhoto/> 
        <Logo/>
        <MakeVideo/>
        <VideoPreview/>
      </div>
      <div v-else>
        To create video
        <router-link to="/signin">Sign in</router-link>first.
      </div>
    </b-container>
  </div>
</template>

<script>
import PasteUrl from "@/components/PasteUrl.vue"
import BackgroundPhoto from "@/components/BackgroundPhoto.vue"
import Logo from "@/components/Logo.vue"
import MakeVideo from "@/components/MakeVideo.vue"
import VideoPreview from "@/components/VideoPreview.vue"

export default {
  components: {
    PasteUrl,
    BackgroundPhoto,
    Logo,
    MakeVideo,
    VideoPreview
  },
  mounted() {
    this.$store.dispatch("getUser");
  },
  methods: {
  }
};
</script>
