import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    props: true,
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    props: true,
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/auth-selector",
    name: "AuthSelector",
    props: true,
    component: () => import("../views/AuthSelector.vue"),
  },
  {
    path: process.env.VUE_APP_PUSH_AUTH_ENDPOINT,
    name: "PushAutentication",
    component: () => import("../views/RemoteSession.vue"),
    props: {
      mode: "Authentication",
    },
  },
  {
    path: process.env.VUE_APP_ADD_AUTH_ENDPOINT,
    name: "PushAutentication",
    component: () => import("../views/RemoteSession.vue"),
    props: {
      mode: "Registration",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
