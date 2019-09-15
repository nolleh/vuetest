
<template>
  <div id="example1">
    <ul id="example-1">
      <!-- v-for 로 iterate 하며 태그 안에서 access 가능 -->
      <li v-for="item in items" v-bind:key="item.message">{{ item.message }}</li>
    </ul>

    <ul id="example-2">
      <!-- pair 로 index 데이터도 전달 받을 수 있고, iterate 하는 부모의 속성 데이터에도 접근 가능 -->
      <li
        v-for="(item, index) of items"
        v-bind:key="index"
      >{{ parentMessage }} - {{ index }} - {{ item.message }}</li>
    </ul>

    <!-- object property value iterate -->
    <ul id="v-for-object">
      <li v-for="value in object" :key="value">{{value}}</li>
    </ul>
    <ul id="v-for-object2">
      <li v-for="(value, key, index) in object" v-bind:key="value">{{index}}. {{key}}: {{value}}</li>
    </ul>

    <li v-for="n in evenNumbers" v-bind:key="n">{{n}}</li>

    <span v-for="a in 10" v-bind:key="a">{{ a }}</span>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
// import Component from 'vue-class-component';

// @Component
export default Vue.extend({
  data() {
    return {
      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }],
      object: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
      },
      numbers: [1, 2, 3, 4, 5],
    };
  },

  computed: {
    evenNumbers: function() {
      return this.numbers.filter(function(number) {
        return number % 2 === 0;
      });
    },
  },
});
</script>