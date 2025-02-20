<template>
  <div id="app">
    <h1>To-Do List</h1>
    <input v-model="newTask" placeholder="Добавить задачу..." @keyup.enter="addNewTask" />
    <button @click="addNewTask">➕</button>

    <TaskList />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import { mapActions } from 'vuex';
import './style.css';

export default {
  components: {
    TaskList,
  },
  data() {
    return {
      newTask: '',
    };
  },
  methods: {
    ...mapActions(['addTask']),
    addNewTask() {
      if (this.newTask.trim()) {
        this.addTask(this.newTask);
        this.newTask = '';
      }
    },
  },
};
</script>

<style>
#app {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
input {
  padding: 5px;
  font-size: 16px;
}
button {
  cursor: pointer;
}
</style>
