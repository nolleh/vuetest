# List Rendering

## Summary

1. v-for 을 활용하여 배열/오브젝트의 프로퍼티를 iterate 할 수 있다.
2. 이때 (value, index) 와 같은 형태로 추가 정보를 얻을수 있다. 객체의 경우, (value, key, index)
3. 배열의 다음 메소드들 호출시 뷰 갱신이 트리거됨

   - push()
   - pop()
   - shift()
   - unshift()
   - splice()
   - sort()
   - reverse()

   > \$vm1.items.push({message:'Baz'})

4. filter / concat / slice 메서드의 경우 새 배열이 반환되나, vue 에서 재사용할 수 있는 DOM 은 재활용함
5. javascript 의 제한으로 인덱스 연산자로 직접 항목을 설정하는 경우 / 길이 수정시 trigger 되지 않으며 다음 활용

   ```vue
   Vue.set(example1.items, indexOfItem, newValue)
   ```

   ```vue
   example1.items.splice(newLength)
   ```

6. 전역 Vue 객체의 메서드에 접근하기 위해 Vue. 으로 접근하거나 vue 인스턴스의 .\$set 으로 접근

   ```vue
   Vue.set(vm.userProfile, 'age', 27)
   ```

   ```vue
   vm.$set(this.userProfile, 'age', 27)
   ```

7. computed / methods 등을 통해 연산된 데이터에(ex. filtering) 대해 v-for 사용 가능
8. 상수에 대해 v-for 가능. 이때는 템플릿이 반복됨
9. template v-for 을 사용, 여러 엘리먼트의 블럭을 렌더링 가능
10. v-for 과 v-if 가 함께 사용되는 경우 v-for 이 더 높은 우선순위. if 는 항상 반복됨
11. v-for 을 component 에 사용가능

## 예제

```vue
<template>
  <div id="example1">
    <ul id="example-1">
      <!-- v-for 로 iterate 하며 태그 안에서 access 가능 -->
      <li v-for="item in items" v-bind:key="item.message">
        {{ item.message }}
      </li>
    </ul>

    <ul id="example-2">
      <!-- pair 로 index 데이터도 전달 받을 수 있고, iterate 하는 부모의 속성 데이터에도 접근 가능 -->
      <li v-for="(item, index) of items" v-bind:key="index">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>

    <!-- object property value iterate -->
    <ul id="v-for-object">
      <li v-for="value in object" :key="value">{{ value }}</li>
    </ul>
    <ul id="v-for-object2">
      <li v-for="(value, key, index) in object" v-bind:key="value">
        {{ index }}. {{ key }}: {{ value }}
      </li>
    </ul>

    <li v-for="n in evenNumbers" v-bind:key="n">{{ n }}</li>

    <span v-for="a in 10" v-bind:key="a">{{ a }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import Component from 'vue-class-component';

// @Component
export default Vue.extend({
  data() {
    return {
      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }],
      object: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
      },
      numbers: [1, 2, 3, 4, 5],
    };
  },

  computed: {
    evenNumbers: function() {
      return this.numbers.filter(function(number) {
        return number % 2 === 0;
      });
    },
  },
});
</script>
```
