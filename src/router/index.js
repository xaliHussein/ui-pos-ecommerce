import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Home.vue";
import OrderView from "../views/Orders.vue";
import SettingsView from "../views/Settings.vue";
import LoginView from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: redirect,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: loggedIn,
  },

  {
    path: "/orders",
    name: "orders",
    component: OrderView,
    beforeEnter: loggedIn,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    beforeEnter: loggedIn,
  },
];

// function admin(to, from, next) {
//   const user_type = localStorage.getItem("user_type");
//   if (user_type == 0) {
//     next();
//   } else {
//     next("/");
//   }
// }
function loggedIn(to, from, next) {
  const token = localStorage.getItem("token");
  if (!token) {
    next("/login");
  } else {
    next();
  }
}
function redirect(to, from, next) {
  const token = localStorage.getItem("token");
  if (token) {
    next("/");
  } else {
    next();
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
