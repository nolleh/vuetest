import Vue from "vue";
// import Koa from "koa";
// import serve from "koa-static";
// import * as fs from "fs";
import App from "./App.vue";
// const vue = new Vue({
//   el: "#app",
//   data: {
//     message: "안녕하세요 vue!"
//   }
// });

// const app = new Koa();
// app.use(serve("./public"));

// app.listen(8080, () => {
//   console.log("koa port: 8080");
// });

new Vue({
  render: h => h(App)
}).$mount("#app");
