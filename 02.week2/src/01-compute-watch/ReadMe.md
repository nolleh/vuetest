# Computed And Watch

---

템플릿에는 데이터에 대한 UI 적 요소만 넣어두고 computed 속성 / 메서드를 이용하여 데이터에 대한 연산 수행

## 예제 1 - computed

```vue
<template>
  <div id="example">
    <p>원본 메시지: "{{ message }}"</p>
    <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      message: '안녕하세요',
    };
  },
  computed: {
    // 종속 대상 변경시에만 실행되며, 그렇지 않으면 캐쉬 결과 사용
    reversedMessage() {
      // this.message = 'this'; /* error: Unexpected side effect  */
      return this.message
        .split('')
        .reverse()
        .join('');
    },
  },
};
</script>
```

결과
`원본 메시지: "안녕하세요" 역순으로 표시한 메시지: "요세하녕안"`

getter 로서 수행함. 사이드 이펙트가 없어 코드를 이해/테스트하기 쉽다.

## 예제 2 - setter 함수

```vue
<script lang="ts">
    computeFullName: {
      get() {
        return this.firstName + 'd ' + this.lastName;
      },
      set(newValue) {
        const names = newValue.split(' ');
        this.firstName = 'set:' + names[0];
        this.lastName = names[names.length - 1];
      },
    },
    // ... 후략
```

get / set 을 분리해서 fullName 에 대한 setter 설정 가능.

## 예제 3 - Watch

비동기식으로 처리

```vue
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>

<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: '질문을 하기 전까지는 대답할 수 없습니다.',
  },
  watch: {
    // 질문이 변경될 때 마다 이 기능이 실행됩니다.
    question: function(newQuestion) {
      this.answer = '입력을 기다리는 중...';
      this.getAnswer();
    },
  },
  methods: {
    // _.debounce는 lodash가 제공하는 기능으로
    // 특히 시간이 많이 소요되는 작업을 실행할 수 있는 빈도를 제한합니다.
    // 이 경우, 우리는 yesno.wtf/api 에 액세스 하는 빈도를 제한하고,
    // 사용자가 ajax요청을 하기 전에 타이핑을 완전히 마칠 때까지 기다리길 바랍니다.
    // _.debounce 함수(또는 이와 유사한 _.throttle)에 대한
    // 자세한 내용을 보려면 https://lodash.com/docs#debounce 를 방문하세요.
    getAnswer: _.debounce(
      function() {
        if (this.question.indexOf('?') === -1) {
          this.answer = '질문에는 일반적으로 물음표가 포함 됩니다. ;-)';
          return;
        }
        this.answer = '생각중...';
        var vm = this;
        axios
          .get('https://yesno.wtf/api')
          .then(function(response) {
            vm.answer = _.capitalize(response.data.answer);
          })
          .catch(function(error) {
            vm.answer = '에러! API 요청에 오류가 있습니다. ' + error;
          });
      },
      // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
      500
    ),
  },
});
</script>
```

# Summary

---

1. computed 를 복잡한 데이터의 연산을 위해 사용
2. 사이드이펙트가 없으며, 종속된 데이터가 변경되는 경우에만 메서드가 실행된다.
3. computed 에 대해 getter / setter 별도 설정가능
4. watch 를 통해 비동기로 데이터에 반응형 메서드를 설정할 수 있다.
