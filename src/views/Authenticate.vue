<template>
  <div class="auth">
    <div class="r">
      <label for="username" class="username-label">Username </label>
      <input
        type="text"
        id="username"
        name="username"
        v-model="username"
        style="flex-grow: 1"
      />
    </div>
    <div class="r" style="padding: 0px;">{{ e }}</div>
    <div class="r">
      <button @click="onMainClicked">{{ mode }}</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: "login",
    },
  },
  data() {
    return {
      username: "",
      error: "",
    };
  },
  methods: {
    async onMainClicked() {
      console.log("username", this.username);
      try {
        const result = await new Promise((resolve) => {
          resolve({ isRegisteredDevice: false });
        });
        if (result.isRegisteredDevice) {
          // TODO: registered device, do normal login
          console.log('isRegisteredDevice', true)
        } else {
          // TODO: non registered device, redirect to another screen
          this.$router.push("auth-selector"); // push to next screen
        }
      } catch (e) {
        this.error = e;
      }
    },
  },
};
</script>
<style scoped>
.username-label {
  padding-right: 5px;
}
.r {
  width: min(400px, 90%);
  margin: auto;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
}
</style>
