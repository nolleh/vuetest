import Vue from 'vue';
import listRender from './01-list-rendering/App.vue';

const example1 = new Vue({
  data: {
    a: 1,
    userProfile: {
      name: 'Anika',
    },
  },

  render: h => h(listRender),
});

example1.$mount('#app');

example1.a = 2;
Vue.set(example1.userProfile, 'age', 27); // example1.$set(this.userProfile, 'age', 27)
