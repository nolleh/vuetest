// src/index.ts

import Vue from "vue";
// import HelloComponent from "./components/Hello.vue";
import App from "./App.vue";

new Vue({
  render: h => h(App)
}).$mount("#app");
