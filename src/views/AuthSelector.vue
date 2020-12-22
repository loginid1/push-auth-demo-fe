<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <h4 v-if="isFidoSupported">Select auth method</h4>
      <div>
        <button @click="onPushAuth">Push Auth</button>
        <button @click="onAddNewDevice" v-if="isFidoSupported">
          Add New Device
        </button>
      </div>
      <h4 v-if="isFidoSupported">NO, I used this device in the past</h4>
      <button @click="onAuthenticateAnyway" v-if="isFidoSupported">
        Authenticate Anyway
      </button>
    </div>
  </div>
</template>
<script>
export default {
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
    };
  },
  computed: {
    title() {
      return this.isFidoSupported
        ? "It seems you are on a new device?"
        : "We have detected you are loggin in on a new device.";
    },
  },
  methods: {
    async onPushAuth() {
      // TODO: on push auth here
      // possible modes 'register-code' 'in-app-notification' 'browser-notification' 'email'
      this.$router.push({path:'timer', query: {mode: 'email'}});
    },
    async onAddNewDevice() {
      // TODO: on add new device flow here
    },
    async onAuthenticateAnyway() {
      // TODO: Authetnicate Anyway here
    },
  },
};
</script>
