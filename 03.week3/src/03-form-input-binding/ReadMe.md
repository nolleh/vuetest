# Form Input Binding

## Summary

1. 양방향 데이터 바인딩을 위해 사용되는 v-model 은 form 엘리먼트의 데이터 속성을 무시 (value / checked / selected) 한다. 대신, 인스턴스 데이터를 원본소스로 취급한다.
2. input type checkbox 는 boolean 을 바인딩하거나 배열을 바인딩할 수 있다.
   - 배열이 바인딩된 경우, 체크된 데이터가 배열에 추가된다.
3. 라디오버튼 타입의 경우 선택된 버튼의 value 속성의 값이 v-model 로 바인딩 된다.
4. 단일 select / multiple select 에 각각 값 / 배열을 바인딩하여 사용할 수 있다.
   - 단일 select 시 iOS 에서도 첫번째 항목을 선택할 수 있도록 하기 위해 disabled value 로 빈 값을 넣는게 좋다.
5. v-for 을 select 의 option 에서 사용하여 배열의 데이터를 동적으로 바인딩 할 수도 있다.
6. v-model 의 수식어로 .lazy (change 이벤트 이후 동기화), .number (형변환), .trim 을 사용할 수 있다.

## 예제

```vue
<template>
  <div>
    <input v-model="message" placeholder="여기를 수정해보세요" />
    <p>메시지: {{ message }}</p>
    <p style="white-space: pre-line">{{ message }}</p>
    <textarea v-model="message" placeholder="여러줄을 입력해보세요"></textarea>

    <p />
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
    <p />
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>
    <br />
    <span>체크한 이름: {{ checkedNames }}</span>
    <p />
    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>
    <br />
    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    <br />
    <span>선택: {{ picked }}</span>
    <p />
    <select v-model="selected">
      <option disabled value>Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>선택함: {{ selected }}</span>
    <p />

    <select v-model="multiple" multiple>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <br />
    <span>multiple: {{ multiple }}</span>

    <p />
    <select v-model="selected">
      <option
        v-for="option in options"
        v-bind:value="option.value"
        :key="option.text"
        >{{ option.text }}</option
      >
    </select>
    <span>Selected: {{ selected }}</span>

    <p />
    <!-- "input" 대신 "change" 이후에 동기화 됩니다. -->
    <input v-model.lazy="msg" />
    <input v-model.number="age" type="number" />
    <input v-model.trim="msg" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue';
export default Vue.extend({
  data() {
    return {
      message: '',
      checked: false,
      checkedNames: [],
      picked: 'NONE',
      selected: '',
      multiple: [],
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' },
      ],
      msg: '',
      age: '',
    };
  },
});
</script>
```
