<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand>
          <router-link to="/">
            <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
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
            <b-nav-item>
              <router-link to="/about">About</router-link>
            </b-nav-item>
            <span v-if="this.$store.state.user.displayName">
              <a href="/logout" @click="logout">Log out ( {{ this.$store.state.user.displayName }}  
                <b-img :src="this.$store.state.user.photoUrl" width="40" height="40" rounded="circle"></b-img> )
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
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
