# Transition

## Summary

1. transition name 속성을 지정하고 그 이름을 style 의 .v-enter-active 등의 액션에 정의하여 애니메이션을 정의할 수 있다.
2. animation 을 통해 @keyframe 에 정의한 사용자 정의 애니메이션 사용
3. 다음 속성을 제공하여 사용자 정의 트랜지션 사용

   > 이미 css 로 정의된 일반적인 애니메이션을 속성에 넣으면, v-enter-active 와 같이 별도로 스타일 정의 필요없다.

   - enter-class
   - enter-active-class
   - enter-to-class (2.1.8+)
   - leave-class
   - leave-active-class
   - leave-to-class (2.1.8+)

   ```vue
   <transition
     name="custom-classes-transition"
     enter-active-class="animated tada"
     leave-active-class="animated bounceOutRight"
   > 
       hello 
   </transition>
   ```

4. transition 과 animation 을 함께 사용하는 경우 vue 가 어떤 애니메이션을 기준으로 종료시점을 알지 type 속성으로 지정해줘야한다.
5. 중첩된 애니메이션등에서 사용하기 용이하도록 명시적인 지속시간을 지정할 수 있다. :duration 속성
6. transition 의 v-on 디렉티브를 활용하여 훅을 작성할 수 있다.
7. v-if 와 v-else 를 사용하여 엘리먼트간 트랜지션을 사용할 수 있다.
   - 두 트랜지션이 동시에 일어나는것이 기본동작이나, 하나가 완료된 후 다음트랜지션이 동작하도록 하기위해
     - in-out: 처음에는 새로운 엘리먼트가 트랜지션되고, 완료되면 현재 엘리먼트가 트랜지션됩니다.
     - out-in: 현재 엘리먼트가 먼저 트랜지션되고, 완료되면 새로운 요소가 바뀝니다.
8. 컴포넌트 사이의 트랜지션은 동적 컴포넌트 바인딩을 통해 key 대신 is 속성을 통해 이룬다.
9. transition 태그 내부에서 단일 노드를 렌더링하는 대신, 그룹으로 렌더링 할 수 있다. (transition-group)
