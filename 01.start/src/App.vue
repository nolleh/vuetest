<template>
  <div id="app">
    {{ hello }}
    <Intro name="name" />
  </div>
</template>

<script lang="ts">
import Intro from "./components/Intro.vue";

export default {
  // name: "App",
  components: {
    Intro
  },
  data() {
    return {
      hello: "안녕하세요 Vue!"
    };
  }
};
</script>