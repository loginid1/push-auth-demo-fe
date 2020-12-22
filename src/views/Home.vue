<template>
  <div class="home">
    <h1>Welcome to YYZ Finantial</h1>
    <h2 v-if="username !== ''">You are logged in as {{ username }}</h2>
    <button v-if="username !== ''" @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["username"]),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>
