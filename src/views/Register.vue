<template>
  <div class="columns is-centered">
    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
      <div class="box">
        <figure class="image is-3by1">
          <img alt="YYZ logo" src="../assets/logo.svg"/>
        </figure>
        <div class="field mt-6">
          <label for="username" class="label">Username</label>
          <div class="control has-icons-left">
            <input
              id="username"
              class="input"
              type="text"
              @keyup.enter="onMainClicked"
              v-model="username"
              placeholder="e.g. john.doe"
              required>
            <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          </div>
        </div>
        <div class="field">
          <button class="button is-link is-fullwidth" @click="onRegister">
            Register
          </button>
        </div>
        <div class="field has-text-centered">
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["directweb"]),
  },
  data() {
    return {
      username: "",
      error: "",
    };
  },
  methods: {
    async onRegister() {
      try {
        const result = await this.directweb.register(this.username);
        await this.$store.dispatch('login', result.username)
        await this.$router.push('/');
      } catch (e) {
        if (e.code === 'user_detection') {
          await this.$router.push({name: "AuthSelector", params: {username: this.username}});
        }
        this.error = e;
      }
    },
  },
};
</script>
