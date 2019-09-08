<template>
  <div id="example">
    <p>원본 메시지: "{{ message }}"</p>
    <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
    <p>변경되지 않는 메시지 "{{ now }}"</p>
    <p>{{fullName}}</p>
    <p>{{computeFullName}}</p>

    <b>----------------------</b>
    <p>
      yes/no 질문을 물어보세요:
      <input v-model="question" />
    </p>
    <p>{{ answer }}</p>
  </div>
</template>

<script src= "https://unpkg.com/axios@0.12.0/dist/axios.min.js"/>
<!-- <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script> -->
<script>
import * as _ from 'lodash';
// const axios = require('axios');
export default {
  head: {
    script: [
      {
        type: 'text/javascript',
        src: 'https://unpkg.com/axios@0.12.0/dist/axios.min.js',
      },
    ],
  },
  data() {
    return {
      message: '안녕하세요',
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'FooBar',

      question: '',
      answer: '질문을 하기 전까지는 대답할 수 없습니다.',
    };
  },
  mounted: async () => {
    // const axiosScript = document.createElement('script');
    // axiosScript.setAttribute(
    //   'src',
    //   'https://unpkg.com/axios@0.12.0/dist/axios.min.js'
    // );
    // document.head.appendChild(axiosScript);
    // const axios = await import(
    //   'https://unpkg.com/axios@0.12.0/dist/axios.min.js'
    // );
  },
  computed: {
    // 종속 대상 변경시에만 실행됨
    reversedMessage() {
      return this.message
        .split('')
        .reverse()
        .join('');
    },
    now() {
      return Date.now();
    },
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
  },

  watch: {
    firstName(val) {
      // response to firstname
      this.fullName = val + ' ' + this.lastName;
    },
    lastName(val) {
      this.fullName = this.firstName + ' ' + val;
    },

    question(newQuestion) {
      this.answer = '입력을 기다리는 중...';
      this.getAnswer();
    },
  },

  methods: {
    getAnswer: _.debounce(function() {
      if (this.question.indexOf('?') === -1) {
        this.answer = '질문에는 일반적으로 물음표가 포함됩니다. :-)';
        return;
      }
      this.answer = '생각중...';
      var vm = this;
      try {
        axios
          .get('https://yesno.wtf/api')
          .then(function(response) {
            vm.answer = _.capitalize(response.data.answer);
          })
          .catch(function(error) {
            vm.answer = '에러! API 요청 오류.' + error;
          });
      } catch (error) {
        vm.answer = '에러!' + error;
      }
    }, 500),
  },
};
</script>