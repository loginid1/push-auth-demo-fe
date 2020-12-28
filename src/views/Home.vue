<template>
  <div class="columns is-centered">
    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
      <div class="box">
        <figure class="image is-3by1">
          <img alt="YYZ logo" src="../assets/logo.svg"/>
        </figure>
        <h1 class="title is-5 has-text-dark mt-6 has-text-centered">Hello {{ username }} </h1>
        <h2 class="subtitle is-5 has-text-dark mt-3 has-text-centered">👋</h2>
        <button class="button is-link is-fullwidth mt-6" @click="logout">Logout</button>
      </div>
    </div>
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
      this.$router.push('/login');
    }
  },
  created() {
    if (!this.username) {
      this.$router.push('/login');
    }
  }
};
</script>
