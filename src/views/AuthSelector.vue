<template>
  <div class="columns is-centered">
    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
      <div class="box">
        <div v-if="!isLoading">
          <figure class="image is-3by1">
            <img alt="YYZ logo" src="../assets/logo.svg"/>
          </figure>
          <h4 class="title is-6 has-text-dark has-text-centered mt-6">{{ title }}</h4>
          <button class="button is-link is-fullwidth" @click="onPushAuth">
            Push authentication
          </button>
          <p v-if="isFidoSupported" class="is-6 has-text-centered">or</p>
          <button
              class="button is-link is-fullwidth is-disabled"
              @click="onAddNewDevice"
              v-if="isFidoSupported"
              disabled
          >
            Add authenticator
          </button>
          <h4 class="subtitle is-6 has-text-dark has-text-centered mt-6" v-if="isFidoSupported">No, I used this device in the past</h4>
          <button
              class="button is-link is-fullwidth is-disabled"
              @click="onAuthenticateAnyway"
              v-if="isFidoSupported"
          >
            Authenticate anyway
          </button>
        </div>
        <div v-if="isLoading">
          <figure class="image is-3by1">
            <img alt="YYZ logo" src="../assets/logo.svg"/>
          </figure>
          <div v-if="displaySecurityCode" class="field mt-6">
            <label for="username" class="label">Security Code</label>
            <div class="control has-icons-left">
              <input id="username" type="text" v-model="securityCode" class="input" readonly disabled>
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <h4 class="title is-6 has-text-dark has-text-centered mt-6">Waiting for the authentication on one of the following devices:</h4>
          <div :key="`device-${index}`" v-for="(device, index) in devices">
            <div class="field">
              <div class="control has-icons-left">
                <input type="text" v-model="device.os" class="input" readonly disabled>
                <span class="icon is-small is-left">
                  <i class="fas fa-laptop"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: ["username"],
  async mounted() {
    try {
      this.isFidoSupported = await new Promise((resolve) => {
        resolve(true);
      });
    } catch (e) {
      console.log("e", e);
    }
  },
  data() {
    return {
      isFidoSupported: false,
      isLoading: false,
      displaySecurityCode: false,
      securityCode: "",
      devices: [],
    };
  },
  computed: {
    ...mapState(["directweb"]),
    title() {
      return this.isFidoSupported
        ? "Are you on a new device?"
        : "We have detected you are login in on a new device.";
    },
  },
  methods: {
    async login(username) {
      await this.$store.dispatch('login', username)
      await this.$router.push('/');
    },
    async onPushAuth() {
      // TODO: on push auth here
      // possible modes 'register-code' 'in-app-notification' 'browser-notification' 'email'
      // this.$router.push({path:'timer', query: {mode: 'email'}});
      const result = await this.directweb.pushAuthentication(this.username, (code,devices,communications) => {
        this.isLoading = !this.isLoading;
        this.securityCode = code;
        this.devices = devices;
        this.displaySecurityCode = !(communications.email || communications.push_notification);
      });
      await this.login(result.username);
    },
    async onAddNewDevice() {
      // TODO: on add new device flow here
    },
    async onAuthenticateAnyway() {
      const result = await this.directweb.login(this.username);
      await this.login(result.username);
    },
  },
};
</script>
