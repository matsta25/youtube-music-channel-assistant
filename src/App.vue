<template>
  <div id="app">
    <div id="header">
      <b-navbar id="nav" toggleable="lg" type="dark" variant="dark">
        <b-container>
          <b-navbar-brand>
            <router-link to="/">
              <img
                alt="Vue logo"
                height="30"
                width="30"
                src="./assets/logo.svg"
                class="d-inline-block align-top"
              >
              ymca
            </router-link>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item>
                <router-link to="/">Home</router-link>
              </b-nav-item>
              <b-nav-item>
                <router-link to="/create">Create</router-link>
              </b-nav-item>
              <b-nav-item
                href="https://github.com/matsta25/youtube-music-channel-assistant"
                target="blank"
              >
                <font-awesome-icon :icon="['fab', 'github']"/>
              </b-nav-item>
              <b-nav-item class="d-inline-block align-top">
                <span v-if="this.$store.state.user.displayName">
                  <a href="/logout" @click="logout">
                    Log out ( {{ this.$store.state.user.displayName }}
                    <b-img
                      :src="this.$store.state.user.photoUrl"
                      width="30"
                      height="30"
                      rounded="circle"
                    ></b-img>)
                  </a>
                </span>
                <span v-else>
                  <router-link to="/signin">Sign in</router-link>
                </span>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </div>

    <div id="body">
      <b-container>
        <router-view/>
      </b-container>
    </div>
    <div id="footer">
      <footer>
        <b-container class="footer__inner">
          <hr>
          <b-row>
            <b-col>
              <a
                href="https://github.com/matsta25/youtube-music-channel-assistant/blob/master/README.md"
                target="blank"
              >
                <font-awesome-icon :icon="['fab', 'readme']"/>readme
              </a>
              <a
                href="https://github.com/matsta25/youtube-music-channel-assistant/issues"
                target="blank"
              >
                <font-awesome-icon :icon="['fas', 'bug']"/>issues
              </a>
            </b-col>
            <b-col>
              <router-link to="/">
                <img
                  alt="Vue logo"
                  height="30"
                  width="30"
                  src="./assets/logo.svg"
                  class="d-inline-block align-top"
                >
              </router-link>
            </b-col>
            <b-col>
              <a
                href="https://github.com/matsta25/youtube-music-channel-assistant/blob/master/LICENSE"
                target="blank"
              >
                <font-awesome-icon :icon="['fab', 'github']"/>matsta25
              </a>
              <a href="https://github.com/matsta25" target="blank">
                <font-awesome-icon :icon="['fas', 'user-circle']"/>license
              </a>
            </b-col>
          </b-row>
        </b-container>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$store.dispatch("getUser");
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway");

#app {
  font-family: "Raleway", sans-serif;
  font-size: 11pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #2b3a42;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
  a .router-link-exact-active {
    color: #f3f3f3;
    text-decoration: underline;
  }
  a {
    color: white;
  }
}

#nav {
  background-color: #2b3a42 !important;
}

.footer__inner {
  padding: 8px 0;
  & a {
    padding: 0 10px;
  }
}
.navbar-dark .navbar-toggler {
  border-color: rgba(255, 255, 255, 0) !important;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  min-height: 100%;
  position: relative;
}

#header {
}

#body {
  padding-bottom: 91px; /* Height of the footer */
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 91px; /* Height of the footer */
}

.text-link {
  color: #5299c8;
}

.btn-outline-primary {
  color: #5299c8 !important;
  border-color: #5299c8 !important;
}

.badge-primary {
  color: #fff;
  border-color: #5299c8 !important;
}

// test

#body {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
