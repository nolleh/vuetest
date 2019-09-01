<template>
  <div id="intro">
    <!-- directive. 렌더링된 DOM 에 반응형 동작을 함. span 요소의 tile 속성을 message 로.. -->
    <span v-bind:title="message">테스트트트</span>
    <p v-if="seen">if !</p>
    <ol>
      <li v-for="todo in todos" v-bind:key="todo">{{todo.text}}</li>
    </ol>
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">메시지뒤집기</button>
    <p>{{ modelmessge }}</p>
    <input v-model="modelmessge" />
    <ol>
      <!-- todo 속성에 item 을 바인드하고, key 는 id -->
      <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item"></todo-item>
    </ol>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: String
  },
  components: {
    "todo-item": {
      props: ["todo"],
      template: "<div id='test'> <li>{{todo.text}}</li> </div>"
    }
  },
  data() {
    return {
      message: "메시지",
      seen: true,
      todos: [{ text: "javascript " }, { text: "Vue" }],
      modelmessge: "v 모델 메시지",
      groceryList: [
        { id: 0, text: "Vegetables" },
        { id: 1, text: "Cheese" },
        { id: 2, text: "Whatever else humans are supposed to eat" }
      ]
    };
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>