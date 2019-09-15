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

    ```vue
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

    ```vue
    <app-layout>
      <h1 slot="header">여기에 페이지 제목이 위치합니다</h1>

      <p>메인 컨텐츠의 단락입니다.</p>
      <p>하나 더 있습니다.</p>

      <p slot="footer">여기에 연락처 정보입니다.</p>
    </app-layout>
    ```

렌더링 결과

    ```vue
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
