<template>
  <div id="template">
    hello
    <span v-once>변경하지 않아: {{msg}}</span>
    <!-- <span v-html="index"></span> -->
    {{ ok ? 'YES' : 'NO' }}
    <!-- url data to a component's property, href -->
    <a v-bind:href="url">link</a>
    <!-- make submit (triggered event) to invoke event.preventDefault()  -->
    <form v-on:submit.prevent="onSubmit">...</form>
    <a :href="url">link</a>
    <a @click="doSomething">...</a>
  </div>
</template>

<script lang='ts'>
export default {
  name: "template",
  data() {
    return {
      msg: "상수",
      ok: true,
      url: "http://localhost:8080"
    };
  }
};
</script>
