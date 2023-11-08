import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Lisence from "../views/Lisence.vue";
import Developers from "../views/Developers.vue";
import Mobile from "../views/Mobile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mobile",
    name: "Mobile",
    component: Mobile,
  },
  {
    path: "/lisence",
    name: "Lisence",
    component: Lisence,
  },
  {
    path: "/developers",
    name: "Developers",
    component: Developers,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
