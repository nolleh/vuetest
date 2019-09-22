<template>
  <div>
    <div>
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>

      <child my-message="안녕하세요" />

      <p />
      <input v-model="parentMsg" />
      <child :my-message="parentMsg"></child>
      <p />

      <div id="counter-event-example">
        <p>{{ total }}</p>
        <button-counter v-on:increment="incrementTotal"></button-counter>
        <button-counter v-on:increment="incrementTotal"></button-counter>
      </div>

      <p>{{bar}}</p>
      <comp :foo.sync="bar"></comp>
      <!-- <comp :foo="bar" @update:foo="val => bar = val"></comp> -->

      <p />
      <currency-input v-model="price"></currency-input>

      <div class="parent">
        <my-slot :items="items">
          <template slot-scope="props">
            <span>hello from parent</span>
            <br />
            <span>{{ props.text }}</span>
            <span>{{ props.variable123 }}</span>
          </template>

          <!-- 컴포넌트의 사용측에서 어떻게 렌더링할지 정의 (prop.text) -->
          <li slot="item" slot-scope="{ variable }" class="my-fancy-item">{{variable}}</li>
        </my-slot>
      </div>
    </div>

    <keep-alive>
      <component v-bind:is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue';
import MySlot from './myslot.vue';

export default Vue.extend({
  props: {
    // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
    propA: Number,
    // 객체/배열의 기본값은 팩토리 함수에서 반환 되어야 합니다.
    propE: {
      type: Object,
      default: function() {
        return { message: 'hello' };
      },
    },
    // 사용자 정의 유효성 검사 가능
    propF: {
      validator: function(value) {
        return value > 10;
      },
    },
  },
  data() {
    return {
      parentMsg: '부모로부터 전달 받은 메시지',
      total: 0,
      bar: 0,
      price: 0,
      items: [{ text: 'hello' }, { text: 'slot-scope' }],
      currentView: 'child',
    };
  },
  methods: {
    incrementTotal: function() {
      this.total += 1;
    },
  },
  components: {
    'simple-counter': {
      template: '<button v-on:click="counter += 1"> {{counter}} </button>',
      data: function() {
        return { counter: 0 };
      },
    },
    child: {
      props: ['myMessage'],
      template: '<span> {{ myMessage }}</span>',
    },
    'button-counter': {
      template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
      data: function() {
        return {
          counter: 0,
        };
      },
      methods: {
        incrementCounter: function() {
          this.counter += 1;
          this.$emit('increment');
        },
      },
    },

    comp: {
      props: {
        foo: Number,
      },
      template: '<button @click="update"> update </button>',
      methods: {
        update() {
          this.$emit('update:foo', 10);
        },
      },
    },

    'currency-input': {
      template:
        '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)">\
    </span>\
  ',
      props: ['value'],
      methods: {
        // 값을 직접 업데이트하는 대신 이 메소드를 사용하여
        // 입력 값에 대한 서식을 지정하고 배치 할 수 있습니다
        updateValue: function(value) {
          var formattedValue = value
            // 공백을 제거합니다.
            .trim()
            // 소수 자릿수 2자리로 줄입니다
            .slice(
              0,
              value.indexOf('.') === -1 ? value.length : value.indexOf('.') + 3
            );
          // 값이 아직 정규화 되지 않은 경우
          // 이를 수동으로 재정의하여 조건을 충족시킵니다.
          if (formattedValue !== value) {
            this.$refs.input.value = formattedValue;
          }
          // 입력 이벤트를 통해 숫자 값을 내보냅니다.
          this.$emit('input', Number(formattedValue));
        },
      },
    },

    MySlot,
  },
});
</script>