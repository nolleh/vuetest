<template>
  <my-slot v-bind:todos="todos">
    <template #todo="{todo}">
      <span v-if="todo.isComplete">✓</span>
      {{ todo.text }}
    </template>
  </my-slot>
</template>

<script lang='ts'>
import Vue from 'vue/dist/vue';
import MySlot from './MySlot.vue';
export default Vue.extend({
  data() {
    return {
      todos: [
        { text: 'nolleh', isComplete: true },
        { text: 'is', isComplete: true },
        { text: 'awesome!', isComplete: false },
      ],
    };
  },
  components: { MySlot },
});
</script>