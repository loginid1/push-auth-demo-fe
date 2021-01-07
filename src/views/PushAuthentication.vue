<template>
  <div class="columns is-centered">
    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
      <div class="box">
        <figure class="image is-3by1">
          <img alt="YYZ logo" src="../assets/logo.svg"/>
        </figure>
        <div v-if="!isAuthenticated" class="field mt-6">
          <label for="username" class="label">Username</label>
          <div class="control has-icons-left">
            <input
              id="username"
              class="input"
              type="text"
              @keyup.enter="login"
              v-model="username"
              placeholder="e.g. john.doe"
              required>
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <p class="help is-danger">
            {{this.error}}
          </p>
        </div>

        <button
          v-if="!isAuthenticated"
          class="button is-link is-fullwidth is-disabled"
          @click="onLogin"
          :disabled="!allowAuthentication"
        >
          Authorize Authentication
        </button>

        <h4 v-if="isAuthenticated" class="title is-5 has-text-dark has-text-centered mt-6">
          Authentication Authorized!
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Browser from '../loginid.browser.min';

export default {
  async mounted() {
    this.allowAuthentication = this.$route.query.session !== undefined && await Browser.isFido2Supported();
  },
  data() {
    return {
      username: "",
      isFidoSupported: false,
      allowAuthentication: false,
      isAuthenticated: false,
      error: ""
    };
  },
  computed: {
    ...mapState(["directweb"]),
  },
  methods: {
    async onLogin() {
      try {
        this.error = "";
        await this.directweb.login(this.username, { 
          remote_session: { session_id: this.$route.query.session }
        });
        this.isAuthenticated = true;
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>
