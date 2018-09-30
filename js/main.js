import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

let Home = require("../views/Home.vue");
let Detail = require("../views/Detail.vue");

var router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/Home", component: Home },
    { path: "/Detail/:id", name: "Detail", component: Detail }
  ]
});

new Vue({
  el: "#app",
  store,
  router,
  created() {
    this.$store.dispatch("loadRows");
  }
});
