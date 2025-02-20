<template>
    <div>
      <h2>Список задач</h2>
  
      <div class="filters">
        <button :class="{ active: currentFilter === 'all' }" @click="setFilter('all')">Все</button>
        <button :class="{ active: currentFilter === 'active' }" @click="setFilter('active')">Активные</button>
        <button :class="{ active: currentFilter === 'completed' }" @click="setFilter('completed')">Выполненные</button>
      </div>
  
      <ul>
        <li v-for="task in filteredTasks" :key="task.id">
          <input type="checkbox" :checked="task.completed" @change="toggleTask(task.id)" />
          
          <span v-if="!task.editing" :class="{ completed: task.completed }">
            {{ task.text }}
          </span>
          
          <input 
            v-else 
            v-model="task.newText"
            @keyup.enter="saveEdit(task)"
            @blur="saveEdit(task)"
          />
  
          <button @click="task.editing = true; task.newText = task.text">✏️</button>
          <button @click="removeTask(task.id)">❌</button>
        </li>
      </ul>
  
      <button class="clear-button" @click="clearCompleted" v-if="hasCompletedTasks">
        Очистить выполненные
      </button>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['filteredTasks', 'currentFilter']),
      hasCompletedTasks() {
        return this.filteredTasks.some(task => task.completed);
      }
    },
    created() {
      this.loadTasks();
    },
    methods: {
      ...mapActions(['toggleTask', 'removeTask', 'setFilter', 'clearCompleted', 'editTask', 'loadTasks']),
      saveEdit(task) {
        if (task.newText.trim()) {
          this.editTask({ taskId: task.id, newText: task.newText.trim() });
        }
        task.editing = false;
      }
    }
  };
  </script>
  