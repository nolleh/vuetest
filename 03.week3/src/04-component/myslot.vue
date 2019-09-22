<template>
  <div class="child">
    <slot text="hello from child"></slot>
    <slot variable123="variable123"></slot>

    <slot name="item" v-for="item in items" :text="item.text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue';
export default Vue.extend({
  props: { items: {} },
});
</script>