<template>
  <div id="instance">{{test}}</div>
</template>

<script lang="ts">
export default {
  name: "Instance",
  data() {
    return {
      test: "메세지"
    };
  }
};
</script>