<template>
  <ul>
    <li v-for="todo in filteredTodos" v-bind:key="todo.id">
      <!-- 할일에 대한 슬롯을 만들고 이 슬롯을 todo 속성에 바인드 -->
      <slot name="todo" v-bind:todo="todo">{{ todo.text }}</slot>
    </li>
  </ul>
</template>

<script lang='ts'>
import Vue from 'vue/dist/vue';
export default Vue.extend({
  props: {
    todos: Array,
  },

  data() {
    return {};
  },

  computed: {
    filteredTodos() {
      return this.todos.filter(todo => {
        return todo;
      });
    },
  },
});
</script>