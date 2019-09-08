// src/index.ts

import Vue from "vue/dist/vue";
// import HelloComponent from "./components/Hello.vue";
// import App from "./01.App.vue";
// import Instance from "./02.Instance.vue";
// import console from "console";

import Template from "./03.template.vue";

// new Vue({
//   render: h => h(App)
// }).$mount("#app");

// let data = { a: 1 };
// // root vue 에 instance
// // const instance = new Instance({ data: data });
// // new Vue({ render: h => h(Instance) }).$mount("#app");

// // const instance = new Vue({ el: "#app" });
// var vm = new Vue({
//   el: "#app", // el or mount
//   data: data,
//   template: "<div> {{a}} <Instance /> </div>", // text 보간
//   components: {
//     Instance
//   },
//   created: function() {
//     console.log(`a is: ` + this.a); // lambda: parentcontextbinded
//   }
// });

// data.a = 2;

// vm.$data === data;
// vm.$el === document.getElementById("app");
// // vm.$watch("a", function(newVal, oldVal) {
// //   // `vm.a`가 변경되면 호출 됩니다.
// //   console.log(`new:${newVal}, old: ${oldVal}`);
// // });

new Vue({
  render: h => h(Template)
}).$mount("#app");
