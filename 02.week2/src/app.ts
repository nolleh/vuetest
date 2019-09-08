import Vue from 'vue/dist/vue';

// import ComputeWatch from './01-compute-watch/App.vue';

// var vm = new Vue({
//   render: h => h(ComputeWatch),
// });
// vm.$mount('#app');

// import ClassStyle from './02-class-style/App.vue';

// var vm = new Vue({
//   render: h => h(ClassStyle),
// });
// vm.$mount('#app');

import ConditionalRendering from './03-conditional-rendering/App.vue';
var vm3 = new Vue({
  render: h => h(ConditionalRendering),
});
vm3.$mount('#app');
