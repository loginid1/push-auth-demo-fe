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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Login.vue"),
    props: {
      mode: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    props: {
      mode: "Register",
    },
  },
  {
    path: "/auth-selector",
    name: "AuthSelector",
    props: true,
    component: () => import("../views/AuthSelector.vue"),
  },
  {
    path: "/push/auth",
    name: "PushAutentication",
    component: () => import("../views/PushAuthentication.vue"),
    props: (route) => ({ mode: route.query.mode }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
