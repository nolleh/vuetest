import Vue from 'vue';
import Slot from './slot/App.vue';

new Vue({
  render: h => h(Slot),
}).$mount('#app');
