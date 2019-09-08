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
    <div v-show="ok">안녕하세요!</div>끄읏
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