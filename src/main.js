import Vue from "vue";
import App from "./App.vue";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-vue";
import router from "./router";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
