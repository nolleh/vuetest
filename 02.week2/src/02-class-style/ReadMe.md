# 클래스와 스타일 바인딩

## 요약

1. v-bind:class 에는 키/객체/삼항연산자/배열등을 사용할 수 있으며, 각각을 조합하여 사용할 수 있다.
2. v-bind:style 도 키/객체/배열을 조합하여 사용할 수 있다.
3. 벤더 접두어가 필요한 CSS 속성에 대해 vue 가 자동으로 감지하여 스타일을 적용한다

   > The major browsers use the following prefixes:
   > -webkit- (Chrome, Safari, newer versions of Opera, almost all iOS browsers (including Firefox for iOS); > basically, any WebKit based browser)
   > -moz- (Firefox)
   > -o- (Old, pre-WebKit, versions of Opera)
   > -ms- (Internet Explorer and Microsoft Edge)

4. 스타일 속성에 벤더 접두어를 배열로 전달, 브라우저가 지원하는 배열의 마지막 값만 렌더링 할 수 있다.

## 예제

```vue
<template>
  <div>
    <!-- 클래스의 동적 토글. isActive 가 true 인경우 클래스 존재 -->
    <div v-bind:class="{ active: isActive }"></div>
    <div
      class="static"
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
    ></div>
    <!-- object 로 선언가능 -->
    <div v-bind:class="classObject"></div>
    <div v-bind:class="[{ active: isActive }, errorClass]"></div>
    <my-component class="baz boo"></my-component>
    <div v-bind:style="styleObject">Hello?</div>
    <div
      v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
    ></div>
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
```
