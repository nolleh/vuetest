<template>
  <div>
    <!-- 클래스의 동적 토글. isActive 가 true 인경우 클래스 존재 -->
    <div v-bind:class="{ active: isActive }"></div>
    <div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
    <!-- object 로 선언가능 -->
    <div v-bind:class="classObject"></div>
    <div v-bind:class="[{active: isActive}, errorClass]"></div>
    <my-component class="baz boo"></my-component>
    <div v-bind:style="styleObject">Hello?</div>
    <div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
  </div>
</template> 

<script lang="ts">
export default {
  data() {
    return {
      isActive: true,
      hasError: false,
      //   classObject: {
      //     active: true,
      //     'text-danger': false,
      //   },
      errorClass: 'text-danger',
      styleObject: {
        color: 'red',
        fontSize: '13px',
      },
    };
  },
  computed: {
    classObject: function() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal',
      };
    },
  },
  components: {
    'my-component': {
      template: '<p class="foo bar">Hi</p>',
    },
  },
};
</script>