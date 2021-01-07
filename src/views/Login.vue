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
              @keyup.enter="login"
              v-model="username"
              placeholder="e.g. john.doe"
              required
              :disabled="isLoading">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label for="username" class="label">Transient Email</label>
          <div class="control has-icons-left">
            <input
              id="email"
              class="input"
              type="email"
              @keyup.enter="login"
              v-model="email"
              placeholder="e.g. john.doe@acme.com"
              required
              :disabled="isLoading">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <h4 v-if="isLoading" class="title is-4 has-text-dark has-text-centered mt-6">
          {{ this.timer }}
        </h4>

        <div v-if="!isLoading" class="field">
          <button class="button is-link is-fullwidth" @click="onLogin">
            Login
          </button>
        </div>

        <div v-if="!isLoading" class="field">
          <button class="button is-link is-fullwidth" @click="onPushAuth">
            Push authentication
          </button>
        </div>

        <div v-if="!isLoading" class="field" >
          <button class="button is-link is-fullwidth" @click="onAddAuth" :disabled="!isFidoSupported">
            Add authenticator
          </button>
        </div>

        <div v-if="!isLoading" class="field has-text-centered">
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Browser from '../loginid.browser.min';

export default {
  computed: {
    ...mapState(["directweb"]),
    timer() {
      var min = Math.floor(this.countDown / 60);
      var sec = this.countDown % 60;

      return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
    }
  },
  async mounted() {
    this.isFidoSupported = await Browser.isFido2Supported();
  },
  data() {
    return {
      username: "",
      email: "",
      error: "",
      isLoading: false,
      isFidoSupported: false,
      countDown: 0
    };
  },
  methods: {
    countDownTimer() {
      if(this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000)
      } else {
        this.isLoading = false;
        this.countDown = 0;
      }
    },
    startTimer(expireAt) {
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;
      this.countDown = Math.floor((expireAt - Date.now()) / 1000)
      this.countDownTimer()
    },
    async onLogin() {
      try {
        const result = await this.directweb.login(this.username, { userDetection: true });
        await this.$store.dispatch('login', result.username)
        await this.$router.push('/');
      } catch (e) {
        if (e.code === 'user_detection') {
          await this.$router.push({name: "AuthSelector", params: {username: this.username}});
        }
        this.error = e;
      }
    },
    async onPushAuth() {
      try {
        const result = await this.directweb.pushAuthentication(this.username, (code, devices, notification, expireAt) => {
          console.log(code);
          console.log(devices);
          console.log(notification);

          this.startTimer(expireAt);
        }, { transient_email: this.email });

        await this.$store.dispatch('login', result.username)
        await this.$router.push('/');
      } catch (e) {
        console.log(e)
      }
      
    },
    async onAddAuth() {
      const result = await this.directweb.addAuthenticator(this.username, (code, devices, notification, expireAt) => {
        console.log(code);
        console.log(devices);
        console.log(notification);
        
        this.startTimer(expireAt);
      }, { transient_email: this.email });
      await this.$store.dispatch('login', result.username)
      await this.$router.push('/');
    },
  },
};
</script>
