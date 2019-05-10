<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/create">Create</router-link> |
      <span v-if="this.$store.state.user.displayName">
        <a href="/logout" @click="logout">Log out ( {{ this.$store.state.user.displayName }} )</a>
      </span>
      <span v-else>
        <router-link to="/signin">Sign in</router-link>
      </span>
    </div>
    <router-view />
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
