<template>
  <div>
    <input v-model="message" placeholder="여기를 수정해보세요" />
    <p>메시지: {{ message }}</p>
    <p style="white-space: pre-line">{{message}}</p>
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
      >{{ option.text }}</option>
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