<template>
  <div>
    <h2>{{ text }}</h2>
    <div v-if="mode === 'email'">
      We have sent an email to your email {{ email }}, please follow email
      instruction.
    </div>
    <div v-else-if="mode === 'browser-notification'">
      Please confirm with your browser
    </div>
    <div v-else-if="mode === 'in-app-notification'">
      <div>
        We have sent a push notification to the following mobile devices:
      </div>
      <div v-for="device of devices" :key="device">
        {{ device }}
      </div>
    </div>
    <div v-else>
      Login on your primary device and use the following registration code
      <h3>
        {{ code }}
      </h3>
    </div>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <h5>Time remaining:</h5>
      <BaseTimer />
    </div>
  </div>
</template>
<script>
import BaseTimer from "@/components/BaseTimer.vue";
export default {
  components: {
    BaseTimer,
  },
  props: {
    mode: {
      type: String,
      default: "register-code",
    },
  },
  data() {
    return {
      email: "",
      code: "",
      devices: [""],
    };
  },
  mounted() {
    // TODO: get the variables
    this.email = "BXXXXX@mXXXXX.com";
    this.code = "4M2S3J";
    this.devices = ["Google Pixel 5", "Huawei P20 Pro", "IPhone 5S"];
  },
  computed: {
    text() {
      switch (this.mode) {
        case "email":
          return "Authenticate with email";
        case "browser-notification":
          return "Authenticate with browser notification";
        case "in-app-notification":
          return "Authenticate with in app notification";
        default:
          return "Authenticate with code";
      }
    },
  },
};
</script>
