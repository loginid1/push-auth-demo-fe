<template>
  <div id="app">
    <section class="hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container">
          <router-view />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import DirectWeb from './loginid.directweb.min';

export default {
  computed: {
    ...mapState(["username", "directweb"]),
  },
  beforeCreate() {
    const dw = new DirectWeb(process.env.VUE_APP_API_BASE_URL, process.env.VUE_APP_API_KEY);
    this.$store.dispatch('directwebInit', dw);
  }
}
</script>
