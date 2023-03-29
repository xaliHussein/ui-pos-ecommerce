import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Home.vue";
import MenuView from "../views/Menu.vue";
import OrderView from "../views/Order.vue";
import PaymentView from "../views/Payment.vue";
import SettingsView from "../views/Settings.vue";
import ChartView from "../views/Chart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
  },
  {
    path: "/order",
    name: "order",
    component: OrderView,
  },
  {
    path: "/payment",
    name: "payment",
    component: PaymentView,
  },
  {
    path: "/chart",
    name: "chart",
    component: ChartView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
