import Vue from 'vue';
// import listRender from './01-list-rendering/App.vue';

// const example1 = new Vue({
//   data: {
//     a: 1,
//     userProfile: {
//       name: 'Anika',
//     },
//   },

//   render: h => h(listRender),
// });

// example1.$mount('#app');

// example1.a = 2;
// Vue.set(example1.userProfile, 'age', 27); // example1.$set(this.userProfile, 'age', 27)

// import eventHandling from './02-event-handling/App.vue';

// new Vue({
//   render: h => h(eventHandling),
// }).$mount('#app');

// import formbinding from './03-form-input-binding/App.vue';

// new Vue({
//   render: h => h(formbinding),
// }).$mount('#app');

import component from './04-component/App.vue';

new Vue({
  render: h => h(component),
}).$mount('#app');
