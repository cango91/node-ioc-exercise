<template>
  <div class="main">
    <nav>
      <div v-if="isLoggedIn">
        <router-link :to="{ name: 'Tasks' }">Tasks</router-link>&nbsp;|&nbsp;
        <router-link :to="{ name: 'Login' }" @click="logout">Logout</router-link>

      </div>
      <div v-else>
        <router-link :to="{ name: 'Login' }">Login</router-link>&nbsp;|&nbsp;
        <router-link :to="{ name: 'Signup' }">Signup</router-link>
      </div>
    </nav>
    <router-view @loggedIn="handleLogin" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      authToken: localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.authToken = null;
    },
    handleLogin(token) {
      this.authToken = token;
    }

  },
  computed: {
    isLoggedIn() {
      return this.authToken
        && this.authToken !== 'undefined'
        && this.authToken !== 'null';
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-color: #efefef;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
