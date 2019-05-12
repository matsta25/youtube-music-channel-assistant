<template>
  <div id="app">
    <b-navbar id="nav" toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand>
          <router-link to="/">
            <img alt="Vue logo" height="30" width="30" src="./assets/logo.png" class="d-inline-block align-top" />
            ymca
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item>
              <router-link to="/" >Home</router-link>
              </b-nav-item>
            <b-nav-item>
              <router-link to="/create">Create</router-link>
            </b-nav-item>
            <b-nav-item href="https://github.com/matsta25/youtube-music-channel-assistant" target="blank">
                <font-awesome-icon :icon="['fab', 'github']" />
            </b-nav-item>
            <span v-if="this.$store.state.user.displayName">
              <a href="/logout" @click="logout">Log out ( {{ this.$store.state.user.displayName }}  
                <b-img :src="this.$store.state.user.photoUrl" width="30" height="30" rounded="circle"></b-img> )
              </a>
            </span>
            <span v-else>
              <b-nav-item>
                <router-link to="/signin">Sign in</router-link>
              </b-nav-item>
            </span>
          </b-navbar-nav>
        </b-collapse>
    </b-container>

    </b-navbar>
    <b-container>
    <router-view />
    <footer>

      <b-container class="footer__inner">
        <hr>
       <b-row>
        <b-col>
          <a href="https://github.com/matsta25/youtube-music-channel-assistant/blob/master/README.md" target="blank">
            <font-awesome-icon :icon="['fab', 'readme']" /> readme
          </a>
          <a href="https://github.com/matsta25/youtube-music-channel-assistant/issues" target="blank">
            <font-awesome-icon :icon="['fas', 'bug']" /> issues
          </a>
          
        </b-col>
        <b-col>
          <img alt="Vue logo" height="30" width="30" src="./assets/logo.png" class="d-inline-block align-top" />
        </b-col>
        <b-col>
          <a href="https://github.com/matsta25/youtube-music-channel-assistant/blob/master/LICENSE" target="blank">
            <font-awesome-icon :icon="['fab', 'github']" /> matsta25
          </a>
          <a href="https://github.com/matsta25" target="blank">
            <font-awesome-icon :icon="['fas', 'user-circle']" /> license
          </a>
        </b-col>
      </b-row>
      </b-container>
    </footer>
    </b-container>
  </div>
</template>


<script>

export default {
  name: 'app',
  mounted() {
      this.$store.dispatch('getUser')
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #2B3A42;
  text-decoration: none;
  :hover{
    text-decoration: none;
  }
  a .router-link-exact-active{
    color: #F3F3F3;
    text-decoration: underline;
  }
  a {
    color: white;
  }
}

#nav {
  background-color: #2B3A42 !important;
}

.footer__inner{
  padding: 8px 0;
  & a {
    padding: 0 5px;
  }
}
</style>
