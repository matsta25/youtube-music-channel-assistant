<template>
  <div class="create">
    <b-container>
      <div v-if="!this.$store.state.user.displayName">
        <h3>User: {{ this.$store.state.user.displayName }}</h3>
        <PasteUrl/>
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

export default {
  components: {
    PasteUrl
  },
  data() {
    return {
      video: {
        description: null
      }
    };
  },
  mounted() {
    this.$store.dispatch("getUser");
  },
  methods: {
  }
};
</script>
