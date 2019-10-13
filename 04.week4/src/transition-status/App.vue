<template>
  <div id="animated-number-demo">
    <!-- suffix .number: 입력값 자동형변환 -->
    <input v-model.number="number" type="number" step="20" />
    <p />
    {{ animatedNumber }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue';
import TWEEN from 'tween';
export default Vue.extend({
  data() {
    return {
      number: 0,
      animatedNumber: 0,
    };
  },
  watch: {
    number(newValue, oldValue) {
      const vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function() {
          vm.animatedNumber = this.tweeningNumber.toFixed(0);
        })
        .start();
      animate();
    },
  },
});
</script>
