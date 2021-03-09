import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import ErrorPage from "../components/Error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Helloworld",
    component: HelloWorld,
  },
  {
    path: "*",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
