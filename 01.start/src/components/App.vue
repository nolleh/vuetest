<template>
    <div id="app">
    {{ message }}
    </div>
</template>

<script lang="ts">
export default {
  name: "App",
  data() {
      return {
        message: '안녕하세요 Vue!'
      }
  },
}
</script>