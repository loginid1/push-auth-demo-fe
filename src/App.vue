<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link><span v-if="username === ''"> | </span>
      <router-link v-if="username === ''" to="/login">Login</router-link> <span v-if="username === ''">| </span>
      <router-link v-if="username === ''" to="/register">Register</router-link>
    </div>
    <img
      alt="YYZ logo"
      src="./assets/logo.svg"
      style="width: min(500px, 90%); height: auto;"
    />
    <router-view />
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed: {
    ...mapState(["username"]),
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #006dff;
}

button {
  background-color: #006dff;
  color: white;
  border: 1px solid #006dff;
  padding: 10px 20px;
  font-weight: 900;
  cursor: pointer;
  transition: background-color 0.23s ease;
  margin: 0 5px;
}
button:hover {
  background-color: white;
  color: #006dff;
}
</style>
