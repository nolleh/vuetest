# Slot

## Summary

1. 컴포넌트 내부에 slot 태그를 정의하고 컴포넌트의 태그 사이에 DOM 을 넣으면 slot 에 렌더링 된다
2. slot 을 대체하여 렌더링되는 DOM 의 컴파일 scope 는 slot 과 동일하다. -?
3. slot 태그 사이에 DOM 을 배치하여 디폴드 값을 지정할 수 있다.
4. NamedSlot 에 v-slot 디렉티브를 사용, name 으로 대체
   - v-slot 을 쓴 template 에 싸여있지 않은 내용물은 디폴트 슬롯에 해당되는 것으로 간주.
5. 부모 컴포넌트에서 렌더링되므로, 자식컴포넌트의 변수에 접근하기 위해

   1. 자식 컴포넌트에서 v-bind 로 slot 의 속성을 등록한다
   2. 부모에서는 등록된 속성을 v-slot:default="slotProps" 을 통해 접근한다.

6. default 슬롯밖에 없는 경우 축약해 쓸 수 있다. (여러개인 경우, `<template>` 에 기초해서 모든 슬롯에 사용 필요)

   ```vue
   <!-- 슬롯 속성의 데이터를 가져오기 위해 slotProps 외에도 임의의 이름 지정해서 사용가능 -->
   <current-user v-slot:default="slotProps">
       {{ slotProps.user.firstName }}
   </current-user>
   ```

   ```vue
   <current-user v-slot="slotProps"> 
       {{ slotProps.user.firstName }}
   </current-user>
   ```

   ```vue
   <current-user>
       <template v-slot:default="slotProps">
           {{ slotProps.user.firstName }}
   </template>
   
   <template v-slot:other="otherSlotProps">
       ...
   </template>
   </current-user>
   ```

7. v-slot 으로 속성을 가져온 후 ES2015 의 기능들 사용가능

   ```vue
   <current-user v-slot="{ user = { firstName: 'Guest' } }">
       {{ user.firstName }}
   </current-user>
   ```

8. v-slot 을 # 으로 단축 표기 할 수 있다. (v-slot:name -> #name)
9. 입력 속성에 따라 다른 내용을 렌더링할 수 있는 재사용 가능한 템플릿으로 구성하는데 사용할 수 있다.

## 예제

부모 컴포넌트

```vue
<template>
  <my-slot v-bind:todos="todos">
    <template #todo="{todo}">
      <span v-if="todo.isComplete">✓</span>
      {{ todo.text }}
    </template>
  </my-slot>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue';
import MySlot from './MySlot.vue';
export default Vue.extend({
  data() {
    return {
      todos: [
        { text: 'nolleh', isComplete: true },
        { text: 'is', isComplete: true },
        { text: 'awesome!', isComplete: false },
      ],
    };
  },
  components: { MySlot },
});
</script>
```

자식 컴포넌트

```vue
<template>
  <ul>
    <li v-for="todo in filteredTodos" v-bind:key="todo.id">
      <!-- 할일에 대한 슬롯을 만들고 이 슬롯을 todo 속성에 바인드 -->
      <slot name="todo" v-bind:todo="todo">{{ todo.text }}</slot>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue/dist/vue';
export default Vue.extend({
  props: {
    todos: Array,
  },

  data() {
    return {};
  },

  computed: {
    filteredTodos() {
      return this.todos.filter(todo => {
        return todo;
      });
    },
  },
});
</script>
```
