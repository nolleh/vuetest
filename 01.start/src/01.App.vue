<template>
  <div id="app">
    {{ hello }}
    <Intro name="name" />
  </div>
</template>

<script lang="ts">
import Intro from "./components/Intro.vue";
const introduce = {
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
export default introduce;
</script>