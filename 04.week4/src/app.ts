import Vue from 'vue';
// import Slot from './slot/App.vue';

// new Vue({
//   render: h => h(Slot),
// }).$mount('#app');

// import transition from './transition/App.vue';

// new Vue({
//   render: h => h(transition),
// }).$mount('#app');

import transitionStatus from './transition-status/App.vue';

new Vue({
  render: h => h(transitionStatus),
}).$mount('#app');
