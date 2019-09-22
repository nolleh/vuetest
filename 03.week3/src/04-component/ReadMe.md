# Component

## Summary

1.  Vue.component 로 전역 지정 / 인스턴스의 componenets 프로퍼티 지정으로 지역 등록을 할 수 있다.
2.  하위 엘리먼트의 내용이 제한되는 DOM 템플릿의 경우, is 속성을 활용하여 컴포넌트를 지정한다.

    ```html
    <table>
      <tr is="my-row"></tr>
    </table>
    ```

3.  컴포넌트의 부모자식 관계는 props 는 아래로, events 는 위로 전달된다. (단방향)
    ![component relation](https://kr.vuejs.org/images/props-events.png)
4.  v-bind 를 통해 전달해야 리터럴 대신 javascript 표현식으로 평가한다.
5.  컴포넌트 사용시 v-on 속성을 추가하여 특정이벤트에 대해 부모에서 이벤트를 수신할 수 있다.

    ```vue
    <template>
      <my-component v-on:someevent="doSomething" />
    </template>
    <script>
    methods: {
        doSomething: function() { }
    }
    </script>
    ```

    ```vue
    <script>
    // my-component 의 스크립트에서
    methods: { emitevent: function() { this.$emit('someevent') } }
    </script>
    ```

6.  sync 수식어를 통해 부모에도 props 의 영향이 미치게 할 수 있다.

    - 컴포넌트에서는 update:{propname} 의 이벤트를 emit
    - 부모에서는 :{propname}.sync="dataname" / :{propname}="dataname" @update:{propname}="val => dataname = val" 와 같이 컴포넌트의 속성으로 지정

7.  컴포넌트의 v-model 속성을 사용자 정의 이벤트를 활용하여 만들 수 있다.
8.  비 부모 -자식간 통신을 위해 비어있는 Vue 인스턴스를 만들고 이벤트를 송수신 할 수 있다.
9.  컴포넌트에 슬롯을 지정하여 레이아웃을 지정, 부모에서 컨텐츠를 구성하는 방법을 고려 할 수 있다.

    컴포넌트

    ```html
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
    ```

    부모

    ```html
    <app-layout>
      <h1 slot="header">여기에 페이지 제목이 위치합니다</h1>

      <p>메인 컨텐츠의 단락입니다.</p>
      <p>하나 더 있습니다.</p>

      <p slot="footer">여기에 연락처 정보입니다.</p>
    </app-layout>
    ```

    렌더링 결과

    ```html
    <div class="container">
      <header>
        <h1>여기에 페이지 제목이 위치합니다</h1>
      </header>
      <main>
        <p>메인 컨텐츠의 단락입니다.</p>
        <p>하나 더 있습니다.</p>
      </main>
      <footer>
        <p>여기에 연락처 정보입니다.</p>
      </footer>
    </div>
    ```

10. slot-scope / slot={variablename} 를 이용해서 컴포넌트에서 부모로 데이터를 전달할 수 있다.
11. lazy 한 컴포넌트 선언은 Vue.component('name', function) 와 같이 팩토리 메서드를 전달하여 사용할 수 있다.
12. 비동기 컴포넌트를 다음과 같이 정의 할 수 있다.

```javascript
const AsyncComp = () => ({
  // 로드하는 컴포넌트입니다. 반드시 Promise이어야합니다.
  component: import('./MyComp.vue'),
  // 비동기 컴포넌트가 로드되는 동안 사용할 컴포넌트
  loading: LoadingComp,
  // 실패했을 경우 사용하는 컴포넌트
  error: ErrorComp,
  // 로딩 컴포넌트를 보여주기전 지연하는 정도. 기본값: 200ms.
  delay: 200,
  // 시간이 초과되면 에러용 컴포넌트가 표시됩니다
  // 기본값: Infinity.
  timeout: 3000,
});
```

13. 컴포넌트 순환참조 해결을 위해 beforeCrate 내부에서 컴포넌트를 등록하거나 / component 에서 import 문을 이용할 수 있다. (promise 리턴)


## 예제

```vue
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

```

```vue
<template>
  <div class="child">
    <slot text="hello from child"></slot>
    <slot variable123="variable123"></slot>

    <slot name="item" v-for="item in items" :variable="item.text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue';
export default Vue.extend({
  data() {
    return { items: [{ text: 'myslot' }, { text: 'test' }] };
  },
});
</script>
```
