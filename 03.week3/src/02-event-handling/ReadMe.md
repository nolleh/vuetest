# Event Handling

## Summary

1. v-on 디렉티브를 통해 DOM 이벤트에 반응
2. 디렉티브의 속성으로 연산을 정의하거나, 메서드의 이름을 지정할 수 있다.
3. 메소드의 인자를 v-on:click 에서 함께 정의할 수 있다 (호출부를 작성)
4. 핸들러에서 DOM 이벤트 엑세스가 필요한 경우, \$event 변수를 전달가능
5. 기본 이벤트 동작 중지 / 이벤트 전파 중단을 이벤트 수식어를 사용하여 처리 가능

   - .stop
   - .prevent
   - .capture
   - .self
   - .once
   - .passive

6. input 태그에서 v-on:keyup.enter / @keyup.enter 로 키보드 이벤트 지정 가능

- .enter
- .tab
- .delete (“Delete” 와 “Backspace” 키 모두를 캡처합니다)
- .esc
- .space
- .up
- .down
- .left
- .right

7. Vue.config.keyCodes 객체를 통해 별칭 지정 가능

```ts
// `v-on:keyup.f1`을 사용할 수 있습니다.
Vue.config.keyCodes.f1 = 112;
```

8. 정의된 시스템 키와 함께 체이닝 할 수 있다.
9. .exact 인 경우 정확히 그 키만 눌린 경우에만 수행된다.

```vue
<!-- Alt 또는 Shift와 함께 눌린 경우에도 실행됩니다. -->
<button @click.ctrl="onClick">A</button>

<!-- Ctrl 키만 눌려있을 때만 실행됩니다. -->
<button @click.ctrl.exact="onCtrlClick">A</button>
```

## 예제

```vue
<template>
  <div v-on:click="doThis">
    <button v-on:click="counter += 1">Add 1</button>
    <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p>
    <button v-on:click="greet">Greet</button>
    <button v-on:click="say('hi')">Say Hi</button>
    <p />
    <!-- 클릭 이벤트 전파가 중단됩니다 -->
    <a v-on:click="doThis" href="http://nolleh.github.io">click -> dothis</a> /
    <a v-on:click.stop="doThis" href="http://nolleh.github.io"
      >click.stop -> dothis</a
    >
    <p />
    <!-- 제출 이벤트가 페이지를 다시 로드 하지 않습니다 -->
    <form v-on:submit="onSubmit">
      submit -> onSubmit
      <input type="text" />
      <input type="submit" />
    </form>
    <form v-on:submit.prevent="onSubmit">
      submit.prevent -> onSubmit
      <input type="text" />
      <input type="submit" />
    </form>

    <p />
    <!-- 수식어는 체이닝 가능합니다 -->
    <a v-on:click.stop.prevent="doThat" href="http://nolleh.github.io"
      >stop.prevent-> do that</a
    >

    <!-- 단순히 수식어만 사용할 수 있습니다 -->
    <form v-on:submit.prevent></form>

    <!-- 이벤트 리스너를 추가할 때 캡처모드를 사용합니다 -->
    <!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
    <div v-on:click.capture.prevent="doThis">
      <button v-on:click="doThat">
        capture 시 dothis,button 이벤트시 dothat
      </button>
    </div>

    <!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다 -->
    <!-- 자식 엘리먼트에서는 안됩니다 -->
    <div v-on:click.self="doThat">
      parent
      <p />
      <div>child</div>
    </div>

    <!-- 클릭 이벤트는 최대 한번만 트리거 됩니다. -->
    <a v-on:click.once="doThis">once</a>

    <!-- 스크롤의 기본 이벤트를 취소할 수 없습니다. -->
    <div v-on:scroll.passive="onScroll">...</div>

    <!-- 위와 같습니다 -->
    <input v-on:keyup.enter="submit" />

    <!-- 약어 사용도 가능합니다 -->
    <input @keyup.enter="submit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      name: 'Vue.js',
      counter: 0,
    };
  },
  // 메소드는 `methods` 객체 안에 정의합니다
  methods: {
    greet(event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      alert('Hello ' + this.name + '!');
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        alert(event.target.tagName);
      }
    },
    say(message) {
      alert(message);
    },
    doThis() {
      alert('dothis');
    },
    doThat() {
      alert('dothat');
    },
    onSubmit() {
      alert('onSubmit');
    },
  },
});
</script>
```
