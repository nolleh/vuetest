# 조건부 렌더링

## 요약

1. v-if / v-elseif / v-else / v-show 를 통해 조건부 렌더링
2. key 속성을 활용하여 재사용이 가능한 엘리먼트와 그렇지 않은 엘리먼트를 구분
3. v-show 는 항상렌더링, v-if 는 참이 될 때 렌더링
4. v-if 는 토글비용이 높으므로, 자주바뀐다면 v-show 를, 런타임시 조건이 바뀌지 않으면 v-if 를 사용하자.
5. v-if 와 v-for 를 함께 사용하는 경우 v-for 의 우선순위가 더 높다.

## 예제

```vue
<template v-if="ok">
  <div>
    <h1 v-if="ok">Yes</h1>
    <h1 v-else-if="elseif">elseif</h1>
    <h1 v-else>No</h1>

    <div v-if="loginType === 'username'">
      <label>사용자 이름</label>
      <!-- 키를 사용하지 않는경우, 같은 요소를 사용하므로 대체되지 않는다. -->
      <!-- holder 에 키를 입력하여 별개의 홀더임을 명시하여 다시 렌더링 -->
      <input placeholder="사용자 이름을 입력하세요" key="username-input" />
    </div>
    <div v-else>
      <label>이메일</label>
      <input placeholder="이메일 주소를 입력하세요" key="email-input" />
    </div>
    <button @click="OnClick">로그인 유형 변경</button>
    <!-- v-show 는 항상 렌더링된다. (엘리먼트의 display 속성을 토글하는것)
    <div style="display: none;">안녕하세요!</div>-->
    <div v-show="ok">안녕하세요!</div>
    끄읏
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return { ok: true, elseif: true, loginType: 'username' };
  },
  methods: {
    OnClick() {
      this.loginType = this.loginType === 'username' ? 'email' : 'username';
    },
  },
};
</script>
```
