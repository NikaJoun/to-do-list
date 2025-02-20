import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    filter: 'all',
    isDarkMode: false,
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    TOGGLE_TASK(state, taskId) {
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(t => t.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    SET_FILTER(state, filter) {
      state.filter = filter;
    },
    CLEAR_COMPLETED(state) {
        state.tasks = state.tasks.filter(task => !task.completed);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    EDIT_TASK(state, { taskId, newText }) {
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
          task.text = newText;
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    TOGGLE_THEME(state) {
        state.isDarkMode = !state.isDarkMode;
        localStorage.setItem('isDarkMode', state.isDarkMode);
    }      
  },
  actions: {
    addTask({ commit }, taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      commit('ADD_TASK', newTask);
    },
    toggleTask({ commit }, taskId) {
      commit('TOGGLE_TASK', taskId);
    },
    removeTask({ commit }, taskId) {
      commit('REMOVE_TASK', taskId);
    },
    loadTasks({ commit }) {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      commit('SET_TASKS', savedTasks);
    },
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter);
    },
    clearCompleted({ commit }) {
        commit('CLEAR_COMPLETED');
    },
    editTask({ commit }, { taskId, newText }) {
        commit('EDIT_TASK', { taskId, newText });
    },
    toggleTheme({ commit }) {
        commit('TOGGLE_THEME');
    },
  },
  getters: {
    allTasks: state => state.tasks,
    filteredTasks: state => {
        if (state.filter === 'completed') {
          return state.tasks.filter(task => task.completed);
        } else if (state.filter === 'active') {
          return state.tasks.filter(task => !task.completed);
        }
        return state.tasks;
    },
    currentFilter: state => state.filter
  }
});
